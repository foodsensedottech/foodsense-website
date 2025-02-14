import type { Entry, EntrySkeletonType } from 'contentful';

// Define content type IDs
export type CONTENT_TYPE = 'servicesTitleAndSubtitle' | 'servicesCard';

// Define field types
export interface ServicesFields {
  servicesTitle: string;
  servicesSubtitle: string;
}

export interface ServiceCardFields {
  servicesTitle: string;      // Symbol type with min:10, max:50 validation
  servicesDescription: string; // Symbol type with min:25, max:125 validation
  servicesThumbnail: {        // Link type with linkType: Asset
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
export type ServicesContentType = {
  contentTypeId: 'servicesTitleAndSubtitle';
  fields: ServicesFields;
} & EntrySkeletonType;

export type ServiceCardContentType = {
  contentTypeId: 'servicesCard';
  fields: ServiceCardFields;
} & EntrySkeletonType;

export type ServicesEntry = Entry<ServicesContentType>;
export type ServiceCardEntry = Entry<ServiceCardContentType>; 