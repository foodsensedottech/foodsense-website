import type { Entry, EntrySkeletonType } from 'contentful';

// Define content type IDs
export type CONTENT_TYPE = 'blogTitleAndSubtitle' | 'blogPost';

// Define field types
export interface BlogFields {
  blogTitle: string;
  blogSubtitle: string;
}

export interface BlogPostFields {
  title: string;
  description: string;
  linkedInEmbedUrl: string;
  publishDate: string;
}

// Define Entry types
export type BlogContentType = {
  contentTypeId: 'blogTitleAndSubtitle';
  fields: BlogFields;
} & EntrySkeletonType;

export type BlogPostContentType = {
  contentTypeId: 'blogPost';
  fields: BlogPostFields;
} & EntrySkeletonType;

export type BlogEntry = Entry<BlogContentType>;
export type BlogPostEntry = Entry<BlogPostContentType>; 