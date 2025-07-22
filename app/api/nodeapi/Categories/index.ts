import { NODE_URLS } from '@/constants/urls';
import nodeApi from '..';
import { useQuery } from '@tanstack/react-query';


export const useFetchAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await nodeApi.post(NODE_URLS.CATEGORIES, { populate: '*' });
      return response.data;
    },
  });
};