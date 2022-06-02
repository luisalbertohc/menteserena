import { useEffect, useState } from 'react';
import { Button, Grid, makeStyles, Typography, Hidden, CircularProgress } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useSortedChatList } from '@store/hooks';

const MessagesList = dynamic(() => import('@components/messages/patient/MessagesList'), { ssr: false });

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '24px',
    marginBottom: theme.spacing(1.5),
    width: '100%',
  },
  imagecontainer: {
    padding: theme.spacing(5),
    '& > img': {
      [theme.breakpoints.down('md')]: {
        width: 'unset',
      },
    },
  },
  detailsContainer: {
    padding: theme.spacing(0, 3),
  },
  details: {
    fontSize: 16,
    fontWeight: 400,
    color: theme.palette.grey[700],
    marginBottom: theme.spacing(4),
  },
  buttonContainer: {
    color: theme.palette.grey[700],
    maxWidth: 312,
    '& > button': {
      height: 44,
      marginBottom: theme.spacing(7),
      fontSize: 14,
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    '&.subscribe': {
      marginBottom: 'unset',
      marginTop: theme.spacing(2),
    },
  },
  textField: {
    height: 40,
    marginBottom: theme.spacing(2),
  },
}));

interface CenterProps {
  openDirectoryTab: () => void;
}

const Center = ({ openDirectoryTab }: CenterProps) => {
  const classes = useStyles();
  const [chatMessage, setChatMessage] = useState(null);

  const chatList = useSortedChatList();

  const router = useRouter();

  useEffect(() => {
    if (router.query?.chat_id_url && Boolean(chatList.length)) {
      const chatToRedirect = chatList.find(chat => chat.chat_id === +router.query.chat_id_url);

      setChatMessage(chatToRedirect);
      router.push('/portal/patient');
    }
  }, [chatList, router.query?.chat_id_url]);

  if (router.query?.chat_id_url) {
    return <CircularProgress size={20} />;
  }

  return (
    <>
      {Boolean(chatList.length) ? (
        <MessagesList chatList={chatList} chatMessage={chatMessage} setChatMessage={setChatMessage} />
      ) : (
        <Grid className="center">
          <Grid container justify="center" item className={classes.imagecontainer}>
            <Hidden smDown>
              <img src="/images/homescreen/placeholder.svg" alt="mente-serena" />
            </Hidden>
            <Hidden mdUp>
              <img src="/images/homescreen/placeholder_mobile.svg" alt="mente-serena" />
            </Hidden>
          </Grid>

          <Grid container direction="column" alignItems="center" className={classes.detailsContainer}>
            <Typography color="primary" className={classes.title}>
              Primeros Pasos
            </Typography>
            <Typography className={classes.details}>
              Como ya completaste tu perfil, puedes explorar el Directorio de Terapeutas para seleccionar tu mejor
              opción. Si ya cuentas con un terapeuta, comunícate por medio del chat para hacer una cita.
            </Typography>
            <Grid container justify="center" direction="column" className={classes.buttonContainer}>
              <Button variant="contained" color="primary" onClick={openDirectoryTab}>
                Ver Directorio
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Center;
