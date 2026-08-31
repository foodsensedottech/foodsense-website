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
  idPrefix?: string;
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
  error,
  idPrefix = "option",
}: CheckboxGroupProps) {
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;

    const newValue = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    onChange(newValue);
  };

  return (
    <div
      className={cn("grid grid-cols-2 gap-x-4 gap-y-2", className)}
      onBlur={onBlur}
    >
      {options.map((option) => (
        <div
          key={option.value}
          className={cn("flex items-start gap-2 min-w-0", itemClassName)}
        >
          <Checkbox
            id={`${idPrefix}-${option.value}`}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(option.value, checked as boolean)
            }
            disabled={disabled}
            className="mt-0.5 h-4 w-4 shrink-0"
          />
          <label
            htmlFor={`${idPrefix}-${option.value}`}
            className={cn(
              "text-sm font-medium leading-snug cursor-pointer",
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
        <p className="text-sm text-destructive col-span-2 mt-1">{error}</p>
      )}
    </div>
  );
}
