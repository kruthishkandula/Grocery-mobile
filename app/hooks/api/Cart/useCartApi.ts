import { fetchCart, removeFromCart, updateCart } from '@/api/nodeapi/Cart/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useCartApi() {
    const queryClient = useQueryClient();

    const cartQuery = useQuery({
        queryKey: ['cart_items'],
        queryFn: () => fetchCart(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    const updateMutation = useMutation({
        mutationFn: updateCart,
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['cart_count', 'cart_items']);
        },
    });

    const removeMutation = useMutation({
        mutationFn: (cart_id: string) => removeFromCart({ cart_id }),
        onSuccess: () => {
            // @ts-ignore
            queryClient.invalidateQueries(['cart_count', 'cart_items']);
        },
    });

    return {
        cartQuery,
        updateMutation,
        removeMutation
    }
}