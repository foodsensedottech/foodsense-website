interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  touched?: boolean;
  isDirty?: boolean;
}

export function Input({ 
  label, 
  error, 
  required, 
  helpText, 
  touched,
  isDirty,
  ...props 
}: InputProps) {
  const showSuccess = touched && isDirty && !error;
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : 
              showSuccess ? 'border-green-500 focus:ring-green-500' : 
              'border-gray-300 focus:ring-blue-500'}
          `}
          {...props}
        />
        {showSuccess && (
          <span className="absolute right-3 top-2.5 text-green-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </div>
      {helpText && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
} 