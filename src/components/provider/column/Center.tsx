import { useState } from 'react';
import { Grid, makeStyles, Typography, Tooltip } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Provider } from '@types';
import { useSocket } from '@components/context/SocketContext';
import { Loading } from '@components/shared';
import { useSortedChatList } from '@store/hooks';

const PatientList = dynamic(() => import('@components/messages/provider/PatientList'), { ssr: false });

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '24px',
    marginBottom: theme.spacing(1.5),
    width: '100%',
  },
  infoContainer: {
    paddingTop: theme.spacing(4),
  },
  detailsContainer: {
    padding: theme.spacing(0, 3),
    marginBottom: theme.spacing(3),
  },
  details: {
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(1),
  },
  invitationTemplate: {
    cursor: 'pointer ',
    color: theme.palette.grey[700],
  },
}));

interface CenterProps {
  provider: Provider;
}

const Center = ({ provider }: CenterProps) => {
  const classes = useStyles();
  const { isConnecting, isIdle } = useSocket();
  const chatList = useSortedChatList();
  const [isCopied, setIsCopied] = useState(false);

  const providerCode = provider?.provider_code || '';

  const invitationTemplate = `
  Para conectar de manera virtual, regístrate en www.tumenteserena.com y utiliza mi código de proveedor
  ${providerCode} para ser caso activo virtual.
  `;

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  if (isIdle || isConnecting) {
    return <Loading />;
  }

  return (
    <>
      {Boolean(chatList?.length) ? (
        <PatientList chatList={chatList} />
      ) : (
        <Grid className={`${classes.infoContainer} center`}>
          <Grid container justify="center" item>
            <img src="/images/homescreen/placeholder.svg" alt="mente-serena" />
          </Grid>

          <Grid container alignItems="center" className={classes.detailsContainer}>
            <Typography color="primary" className={classes.title}>
              Primeros Pasos
            </Typography>
            <Typography className={classes.details}>
              Si completaste tu perfil, los usuarios en búsqueda de terapia podrán escribirte tres veces mediante el
              chat del Directorio de Profesionales para ser orientados. Si ya cuentas con casos activos en tu práctica
              clínica, invítalos a conectar mediante Mente Serena. Copiando y pegando el siguiente mensaje en un correo
              electrónico:
            </Typography>

            <Tooltip title={isCopied ? 'Copiado' : `Click para copiar`}>
              <CopyToClipboard text={invitationTemplate} onCopy={onCopyText} className={classes.invitationTemplate}>
                <Typography>{invitationTemplate}</Typography>
              </CopyToClipboard>
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Center;
