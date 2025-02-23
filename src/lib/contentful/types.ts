
// Consolidated Contentful Types
import { Entry } from 'contentful';

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

export interface HeroContentType {
  title: string;
  subtitle: string;
  backgroundImage: {
    url: string;
    title: string;
  };
}

export interface ServicesContentType {
  title: string;
  subtitle: string;
  description: string;
}

export interface ServiceCardContentType {
  title: string;
  description: string;
  features: string[];
}

export interface TestimonialsContentType {
  title: string;
  subtitle: string;
}

export interface TestimonialCardContentType {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface BlogContentType {
  title: string;
  subtitle: string;
}

export interface BlogPostContentType {
  title: string;
  slug: string;
  publishDate: string;
  excerpt: string;
  content: any;
}

export interface PageContentType {
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
