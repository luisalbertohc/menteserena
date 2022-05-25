import { api } from '@api';
import { useQuery, UseQueryOptions } from 'react-query';
import { UsersResult, ExtendedUser } from '@types';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { useCognito } from '@components/context/AuthContext';

const getUsersAsAdmin = async ({
  queryKey: [_key, { getSession }],
}: {
  queryKey: [any, { getSession: () => Promise<CognitoUserSession> }];
}): Promise<UsersResult> => {
  const session = await getSession();

  const response = await api.get(`/api/admin/users`, {
    headers: {
      authorization: `bearer ${session.getAccessToken().getJwtToken()}`,
    },
  });

  return response.data;
};

export const useUsersAsAdmin = (useQueryOptions?: UseQueryOptions<UsersResult>) => {
  const { getSession } = useCognito();

  const { isLoading, isIdle, ...queryProps } = useQuery<UsersResult>(
    ['/api/admin/users', { getSession }],
    getUsersAsAdmin as any,
    {
      ...useQueryOptions,
    }
  );

  return { ...queryProps, isLoading: isLoading || isIdle };
};

export const toggleActive = async (token: string, user: ExtendedUser) => {
  const response = await api.post(
    `/api/admin/users/${user.user_id}/toggle_activation`,
    {},
    {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
  );

  return { ...user, ...response.data };
};

export const toggleAdmin = async (token: string, user: ExtendedUser) => {
  const response = await api.post(
    `/api/admin/users/${user.user_id}/toggle_admin`,
    {},
    {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
  );

  return { ...user, ...response.data };
};
