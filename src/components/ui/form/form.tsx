import * as React from "react";
import { cn } from "@/lib/utils";
import { FormLabel } from "./form-label";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, children, label, error, required, ...props }, ref) => {
    const id = React.useId();

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <FormLabel htmlFor={id} className="flex items-center space-x-1">
            <span>{label}</span>
            {required && <span className="text-destructive">*</span>}
          </FormLabel>
        )}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              id,
              "aria-describedby": error ? `${id}-error` : undefined,
              "aria-invalid": error ? "true" : undefined,
              className: cn(
                child.props.className,
                error && "border-destructive focus-visible:ring-destructive"
              ),
            });
          }
          return child;
        })}
        {error && (
          <p id={`${id}-error`} className="text-sm font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };
