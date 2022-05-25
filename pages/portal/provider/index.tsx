import { useUser } from '@api';
import { Loading } from '@components/shared';
import { CheckOnboarding } from '@components/auth';
import HomeScreen from '@components/provider/Home';
import { Container, makeStyles } from '@material-ui/core';
import { SocketContext, IdleTimerContext } from '@components/context';
import { withAuthenticationRequired } from '@components/context/AuthContext';
import { UnauthorizedUser } from '@components/layout';

// Notas:
// - Eliminar console logs
// - Depurar código

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
}));

const ProviderPortalPage = () => {
  const { isLoading, data: entity } = useUser({
    refetchOnWindowFocus: false,
  });
  const classes = useStyles();
  console.log('Entre como terapeuta')
  console.log(`Estos son mis datos: ${entity}`)

  if (isLoading) {
    return <Loading />;
  }

  if (!entity.user.user_active) {
    return <UnauthorizedUser />;
  }

  return (
    <IdleTimerContext>
      <SocketContext>
        <CheckOnboarding user={entity} redirectTo="/portal/provider/onboarding">
          <Container maxWidth="lg" className={classes.container}>
            <HomeScreen />
          </Container>
        </CheckOnboarding>
      </SocketContext>
    </IdleTimerContext>
  );
};

export default withAuthenticationRequired(ProviderPortalPage);
