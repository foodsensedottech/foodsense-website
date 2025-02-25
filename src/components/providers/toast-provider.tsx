"use client";

import * as React from "react";
import {
  Toast,
  ToastProvider as RadixToastProvider,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/feedback/toast";
import type { ToastProps } from "@radix-ui/react-toast";

// Separate the base toast options from Radix props
interface BaseToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  variant?: "default" | "success" | "error";
}

// Combine base options with Radix props, but make them optional
type ToastOptions = BaseToastOptions &
  Partial<Omit<ToastProps, keyof BaseToastOptions>>;

const ToastContext = React.createContext<{
  toast: (options: ToastOptions) => void;
}>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<(ToastOptions & { id: string })[]>(
    []
  );

  const toast = React.useCallback((options: ToastOptions) => {
    const id = options.id || Math.random().toString(36);
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
        {toasts.map((toast) => {
          // Extract the properties we need to pass as props
          const { id, variant, title, description, ...toastProps } = toast;

          // Only pass valid props to the Toast component
          return (
            <Toast key={id} variant={variant} {...toastProps}>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </Toast>
          );
        })}
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
