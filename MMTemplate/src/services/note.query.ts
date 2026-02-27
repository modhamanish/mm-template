import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from './queryKeys';
import { axiosInstance } from './axiosInstance';
import { GetNotesResponse, Note } from '@app-types/services.types';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { goBack } from '@utils/navigationUtils';

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
