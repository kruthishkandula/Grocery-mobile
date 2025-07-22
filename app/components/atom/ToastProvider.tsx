import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Toast, { ToastProps } from '@atom/Toast';

interface ToastContextProps {
  showToast: (props: ToastProps) => void;
  hideToast?: () => void;
  clearToasts?: () => void;
}

const ToastContext = createContext<ToastContextProps>({ showToast: () => { }, hideToast: () => { }, clearToasts: () => { } });

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastProps & { key: number } | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((props: ToastProps) => {
    setToast({ ...props, key: Date.now() });
    setVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
    setTimeout(() => setToast(null), 300);
  }, []);

  const clearToasts = useCallback(() => {
    setToast(null);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setToast(null), 300);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast, clearToasts }}>
      {children}
      {toast && visible && (
        <Toast {...toast} onClose={handleClose} key={toast.key} />
      )}
    </ToastContext.Provider>
  );
};
