import type { Entry } from 'contentful';

export interface ServiceOptionFields {
  title: string;
  description: string;
  isActive: boolean;
  order: number;
}

// Remove the skeleton interface since we don't need it
export type ServiceOptionEntry = Entry<ServiceOptionFields>; 