import { NODE_URLS } from '@/constants/urls';
import nodeApi from '../index';

export const fetchProductsByCategory = async (categoryId: string | null) => {
  if (!categoryId) return { data: [] };
  // Matches: ?filters[category_id][id][$eq]=6&populate=*
  const params = {
    'filters[category_id][id][$eq]': categoryId,
    populate: '*',
  };
  return await nodeApi.post(NODE_URLS.PRODUCTS, params);
};


export const fetchProductById = async (productId: string | null) => {
  if (!productId) return { data: [] };
  // Matches: ?filters[id][$eq]=6&populate=*
  const params = {
    'filters[id][$eq]': productId,
    populate: '*',
  };
  return await nodeApi.post(NODE_URLS.PRODUCTS, params);
};

export const fetchProductByIds = async (productIds: string[] | null) => {
  if (!productIds || productIds.length === 0) return { data: [] };

  const params = {
    'ids[]': productIds.join(
      "&ids[]="
    ),
    populate: '*',
  };
  return await nodeApi.post(NODE_URLS.PRODUCTS, params);
};