import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { GetNotesResponse, Note } from '@app-types/services.types';
import { goBack } from '@utils/navigationUtils';

import { axiosInstance } from './axiosInstance';
import { QUERY_KEY } from './queryKeys';

export const useGetNotesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_NOTES],
    queryFn: async () => {
      const response = await axiosInstance.get<GetNotesResponse>('/notes');
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Something went wrong');
    },
  });
};

export const useAddNoteMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (note: Omit<Note, 'id'>) => {
      const response = await axiosInstance.post<Note>('/notes', note);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_NOTES] });
      Toast.show({
        type: 'success',
        text1: t('common.success'),
        text2: t('common.noteCreated'),
      });
      goBack();
    },
  });
};
