import { useUser } from '@api';
import { Loading } from '@components/shared';
import { CheckOnboarding } from '@components/auth';
import HomeScreen from '@components/provider/Home';
import { Container, makeStyles } from '@material-ui/core';
import { SocketContext, IdleTimerContext } from '@components/context';
import { withAuthenticationRequired } from '@components/context/AuthContext';
import { UnauthorizedUser } from '@components/layout';

import { tokenFirebase } from '@components/firebase/client'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function setToken( user ) {
  try{
    await tokenFirebase.init(user); 
    await tokenFirebase.listen();

  }catch (error) {
    console.log("Cannot set Token on User", error);
  }
}

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

  //tokenFirebase.delete();
  if (isLoading) {
    return <Loading />;
  }

  if (!entity.user.user_active) {

    return <UnauthorizedUser />;
  }
 
  //console.log(entity.user)
  setToken(entity.user);

  return (
    <IdleTimerContext>
      <SocketContext>
        <CheckOnboarding user={entity} redirectTo="/portal/provider/onboarding">
          <Container maxWidth="lg" className={classes.container}>
          <ToastContainer />
          <HomeScreen/>
          </Container>
        </CheckOnboarding>
      </SocketContext>
    </IdleTimerContext>
  );
};

export default withAuthenticationRequired(ProviderPortalPage);
