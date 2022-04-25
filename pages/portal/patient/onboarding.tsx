import { useUser } from '@api';
import { PatientOnBoarding } from '@components/onboarding';
import { Loading } from '@components/shared';
import { useRouter } from 'next/router';

const PatientOnboardingPage = () => {
  const router = useRouter();
  const { data, isLoading } = useUser();

  if (isLoading) {
    <Loading />;
  }

  if (data?.onboarding_completed) {
    router.push('/portal/patient');
    return null;
  }

  return <PatientOnBoarding />;
};

export default PatientOnboardingPage;
