import { IconType } from '@/constants/icons';
import { _randmomString } from '@/utility/utility';
import { create } from 'zustand';

export type AlertType = {
    id?: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' | 'nothing';
    duration: number | 2000;
    title?: string;
    icon?: IconType;
    alignment?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'bottomCenter' | 'topCenter';
    zIndex?: number;
    close?: boolean;
    nothing?: boolean;
    top?: boolean;
    onLinkPress?: () => void;
    onPress?: () => void;
};

export interface AlertStore {
    alerts: AlertType[];
    addAlert: (alert: AlertType) => void;
    removeAlert: (id?: string) => void;
    clearAlerts: () => void;
}

const useAlertStore = create<AlertStore>()((set: any) => ({
    alerts: [],
    // addAlert: (alert: any) => set((state: any) => ({ alerts: [...state.alerts, { ...alert, id: _randmomString() }] })),
    // removeAlert: (id: any) => set((state: any) => ({
    //     alerts: state.alerts.filter((alert: any) => alert.id !== id)
    // })),
    addAlert: (alert: any) => set((state: any) => ({ alerts: [{ ...alert, id: _randmomString() }] })),
    removeAlert: (id: any) => set((state: any) => ({
        alerts: []
    })),
    clearAlerts: () => set({
        alerts: []
    }),
}));

export default useAlertStore;