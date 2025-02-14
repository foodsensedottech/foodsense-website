import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ 
  label, 
  error, 
  required, 
  options,
  placeholder = "Select an option",
  value,
  ...props 
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${value ? 'text-gray-900 font-medium' : 'text-gray-500'}
        `}
        {...props}
      >
        <option value="" className="text-gray-500">{placeholder}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value} className="text-gray-900 font-medium">
            {label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
} 