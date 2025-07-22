import { NODE_URLS } from "@/constants/urls";
import nodeApi from "..";


// Fetch cart count
export const fetchCartCount = async () => {
  const res = await nodeApi.get(NODE_URLS.GET_CART_COUNT, {
    withCredentials: true,
  });
  return res.data;
};

// Fetch cart
export const fetchCart = async () => {
  const res = await nodeApi.get(NODE_URLS.GET_CART, {
    withCredentials: true,
  });
  console.log('resData-----', res.data)
  return res.data;
};

// Add to cart
export const addToCart = async ({
  product_id,
  quantity,
}: { product_id: string; quantity: number; }) => {
  const res = await nodeApi.post(
    NODE_URLS.ADD_TO_CART,
    { product_id, quantity },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return res.data;
};

// Update cart
export const updateCart = async ({
  cart_id,
  quantity,
}: { cart_id: string; quantity: number; }) => {
  const res = await nodeApi.put(
    NODE_URLS.UPDATE_CART(cart_id),
    { quantity },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return res.data;
};

// Remove from cart
export const removeFromCart = async ({
  cart_id,
}: { cart_id: string; }) => {
  const res = await nodeApi.delete(NODE_URLS.REMOVE_FROM_CART(cart_id), {
    withCredentials: true,
  });
  return res.data;
};
