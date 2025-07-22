import { fetchProductByIds, } from '@/api/cmsApi/Products/index';
import { local_storage } from '@/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface ProductStore {
    products: any[];
    loading: boolean;
    error: string | null;
    fetchProduct: () => Promise<void>;
}


export const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            products: [],
            loading: false,
            error: null,
            fetchProduct: async (ids: string[] = []) => {
                set({ loading: true, error: null });
                try {
                    const data = await fetchProductByIds(ids);
                    set({ products: data.result || [], });
                } catch (e: any) {
                    set({ error: (e.message || 'Failed to fetch products') });
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: 'product-items',
            storage: local_storage
        }
    )
);