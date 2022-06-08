import { useRouter, NextRouter } from 'next/router';
import config from '@config';
import { api } from '@api';
import { Entity } from '@types';
import { useQuery, UseQueryOptions, useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { useCognito, GetSession } from '@components/context/AuthContext';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { tokenFirebase } from '@components/firebase/client'; 
import { exit } from 'process';

async function getUser({
  queryKey: [_key, { getSession, getAttributes }],
}: {
  queryKey: [
    any,
    {
      getSession: () => Promise<CognitoUserSession>;
      getAttributes: any;
    }
  ];
}): Promise<Entity> {
  const attributes = await getAttributes();

  const email = attributes.find(user => user.Name === 'email').Value;
  const email_verified = attributes.find(user => user.Name === 'email_verified').Value;

  const session = await getSession();
 
  const response = await api.post(
    `${config.MENTE_SERENA_API_BASE_URL}/api/user/me`,
    {
      email,
      email_verified: email_verified === 'true',
    },
    {
      headers: {
        authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
      },
    }
  );

  return response.data;
}

export const useUser = (useQueryOptions?: UseQueryOptions<Entity>) => {
  const { getSession, getAttributes } = useCognito();

  const { isLoading, isIdle, ...queryProps } = useQuery<Entity>(
    ['/api/user/me', { getAttributes, getSession }],
    getUser as any,
    {
      ...useQueryOptions,
    }
  );

  return { ...queryProps, isLoading: isLoading || isIdle };
};

const request = async ({ queryKey: [url, { getSession, method }] }) => {
  const session = await getSession();

  const response = await api({
    method,
    url,
    headers: {
      authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
    },
  });

  return response.data;
};

export const useProviderProfile = () => {
  const { getSession } = useCognito();

  const { isLoading, isIdle, ...queryProps } = useQuery(
    ['/api/provider/profile', { getSession, method: 'get' }],
    request as any,
    {}
  );

  return { ...queryProps, isLoading: isLoading || isIdle };
};

export const usePatientProfile = () => {
  const { getSession } = useCognito();

  const { isLoading, isIdle, ...queryProps } = useQuery(
    ['/api/patient/profile', { getSession, method: 'get' }],
    request as any,
    {}
  );

  return { ...queryProps, isLoading: isLoading || isIdle };
};

interface SignOutLogProps {
  signOut: () => void;
  getSession: GetSession;
  router: NextRouter;
}

export const usuario = () => {
  
  const user = useUser().data;
  setTimeout(function () {
    
  }, 500);
  return user;
}

async function revokeFirebaseToken(){
  try{
    await tokenFirebase.delete();
  }catch (error) {
    
    console.log("Cannot delete firebase Token on User", error);
  }
}

const signOutLog = async ({ signOut, getSession, router }: SignOutLogProps): Promise<void> => {
  try {
    await revokeFirebaseToken();
    const session = await getSession();
    const response = await api.post(
      '/api/user/log_out',
      {},
      {
        headers: {
          authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
        },
      }
    );
    if (response.status === 200) {
      
      signOut();
      router.push('/');
    }
  } catch (error) {
    
    signOut();
    router.push('/');
  }
};

export const useSignOut = (useMutationOptions?: UseMutationOptions): UseMutationResult => {
  //console.log(usuario());
  const { getSession, signOut } = useCognito();
  const router = useRouter();
  return useMutation(() => signOutLog({ getSession, signOut, router }), useMutationOptions ?? {});
};
