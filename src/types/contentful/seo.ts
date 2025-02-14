import type { Asset, Entry } from 'contentful';

export interface SEOFields {
  metatitle: string;
  metadescription: string;
  keywords: string | string[]; // Can be string from Contentful or parsed array
  ogImage: Asset;
  canonicalUrl?: string;
  robots?: string;
  alternativeLanguages?: string; // JSON string
  structuredData?: string; // JSON-LD as string
  pageId: string;
}

export type SEOEntry = Entry<SEOFields>; 