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
  getTotalAmount: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      return {
        items: [],
        loading: false,
        error: null,
        products: {},
        
        setQuantity: (cart_item: CartItem) => {
          let existingItem = get().items.find((item: any) => item.id === cart_item.id);

          set((state: any) => ({
            items: existingItem 
              ? state.items.map((item: any) => 
                  item.id === cart_item.id 
                    ? { ...item, quantity: cart_item.quantity } 
                    : item
                ) 
              : [...state.items, { ...cart_item }],
          }));
        },
        
        removeItem: (cart_id: string) => {
          set((state: any) => ({
            items: state.items.filter((item: any) => item.id !== cart_id),
          }));
        },
        
        clearCart: () => {
          set({ items: [] });
        },

        getTotalAmount: () => {
          return get().items.reduce((total, item) => {
            const price = item.product?.price || 0;
            return total + (price * item.quantity);
          }, 0);
        },

        getTotalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },
      };
    },
    {
      name: 'cart-items-storage',
      storage: local_storage,
    }
  )
);
