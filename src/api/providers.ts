import { api } from '@api';
import { useMutation, UseMutationResult } from 'react-query';

export const useDirectoryProviders = <T>(): UseMutationResult<T> => {
  return useMutation(async (submitValues: any) => {
    const response = await api.post('api/provider/directory', submitValues);

    return response.data;
  });
};
