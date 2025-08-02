import { local_storage } from '@/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: any;
}

export interface Order {
  id: string;
  user_id?: string;
  items: OrderItem[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  delivery_address: any;
  payment_method: string;
  created_at: string;
  updated_at: string;
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  placing: boolean;
  
  // Actions
  placeOrder: (orderData: Partial<Order>) => Promise<void>;
  getOrders: () => Promise<void>;
  getOrderById: (orderId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      loading: false,
      error: null,
      placing: false,

      placeOrder: async (orderData: Partial<Order>) => {
        set({ placing: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const newOrder: Order = {
            id: Date.now().toString(),
            user_id: 'user123', // Replace with actual user ID
            items: orderData.items || [],
            total_amount: orderData.total_amount || 0,
            status: 'pending',
            delivery_address: orderData.delivery_address,
            payment_method: orderData.payment_method || 'card',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...orderData,
          };

          set((state) => ({
            orders: [newOrder, ...state.orders],
            currentOrder: newOrder,
            placing: false,
          }));
        } catch (error: any) {
          set({ error: error.message || 'Failed to place order', placing: false });
          throw error;
        }
      },

      getOrders: async () => {
        set({ loading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          // In real app, fetch from API
          set({ loading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch orders', loading: false });
        }
      },

      getOrderById: async (orderId: string) => {
        set({ loading: true, error: null });
        try {
          const order = get().orders.find(o => o.id === orderId);
          set({ currentOrder: order || null, loading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch order', loading: false });
        }
      },

      updateOrderStatus: async (orderId: string, status: Order['status']) => {
        set({ loading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set((state) => ({
            orders: state.orders.map(order =>
              order.id === orderId
                ? { ...order, status, updated_at: new Date().toISOString() }
                : order
            ),
            currentOrder: state.currentOrder?.id === orderId
              ? { ...state.currentOrder, status, updated_at: new Date().toISOString() }
              : state.currentOrder,
            loading: false,
          }));
        } catch (error: any) {
          set({ error: error.message || 'Failed to update order', loading: false });
        }
      },

      clearCurrentOrder: () => {
        set({ currentOrder: null });
      },
    }),
    {
      name: 'order-storage',
      storage: local_storage,
    }
  )
);