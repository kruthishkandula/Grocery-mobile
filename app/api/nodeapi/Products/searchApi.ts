import { NODE_URLS } from '@/constants/urls';
import { useQuery } from '@tanstack/react-query';
import nodeApi from '../index';

export interface SearchParams {
  searchValue?: string;
  categoryId?: number;
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'name' | 'basePrice' | 'discountPrice' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export const searchProducts = async (params: SearchParams) => {
  const response = await nodeApi.post(NODE_URLS.PRODUCTS, {
    searchValue: params.searchValue || '',
    categoryId: params.categoryId,
    priceMin: params.priceMin,
    priceMax: params.priceMax,
    sortBy: params.sortBy || 'name',
    sortOrder: params.sortOrder || 'asc',
    page: params.page || 1,
    pageSize: params.pageSize || 20,
    isActive: true,
  });
  return response.data;
};

export const useSearchProducts = (params: SearchParams, enabled = true) => {
  return useQuery({
    queryKey: ['searchProducts', params],
    queryFn: () => searchProducts(params),
    enabled: enabled && (!!params.searchValue || !!params.categoryId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};