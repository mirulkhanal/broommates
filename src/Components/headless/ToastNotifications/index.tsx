// ToastNotifications.tsx
import React, { useState, createContext, useContext } from 'react';
import { ToastContainer, Toast } from './toastNotificationComponent';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  isLeaving?: boolean;
  timeRemaining?: number;
}

interface ToastContextProps {
  addToast: (message: string, type: 'success' | 'error' | 'warning') => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let toastId = 0;

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'warning') => {
    const id = ++toastId;
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, type, message, timeRemaining: 3000 },
    ]);
    const intervalId = setInterval(() => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === id
            ? { ...toast, timeRemaining: toast.timeRemaining! - 100 }
            : toast
        )
      );
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId);
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === id ? { ...toast, isLeaving: true } : toast
        )
      );
      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, 300); // Wait for the slide-out animation to complete
    }, 3000); // Toast stays for 5 seconds before leaving
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            isLeaving={toast.isLeaving || false}
            message={toast.message}
            timeRemaining={toast.timeRemaining}>
            {toast.message}
            <button
              onClick={() => {
                setToasts((prevToasts) =>
                  prevToasts.map((t) =>
                    t.id === toast.id ? { ...t, isLeaving: true } : t
                  )
                );
                setTimeout(() => {
                  setToasts((prevToasts) =>
                    prevToasts.filter((t) => t.id !== toast.id)
                  );
                }, 300); // Wait for the slide-out animation to complete
              }}>
              ×
            </button>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToast };
