import * as React from "react";
import { cn } from "@/lib/utils";
import { FormLabel } from "./form-label";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

export function FormField({
  label,
  error,
  helperText,
  required,
  className,
  children,
  ...props
}: FormFieldProps) {
  const id = React.useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <FormLabel
        htmlFor={id}
        className={cn(error && "text-destructive")}
        isRequired={required}
      >
        {label}
      </FormLabel>

      <div className="relative">{children}</div>

      {helperText && (
        <p
          id={error ? errorId : helperId}
          className={cn(
            "text-sm",
            error
              ? "text-destructive dark:text-red-400"
              : "text-muted-foreground"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
