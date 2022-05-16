import { useRouter } from 'next/router';
// import * as firebase from '@libs/firebase'

const CheckOnboarding = ({ user, redirectTo, children }) => {
  const router = useRouter();

  if (!user?.onboarding_completed) {
    router.push(redirectTo);
    return null;
  }

  console.log(user.user.id)
  return <>{children}</>;
};

export default CheckOnboarding;
