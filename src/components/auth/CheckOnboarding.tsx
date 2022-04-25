import { useRouter } from 'next/router';

const CheckOnboarding = ({ user, redirectTo, children }) => {
  const router = useRouter();

  if (!user?.onboarding_completed) {
    router.push(redirectTo);
    return null;
  }

  return <>{children}</>;
};

export default CheckOnboarding;
