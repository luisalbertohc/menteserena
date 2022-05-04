import { useState } from 'react';
import { Container, Grid, Typography, makeStyles, Dialog, DialogContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Provider, User } from '@types';

import { Loading } from '@components/shared';
import ProfileView from '@components/provider/editProfile/ProfileView';
import Card from '../common/Card';
import DialogActionProfile from '../common/DialogActionProfile';

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 100px',
    overflow: 'auto',
  },
  cardContainer: {
    marginTop: theme.spacing(4),
    flexDirection: "column",
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  notFoundText: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    position: 'relative',
    padding: `0px !important`,
    height: 600,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 770,
      height: 'auto',
      maxHeight: 800
    }
  },
  closeBtn: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 150,
  },
}));

type ProviderProps = Provider & Pick<User, 'first_name' | 'last_name'>;

interface ProviderPayload {
  providers: ProviderProps[];
}

interface ProviderContainerProps {
  isLoading: boolean;
  isPortalCard?: boolean;
  data: ProviderPayload;
  isPublicDirectory?: boolean;
  openMessage?: (params: number) => void;
}

const ProviderContainer = ({
  isLoading,
  data,
  isPortalCard,
  openMessage,
  isPublicDirectory,
}: ProviderContainerProps) => {
  const classes = useStyles();
  const [selectedProvider, setSelectedProvider] = useState<ProviderProps>(null);
  const [isActionProfile, setIsActionProfile] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.providers?.length) {
    return (
      <Typography variant="h5" align="center" className={classes.notFoundText}>
        No hay proveedores
      </Typography>
    );
  }

  return (
    <>
      <Container className={classes.root}>
        <Grid container className={classes.cardContainer}>
          {data.providers.map((provider, idx) => (
            <Card
              provider={provider}
              key={idx}
              isPortalCard={isPortalCard}
              onClick={() => setSelectedProvider(provider)}
            />
          ))}
        </Grid>
      </Container>

      {selectedProvider && (
        <Dialog maxWidth="md" open onClose={() => setSelectedProvider(null)}>
          <DialogContent className={classes.dialogContent}>
            <IconButton className={classes.closeBtn} size="small" onClick={() => setSelectedProvider(null)}>
              <CloseIcon />
            </IconButton>
            <ProfileView profile={selectedProvider} actionProfile={() => setIsActionProfile(true)} />
          </DialogContent>
        </Dialog>
      )}

      {isActionProfile && (
        <DialogActionProfile
          onClose={() => setIsActionProfile(false)}
          provider={selectedProvider}
          openMessage={openMessage}
          isPublicDirectory={isPublicDirectory}
        />
      )}
    </>
  );
};

export default ProviderContainer;
