// Consolidated Base Types

// From base.ts
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export type Theme = "light" | "dark" | "system";


// From components.ts
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}


// From api.ts
import type { ContactFormValues } from "@/components/forms/contact/schema";

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
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form Types
export interface FormFieldProps extends BaseComponentProps {
  label: string;
  error?: string;
  required?: boolean;
}

// Theme Types
export type Theme = "light" | "dark" | "system";

// Keep only the types needed for the form select:
export interface SelectOption {
  value: string;
  label: string;
}


