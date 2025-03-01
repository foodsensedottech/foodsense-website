"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  const id = React.useId();

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            id,
            "aria-describedby": error ? `${id}-error` : undefined,
            "aria-invalid": error ? "true" : undefined,
          } as React.HTMLAttributes<HTMLElement>)
        : children}
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
