"use client";

import * as React from "react";
import { Checkbox } from "./checkbox";
import { cn } from "@/lib/utils";

export interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
  error?: string;
}

export function CheckboxGroup({
  options,
  value = [],
  onChange,
  onBlur,
  disabled,
  className,
  itemClassName,
  labelClassName,
  error
}: CheckboxGroupProps) {
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;

    const newValue = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-0.5", className)} onBlur={onBlur}>
      {options.map((option) => (
        <div 
          key={option.value} 
          className={cn(
            "flex items-center space-x-2 py-0.5",
            itemClassName
          )}
        >
          <Checkbox
            id={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(option.value, checked as boolean)
            }
            disabled={disabled}
            className="h-4 w-4"
          />
          <label
            htmlFor={option.value}
            className={cn(
              "text-sm font-medium leading-none cursor-pointer",
              disabled && "cursor-not-allowed opacity-70",
              error && "text-destructive",
              labelClassName
            )}
          >
            {option.label}
          </label>
        </div>
      ))}
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
}
