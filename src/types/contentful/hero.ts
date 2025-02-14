import type { Entry, EntrySkeletonType } from 'contentful';

// Define content type ID as used in Contentful
export type CONTENT_TYPE = 'heroFields';

// Define field types that match Contentful exactly
export interface HeroFields {
  heroHeading: string;    // Symbol type with min:10, max:65 validation
  heroSubheading: string; // Symbol type with min:25, max:250 validation
  backgroundImage: {
    sys: {
      id: string;
      type: 'Asset';
      linkType: 'Asset';
      space: {
        sys: {
          type: 'Link';
          linkType: 'Space';
          id: string;
        };
      };
    };
    fields: {
      title: string;
      file: {
        url: string;
        fileName: string;
        contentType: string;
      };
    };
  };
}

// Define Entry types using Contentful's Entry type
export type HeroContentType = {
  contentTypeId: 'heroFields';
  fields: HeroFields;
} & EntrySkeletonType;

export type HeroEntry = Entry<HeroContentType>; 