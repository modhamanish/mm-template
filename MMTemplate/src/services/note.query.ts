import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from './queryKeys';
import { axiosInstance } from './axiosInstance';

export const useGetNotesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_NOTES],
    queryFn: async () => {
      const response = await axiosInstance.get('/notes');
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Something went wrong');
    },
  });
};
