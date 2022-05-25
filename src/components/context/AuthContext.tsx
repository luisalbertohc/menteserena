import React, { useState, SetStateAction, Dispatch, useEffect, useContext, ComponentType } from 'react';
import { useRouter } from 'next/router';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import * as cognito from '@libs/cognito';

export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut,
}

export type GetSession = () => Promise<CognitoUserSession>;

export interface IAuth {
  userSession?: CognitoUserSession;
  authStatus?: AuthStatus;
  signInWithEmail?: any;
  signUpWithEmail?: any;
  signOut?: any;
  getSession?: GetSession;
  sendCode?: any;
  forgotPassword?: any;
  getAttributes?: any;
  setAttribute?: any;
  getAccessToken?: () => string | undefined;
  refreshSession?: () => Promise<void>;
  isRefreshingSession?: boolean;
}

const defaultState: IAuth = {
  userSession: null,
  authStatus: AuthStatus.Loading,
};

export const AuthContext = React.createContext(defaultState);

const onRedirecting = (): JSX.Element => <></>;

export const withAuthenticationRequired = (Component: ComponentType) => {
  return function WithAuthenticationRequired(props): JSX.Element {
    const { isAuthenticated, isLoading } = useCognito();
    const router = useRouter();

    useEffect(() => {
      if (isLoading || isAuthenticated) {
        return;
      }

      (async () => {
        await router.push('/');
      })();
    }, [isAuthenticated, isLoading]);

    return isAuthenticated ? <Component {...props} /> : onRedirecting();
  };
};

export const withNoAuthetication = Component => {
  return function WithWithNoAuthetication(props): JSX.Element {
    const { isAuthenticated, isLoading } = useCognito();
    const router = useRouter();

    useEffect(() => {
      if (isLoading || !isAuthenticated) {
        return;
      }

      (async () => {
        await router.push('/portal');
      })();
    }, [isAuthenticated, isLoading]);

    return !isAuthenticated ? <Component {...props} /> : onRedirecting();
  };
};

const getSession = async (): Promise<CognitoUserSession> => {
  try {
    const session = await cognito.getSession();
    // const tokenExpiry = session.getAccessToken().getExpiration();

    return session;
  } catch (err) {
    throw err;
  }
};

let accessTokenExpiry;

const regenerateTimeoutSession = async (setUserSession: Dispatch<SetStateAction<CognitoUserSession>>) => {
  if (!accessTokenExpiry || accessTokenExpiry < new Date().getTime()) {
    const session = await cognito.getSession();
    accessTokenExpiry = session.getAccessToken().getExpiration() * 1000;

    setUserSession(session);
  }
};

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
  const [isRefreshingSession, setIsRefreshingSession] = useState(false);
  const [userSession, setUserSession] = useState<CognitoUserSession>(null);

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const session: CognitoUserSession = await getSession();

        typeof window !== 'undefined' &&
          window.localStorage.setItem('accessToken', `${session.getAccessToken().getJwtToken()}`);
        typeof window !== 'undefined' &&
          window.localStorage.setItem('refreshToken', `${session.getRefreshToken().getToken()}`);

        setUserSession(session);

        setAuthStatus(AuthStatus.SignedIn);
      } catch (err) {
        setAuthStatus(AuthStatus.SignedOut);
      }
    }
    getSessionInfo();
  }, [setAuthStatus, authStatus]);

  const refreshSession = async () => {
    setIsRefreshingSession(true);
    const session = await getSession();

    setUserSession(session);
    setIsRefreshingSession(false);
  };

  const getAccessToken = () => {
    return userSession?.getAccessToken?.().getJwtToken?.();
  };

  const signInWithEmail = async (username: string, password: string) => {
    try {
      await cognito.signInWithEmail(username, password);
      setAuthStatus(AuthStatus.SignedIn);
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
      throw err;
    }
  };

  const signUpWithEmail = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    is_provider: boolean,
    terms_of_services: boolean
  ) => {
    try {
      await cognito.signUpUserWithEmail(first_name, last_name, email, password, is_provider, terms_of_services);
    } catch (err) {
      throw err;
    }
  };

  const signOut = () => {
    cognito.signOut();
    setAuthStatus(AuthStatus.SignedOut);
  };

  const getAttributes = async () => {
    try {
      const attr = await cognito.getAttributes();
      return attr;
    } catch (err) {
      throw err;
    }
  };

  const setAttribute = async (attr: any) => {
    try {
      const res = await cognito.setAttribute(attr);
      return res;
    } catch (err) {
      throw err;
    }
  };

  const sendCode = async (username: string) => {
    try {
      await cognito.sendCode(username);
    } catch (err) {
      throw err;
    }
  };

  const forgotPassword = async (username: string, code: string, password: string) => {
    try {
      await cognito.forgotPassword(username, code, password);
    } catch (err) {
      throw err;
    }
  };

  const state: IAuth = {
    authStatus,
    userSession,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    getSession,
    sendCode,
    forgotPassword,
    getAttributes,
    setAttribute,
    getAccessToken,
    refreshSession,
    isRefreshingSession,
  };

  if (authStatus === AuthStatus.Loading) {
    return <AuthContext.Provider value={state}>{null}</AuthContext.Provider>;
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useCognito = () => {
  const authContext = useContext(AuthContext);

  return {
    ...authContext,
    isAuthenticated: authContext.authStatus === AuthStatus.SignedIn,
    isLoading: authContext.authStatus === AuthStatus.Loading,
  };
};

export default AuthProvider;
