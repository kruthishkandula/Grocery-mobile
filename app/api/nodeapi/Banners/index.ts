import { NODE_URLS } from '@/constants/urls';
import { useQuery } from '@tanstack/react-query';
import nodeApi from '../index';


export const useFetchAllBanners = () => useQuery({
  queryKey: ['banners'],
  queryFn: () => nodeApi.post(NODE_URLS.BANNERS, { populate: '*' }),
});