import { NODE_URLS } from '@/constants/urls';
import { useQuery } from '@tanstack/react-query';
import nodeApi from '../index';


export const useFetchAllBanners = (body: any, options?: any) => useQuery({
  queryKey: ['banners'],
  queryFn: async () => {
    const response = await nodeApi.post(NODE_URLS.BANNERS, {
      ...(body || {}),
    });
    return response.data;
  },
  ...options
});