import * as React from "react";
import { Checkbox } from "./checkbox";
import { cn } from "@/lib/utils";

export interface CheckboxGroupProps {
  options: Array<{ label: string; value: string }>;
  value?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
}

export function CheckboxGroup({
  options,
  value = [],
  onChange,
  onBlur,
  disabled,
  className,
}: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;

    const newValue = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-2", className)} onBlur={onBlur}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) =>
              handleChange(option.value, checked as boolean)
            }
            disabled={disabled}
          />
          <label
            htmlFor={option.value}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              disabled && "cursor-not-allowed opacity-70"
            )}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
