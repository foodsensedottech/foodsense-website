import type { Entry, EntrySkeletonType } from 'contentful';

// Define content type IDs
export type CONTENT_TYPE = 'testimonialsTitleAndSubtitle' | 'testimonialCard';

// Define field types
export interface TestimonialsFields {
  testimonialTitle: string;
  testimonialSubtitle: string;
}

export interface TestimonialCardFields {
  testimonialQuote: string;
  rating: number;
  businessOwner: string;
  businessName: string;
  businessImage: {
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

// Define Entry types
export type TestimonialsContentType = {
  contentTypeId: 'testimonialsTitleAndSubtitle';
  fields: TestimonialsFields;
} & EntrySkeletonType;

export type TestimonialCardContentType = {
  contentTypeId: 'testimonialCard';
  fields: TestimonialCardFields;
} & EntrySkeletonType;

export type TestimonialsEntry = Entry<TestimonialsContentType>;
export type TestimonialCardEntry = Entry<TestimonialCardContentType>; 