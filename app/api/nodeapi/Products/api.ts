import { NODE_URLS } from '@/constants/urls';
import { useQuery } from '@tanstack/react-query';
import nodeApi from '../index';

export const useFetchAllProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await nodeApi.post(NODE_URLS.PRODUCTS, { populate: '*' });
      return response.data;
    },
  });
};

export const useFetchProductsByCategory = ({ categoryId, ...rest }: {
  categoryId: string | null,
  [key: string]: any
}) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {

      const response = await nodeApi.post(NODE_URLS.PRODUCTS, {
        ...(categoryId && categoryId !== "All" && { categoryId: categoryId }),
        "page": 1,
        "pageSize": 10,
        "sortBy": "name",
        "sortOrder": "asc",
        ...rest,
      });
      return response.data;
    },
  });
};