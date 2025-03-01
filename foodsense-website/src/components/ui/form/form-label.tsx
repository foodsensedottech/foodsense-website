import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, isRequired, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      >
        {children}
        {isRequired && <span className="text-destructive ml-1">*</span>}
      </label>
    );
  }
);
FormLabel.displayName = "FormLabel";
