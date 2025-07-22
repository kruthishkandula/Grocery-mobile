import { AuthStore, useAuthStore } from "./authStore";


// Update login status directly
export const updateLogin = (state: AuthStore['userLoggedIn']) => {
    const { setUserLoggedIn } = useAuthStore.getState();
    setUserLoggedIn(state);  // Call the update function
};
export const getLoginStatus = () => {
    const { userLoggedIn } = useAuthStore.getState();
    return userLoggedIn;
};


// Update metadata directly
export const updateMetadata = (payload: AuthStore['metadata']) => {
    const { setMetadata } = useAuthStore.getState();
    setMetadata(payload);
};
export const getMetadata = (): AuthStore['metadata'] => {
    const { metadata } = useAuthStore.getState();
    return metadata;
};


// Update userdetails directly
export const updateUserDetails = (state: AuthStore['userDetails']) => {
    const { setUserDetails } = useAuthStore.getState();
    setUserDetails(state);  // Call the update function
};
export const getUserDetails = (): AuthStore['userDetails'] => {
    const { userDetails } = useAuthStore.getState();
    return userDetails;
};


// Update token directly
export const updateXAuthToken = (token: AuthStore['xAuthToken']) => {
    const { setToken } = useAuthStore.getState();
    token && setToken(token);  // Call the update function
};
export const getXAuthToken = (): AuthStore['xAuthToken'] => {
    const { xAuthToken } = useAuthStore.getState();
    console.log('xAuthToken', xAuthToken)
    return xAuthToken;
};