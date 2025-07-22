import { local_storage } from '@/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string; // product_id
  product?: any;
  [key: string]: any;
}

interface WishlistStore {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
  addWishlistItem: (wishlist_item: WishlistItem) => void;
  removeWishlistItem: (wishlist_id: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => {
      return {
        items: [],
        loading: false,
        error: null,
        //   set({ loading: false, error: null });
        //   try {
        //     const data = await fetchCart();
        //     set({ items: data.result || [] });
        //     // Optionally update product cache
        //     await get().fetchProductsForCart();
        //   } catch (e: any) {
        //     set({ error: (e.message || 'Failed to fetch cart') });
        //   } finally {
        //     set({ loading: false });
        //   }
        // },
        addWishlistItem: (wishlist_item: WishlistItem) => {
          let existingItem = get().items.find((item: any) => item.id === wishlist_item.id);

          set((state: any) => ({
            items: existingItem ? state.items.map((item: any) => item.id === wishlist_item.id ? { ...item, quantity: wishlist_item.quantity } : item) : [...state.items, { ...wishlist_item }],
          }));
        },
        removeWishlistItem: (wishlist_id: string) => {
          set((state: any) => ({
            items: state.items.filter((item: any) => item.id !== wishlist_id),
          }));
        },
        clearWishlist: () => {
          set({ items: [] });
        }
      };
    },
    {
      name: 'wishlist-items-storage',
      storage: local_storage,
    }
  )
);
