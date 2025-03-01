// Consolidated Base Types

// From base.ts
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export type Theme = "light" | "dark" | "system";

// From components.ts
// BaseProps already declared above

// From api.ts
// Define ContactFormValues directly instead of importing it
export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface HubspotContactResponse {
  contactId: string;
}

export type HubspotFormRequest = {
  fields: Array<{
    name: string;
    value: string;
  }>;
  context: {
    pageUri: string;
    pageName: string;
  };
};

export type ContactFormRequest = ContactFormValues;

// From index.ts
// Common Types
// BaseComponentProps is similar to BaseProps, using BaseProps instead
export type BaseComponentProps = BaseProps;

// Form Types
export interface FormFieldProps extends BaseProps {
  label: string;
  error?: string;
  required?: boolean;
}

// Theme Types
// Theme already declared above

// Keep only the types needed for the form select:
export interface SelectOption {
  value: string;
  label: string;
}

export interface ServiceOption {
  name: string;
  id: string;
}
