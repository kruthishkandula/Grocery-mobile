import { local_storage } from '@/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthStore {
    userDetails?: {
        id?: number;
        user_id?: string;
        email?: string;
        username?: string;
        phonenumber?: string;
        profile_image?: string | null;
        createdAt?: string;
        role?: "admin" | "user" | "guest";
        status?: "active" | "inactive";
        currencyCode?: string;
        currencySymbol?: string;
        language?: string;
        [key: string]: any; // Allow additional properties
    };
    setUserDetails: (details: any) => void;
    userLoggedIn: boolean;
    setUserLoggedIn: (loggedIn: boolean) => void;

    xAuthToken?: string;
    setToken: (token: string) => void;

    metadata: {
        requestId?: string;
        firebasetoken?: string;
        countryOpco?: string;
        language?: string;
    };
    setMetadata: (metadata: any) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            userDetails: undefined,
            setUserDetails: (details) => set((state) => ({ ...state, userDetails: details })),
            userLoggedIn: false,
            setUserLoggedIn: (loggedIn) => set((state) => ({ ...state, userLoggedIn: loggedIn })),

            metadata: {},
            setMetadata: (payload: any) => {
                set((state: any) => ({ metadata: { ...state.metadata, ...payload } }))
            },

            xAuthToken: undefined,
            setToken: (token) => set((state) => ({ ...state, xAuthToken: token })),
        }),
        {
            name: 'auth-storage', // storage key
            storage: local_storage,
        }
    )
);