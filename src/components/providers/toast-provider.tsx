"use client";

import * as React from "react";
import {
  Toast,
  ToastProvider as RadixToastProvider,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from '@/components/ui/feedback/toast';
import type { ToastProps } from "@radix-ui/react-toast";

type ToastOptions = {
  title?: string;
  description?: string;
  duration?: number;
  variant?: "default" | "success" | "error";
} & Partial<ToastProps>;

const ToastContext = React.createContext<{
  toast: (options: ToastOptions) => void;
}>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastOptions[]>([]);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36);
    const newToast = { ...options, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, options.duration || 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <RadixToastProvider>
        {children}
        {toasts.map((toast) => (
          <Toast key={toast.id} variant={toast.variant}>
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && (
              <ToastDescription>{toast.description}</ToastDescription>
            )}
          </Toast>
        ))}
        <ToastViewport />
      </RadixToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
