import { useUser } from '@api';
import { ProviderOnBoarding } from '@components/onboarding';
import { Loading } from '@components/shared';
import { useRouter } from 'next/router';

const ProviderOnboardingPage = () => {
  const router = useRouter();
  const { data, isLoading } = useUser();

  if (isLoading) {
    <Loading />;
  }

  if (data?.onboarding_completed) {
    router.push('/portal/provider');
    return null;
  }

  return <ProviderOnBoarding />;
};

export default ProviderOnboardingPage;
