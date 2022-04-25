import { useRouter } from 'next/router';
import { Button, Grid, Typography, makeStyles, Dialog, DialogContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon, Info as InfoIcon } from '@material-ui/icons';
import { Provider, User } from '@types';

import { api } from '@api';
import { useForm } from 'react-hook-form';
import { useCognito } from '@components/context/AuthContext';

const useStylesDialogActionProfile = makeStyles(theme => ({
  dialogContent: {
    position: 'relative',
    maxWidth: 450,
    height: '100%',
    padding: theme.spacing(2, 2, 4),
  },
  closeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 150,
  },
  infoGrid: {
    marginBottom: theme.spacing(4),
    '& > svg': {
      marginBottom: theme.spacing(2),
    },
  },
}));

type ProviderProps = Provider & Pick<User, 'first_name' | 'last_name'>;

interface DialogActionProfileProps {
  provider: ProviderProps;
  isPublicDirectory?: boolean;
  onClose: () => void;
  openMessage: (params: number) => void;
}

const onSubmit = async (data, getSession, setError, openMessage, router, isPublicDirectory) => {
  try {
    const session = await getSession();
    const response = await api.post(
      '/api/patient_provider/create',
      { provider_id: data },
      {
        headers: {
          authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
        },
      }
    );

    if (response.status === 200) {
      router.push(
        isPublicDirectory
          ? `/portal/patient?chat_id_url=${response.data.chat_id}`
          : `?chat_id_url=${response.data.chat_id}`
      );
      openMessage();
    }
  } catch (error) {
    setError('provider_code', {
      type: 'manual',
      message: 'Ha sucedido un error',
    });
  }
};

const DialogActionProfile = ({ onClose, provider, openMessage, isPublicDirectory }: DialogActionProfileProps) => {
  const classes = useStylesDialogActionProfile();
  const { isAuthenticated, getSession } = useCognito();

  const router = useRouter();

  const isPortalProivder = router.pathname.includes('/portal/provider');

  // TODO: Maybe we can change this to use useMutation
  const { handleSubmit, setError } = useForm();

  return (
    <Dialog open onClose={onClose}>
      <DialogContent className={classes.dialogContent}>
        <IconButton className={classes.closeBtn} size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {isAuthenticated && !isPortalProivder ? (
          <Grid container>
            <Grid className={classes.infoGrid} item xs={12}>
              <InfoIcon color="action" />
              <Typography variant="body2">
                Número de teléfono: <b>{provider?.phone}</b>
              </Typography>
            </Grid>
            <Grid container item xs={12} alignItems="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(() =>
                  onSubmit(provider.provider_id, getSession, setError, openMessage, router, isPublicDirectory)
                )}
              >
                Abrir un chat
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid className={classes.infoGrid} item xs={12}>
              <InfoIcon color="action" />
              {isAuthenticated && (
                <Typography variant="body2" gutterBottom>
                  Número de teléfono: <b>{provider?.phone}</b>
                </Typography>
              )}
              <Typography variant="body2">
                {isPortalProivder
                  ? 'Próximamente estará disponible la posibilidad de chatear en la aplicación con sus colegas'
                  : 'Para ver la información de contacto del terapeuta, inicie sesión'}
              </Typography>
            </Grid>
            {!isPortalProivder && (
              <Grid container item xs={12} alignItems="flex-end">
                <Button variant="contained" color="primary" onClick={() => router.push('/auth/login')}>
                  Inicie sesión
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogActionProfile;
