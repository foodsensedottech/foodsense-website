import type { Entry, EntrySkeletonType } from 'contentful';

export interface ServiceOptionFields {
  title: string;
  description: string;
  isActive: boolean;
  order: number;
}

export interface ServiceOptionSkeleton extends EntrySkeletonType {
  contentTypeId: 'serviceOption';
  fields: ServiceOptionFields;
}

export type ServiceOptionEntry = Entry<ServiceOptionFields>;

export interface ServiceFormOptions {
  delivery_partners: string[];  // Make sure these match form data
  interested_services: string[];
} 