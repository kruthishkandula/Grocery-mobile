import { local_storage } from '@/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Address = {
    id: string;
    label: string;
    receiverName: string;
    receiverPhone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
};

interface AddressStore {
    addresses: Address[];
    selectedAddressId?: string;
    addAddress: (address: Address) => void;
    removeAddress: (id: string) => void;
    selectAddress: (id: string) => void;
    updateAddress: (address: Address) => void;
    // Placeholder for API integration
    syncAddressesToAPI?: () => Promise<void>;
    fetchAddressesFromAPI?: () => Promise<void>;
}

export const useAddressStore = create<AddressStore>()(
    persist(
        (set, get) => ({
            addresses: [],
            selectedAddressId: undefined,
            addAddress: (address) =>
                set((state) => ({
                    addresses: [...state.addresses, address],
                    selectedAddressId: (address.isDefault || !state.selectedAddressId) ? address.id : state.selectedAddressId,
                })),
            removeAddress: (id) =>
                set((state) => ({
                    addresses: state.addresses.filter((a) => a.id !== id),
                    selectedAddressId: state.selectedAddressId === id ? undefined : state.selectedAddressId,
                })),
            selectAddress: (id) =>
                set(() => ({
                    selectedAddressId: id,
                })),
            updateAddress: (address) =>
                set((state) => ({
                    addresses: state.addresses.map((a) => (a.id === address.id ? address : a)),
                })),
            // Placeholder methods for API
            syncAddressesToAPI: async () => {
                // Implement API sync here
            },
            fetchAddressesFromAPI: async () => {
                // Implement API fetch here
            },
        }),
        {
            name: 'user-addresses',
            storage: local_storage, // Use AsyncStorage for React Native
        }
    )
);