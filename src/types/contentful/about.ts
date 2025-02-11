import type { Entry, EntrySkeletonType } from 'contentful';

// Define content type IDs as used in Contentful
export type CONTENT_TYPE = 'aboutUsTitleSubtitle' | 'aboutUsCard';

// Define field types that match Contentful exactly
export interface AboutFields {
  heading: string;
  subheading: string;
}

export interface AboutCardFields {
  title: string;
  description: string;
  lucideIcon: string;  // Symbol type with #\w+ validation pattern
}

// Define Entry types using Contentful's Entry type
export type AboutContentType = {
  contentTypeId: 'aboutUsTitleSubtitle';
  fields: AboutFields;
} & EntrySkeletonType;

export type AboutCardContentType = {
  contentTypeId: 'aboutUsCard';
  fields: AboutCardFields;
} & EntrySkeletonType;

export type AboutEntry = Entry<AboutContentType>;
export type AboutCardEntry = Entry<AboutCardContentType>;

// Contentful Content Types
export type AboutHeading = {
  contentTypeId: 'aboutUsTitle';
  fields: AboutFields;
};

export interface AboutCard {
  title: string & { length: number } & { minLength: 10; maxLength: 40 };
  description: string & { length: number } & { minLength: 25; maxLength: 250 };
  lucideIconList: 
    | "hand-coins"
    | "circle-dollar-sgn"
    | "trending-up"
    | "chart-no-axes-combined"
    | "monitor-cog"
    | "brain"
    | "ban"
    | "cloud-cog"
    | "cog"
    | "settings"
    | "user-cog"
    | "map-pin-check"
    | "monitor-smartphone"
    | "laptop"
    | "chart-column"
    | "rocket"
    | "users"
    | "target";
}
