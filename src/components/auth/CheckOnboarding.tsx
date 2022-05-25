import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as firebase from '@libs/firebase'

const CheckOnboarding = ({ user, redirectTo, children }) => {
  const router = useRouter();
  // const [isTokenFound, setTokenFound] = useState(false)
  // const createToken = () => {
  //   firebase.getTokenFirebase(setTokenFound, 'subscribe', user.user.id)
  //   console.log('createToken running...')
  // }
  if (!user?.onboarding_completed) {
    router.push(redirectTo);
    return null;
  }
  // to load once
  // useEffect(() => {
  //   createToken()
  // }, [setTokenFound])
  console.log(`userId`, user.user.id)
  return <>{children}</>;
};

export default CheckOnboarding;
