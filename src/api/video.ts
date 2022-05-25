import { api } from '@api';
import { Channel } from 'phoenix';
import { GetSession } from '@components/context/AuthContext';
import { useMutation, UseMutationResult, UseMutationOptions } from 'react-query';

export const enteredVideoCall = (channel: Channel) => {
  channel?.push('initiated_call', null).receive('error', err => console.log('err', err));
};

export interface GetTokenCallParams {
  getSession: GetSession;
  join: (param1: string, param2: string, param3: string, param4: string) => Promise<void>;
  channelName: string;
  uid: string;
  channel: Channel;
  isProvider: boolean;
}

export const getTokenCall = async ({
  getSession,
  join: joinCall,
  channelName,
  uid,
  channel,
  isProvider,
}: GetTokenCallParams): Promise<void> => {
  const session = await getSession();

  const response = await api.post(`${window.location.origin}/api/getTokenCall`, {
    userToken: session.getAccessToken().getJwtToken(),
    channelName,
    uid,
  });

  const { token: tokenCall } = response.data;

  await joinCall(process.env.NEXT_PUBLIC_AGORA_ID, channelName, tokenCall, uid);

  if (isProvider) {
    enteredVideoCall(channel);
  }
};

export const useGetTokenCall = (
  useMutationOptions?: UseMutationOptions<unknown, unknown, GetTokenCallParams>
): UseMutationResult => {
  return useMutation<unknown, unknown, GetTokenCallParams>(getTokenCall, useMutationOptions ?? {});
};
