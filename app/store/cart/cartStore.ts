import { local_storage } from '@/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string; // product_id
  quantity: number;
  product?: any;
  [key: string]: any;
}

interface CartStore {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  products: Record<string, any>;
  setQuantity: (cart_item: CartItem) => void;
  removeItem: (cart_id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      return {
        items: [],
        loading: false,
        error: null,
        products: {},
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
        setQuantity: (cart_item: CartItem) => {
          let existingItem = get().items.find((item: any) => item.id === cart_item.id);

          set((state: any) => ({
            items: existingItem ? state.items.map((item: any) => item.id === cart_item.id ? { ...item, quantity: cart_item.quantity } : item) : [...state.items, { ...cart_item }],
          }));
        },
        removeItem: (cart_id: string) => {
          set((state: any) => ({
            items: state.items.filter((item: any) => item.id !== cart_id),
          }));
        },
        clearCart: () => {
          set({ items: [] });
        }
      };
    },
    {
      name: 'cart-items-storage',
      storage: local_storage,
    }
  )
);
