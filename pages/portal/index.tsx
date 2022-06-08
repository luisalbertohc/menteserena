import { useUser } from '@api';
import { Loading } from '@components/shared';
import { useRouter } from 'next/router';

import { ErrorPage } from '@components/layout';
import { useCognito, withAuthenticationRequired } from '@components/context/AuthContext';

const PortalPage = () => {
  const { isLoading, data: entity } = useUser();
  const router = useRouter();

  const { user } = entity || {};

  const { isLoading: isLoadingCognito } = useCognito();

  if (isLoading || isLoadingCognito) {
    return <Loading />;
  }

  if (user && user.user_type) {

    console.log(user);
    //setToken(user.id);
    router.push(entity.user.user_type === 'PATIENT' ? '/portal/patient' : '/portal/provider');
    return null;
  }

  return <ErrorPage />;
};

export default withAuthenticationRequired(PortalPage);
