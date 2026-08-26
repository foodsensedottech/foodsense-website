// Consolidated Contentful Types
import { EntryFields } from "contentful";
import type { Document } from "@contentful/rich-text-types";
import type { Asset } from "contentful";

// Helper type to ensure all content types satisfy Contentful's requirements
export interface ContentfulEntryFields {
  [key: string]: any;
}

export interface ContentfulEntry<T extends ContentfulEntryFields> {
  fields: T;
  sys: {
    id: string;
    [key: string]: any;
  };
  metadata?: any;
}

// Define the fields for the About Title content type
export interface AboutTitleFields extends ContentfulEntryFields {
  heading: string;
  subheading: string;
  seoMetadata?: {
    fields: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

// Define the fields for the About Card content type
export interface AboutCardFields extends ContentfulEntryFields {
  title: string;
  description: string;
  lucideIcon: string;
  sortOrder?: number;
}

// Use type aliases for ContentfulEntry types
export type AboutCardEntry = ContentfulEntry<AboutCardFields>;
export type AboutEntry = ContentfulEntry<AboutTitleFields>;

export interface AboutContentType {
  title: string;
  subtitle: string;
}

export interface AboutCardContentType {
  title: string;
  description: string;
  icon: string;
  statistic?: {
    value: string;
    label: string;
  };
}

export interface HeroFields extends ContentfulEntryFields {
  heroHeading: string;
  heroSubheading: string;
  heroEyebrow?: string;
  heroCta?: string;
  heroCtaHref?: string;
  backgroundImage?: {
    fields: {
      file: {
        url: string;
        details: {
          size: number;
          image: {
            width: number;
            height: number;
          };
        };
      };
      title: string;
      description?: string;
    };
  };
  seoMetadata?: {
    fields: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

export type HeroContentType = ContentfulEntry<HeroFields>;

export interface ServicesTitleFields extends ContentfulEntryFields {
  servicesTitle: string;
  servicesSubtitle: string;
  seoMetadata?: {
    fields: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

export interface ServicesCardFields extends ContentfulEntryFields {
  title: string;
  description: string;
  lucideIcon: string;
  thumbnail?: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
      title: string;
    };
  };
}

export interface TestimonialsTitleFields extends ContentfulEntryFields {
  testimonialTitle: string;
  testimonialSubtitle: string;
  seoMetadata?: {
    fields: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

export interface TestimonialsCardFields extends ContentfulEntryFields {
  testimonialQuote: string;
  rating: number;
  businessOwner: string;
  businessName: string;
  businessImage: {
    fields: {
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
      };
      title: string;
    };
  };
}

export interface TestimonialCardContentType {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface TestimonialsContentType {
  title: string;
  subtitle: string;
}

export interface ServicesContentType {
  title: string;
  subtitle: string;
}

export interface ServiceCardContentType {
  title: string;
  description: string;
  thumbnail: {
    url: string;
    title: string;
    width: number;
    height: number;
  };
}

export interface BlogContentType extends ContentfulEntryFields {
  title: string;
  subtitle: string;
}

export interface BlogPostContentType extends ContentfulEntryFields {
  title: string;
  slug: string;
  publishDate: string;
  excerpt: string;
  content: Document;
}

export interface PageContentType extends ContentfulEntryFields {
  title: string;
  description: string;
  slug: string;
  ogImage?: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
}

// Add type aliases for ContentfulEntry types
export type TestimonialsTitleEntry = ContentfulEntry<TestimonialsTitleFields>;
export type TestimonialsCardEntry = ContentfulEntry<TestimonialsCardFields>;
export type ServicesTitleEntry = ContentfulEntry<ServicesTitleFields>;
export type ServicesCardEntry = ContentfulEntry<ServicesCardFields>;

export interface ContactTitleFields extends ContentfulEntryFields {
  title: string;
  subtitle?: string;
}

export type ContactTitle = ContentfulEntry<ContactTitleFields>;

export interface ContactSectionContent {
  heading: ContactTitle;
}

export interface ContactSectionCopy {
  heading: string;
  subheading?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  errorMessage?: string;
}

export interface SiteChrome {
  ctaLabel?: string;
  navAbout?: string;
  navPains?: string;
  navOfferings?: string;
  navServices?: string;
  navContact?: string;
  footerTagline?: string;
  footerGeo?: string;
  footerEmail?: string;
  linkedInUrl?: string;
  instagramUrl?: string;
  cookieHeadline?: string;
  cookieBody?: string;
  cookieAccept?: string;
  cookieReject?: string;
}

export interface AboutCard {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface ServiceCard {
  thumbnail: Asset;
  title: string;
  description: string;
}

export interface TestimonialCard {
  quote: string;
  authorName: string;
  businessName: string;
  authorImage: Asset;
}

export interface BlogPost {
  title: string;
  description: string;
  linkedInUrl: string;
}

export interface FranchiseeTitleFields extends ContentfulEntryFields {
  heading: string;
  subheading: string;
}

export interface FranchiseeCardFields extends ContentfulEntryFields {
  title: string;
  description: string;
  lucideIcon: string;
  sortOrder?: number;
}

export type FranchiseeTitleEntry = ContentfulEntry<FranchiseeTitleFields>;
export type FranchiseeCardEntry = ContentfulEntry<FranchiseeCardFields>;
