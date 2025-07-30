export const NODE_URLS = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    GET_USER: '/api/user',

    GET_CART_COUNT: '/api/cart/count',
    GET_CART: '/api/cart',
    ADD_TO_CART: '/api/cart',
    UPDATE_CART: (cartId: string) => `/api/cart/${cartId}`,
    REMOVE_FROM_CART: (cartId: string) => `/api/cart/${cartId}`,

    CATEGORIES: '/api/categories/list',
    PRODUCTS: '/api/products/list',
    ORDERS: '/api/orders/list',

    // cms
    BANNERS: '/api/cms/banners/list',
    DASHBOARD: '/api/cms/dashboard/list-with-data',
}


