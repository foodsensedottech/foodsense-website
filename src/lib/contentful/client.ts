import { createClient, Entry } from 'contentful';
import { getEnvVar } from '../env';
import type { AboutContentType, AboutCardContentType } from '@/types/contentful/about';
import type { HeroContentType } from '@/types/contentful/hero';
import type { ServicesContentType, ServiceCardContentType } from '@/types/contentful/services';
import type { TestimonialsContentType, TestimonialCardContentType } from '@/types/contentful/testimonials';
import type { BlogContentType, BlogPostContentType } from '@/types/contentful/blog';

const client = createClient({
  space: getEnvVar('CONTENTFUL_SPACE_ID'),
  accessToken: getEnvVar('CONTENTFUL_ACCESS_TOKEN'),
});

const previewClient = createClient({
  space: getEnvVar('CONTENTFUL_SPACE_ID'),
  accessToken: getEnvVar('CONTENTFUL_PREVIEW_ACCESS_TOKEN'),
  host: 'preview.contentful.com',
});

export const getClient = (preview: boolean = false) => 
  preview ? previewClient : client;

export default client;

export async function getAboutHeading(): Promise<Entry<AboutContentType> | null> {
  try {
    const response = await client.getEntries<AboutContentType>({
      content_type: 'aboutUsTitleSubtitle',
      limit: 1,
    });
    console.log('Contentful Raw Response:', JSON.stringify(response, null, 2));
    console.log('First Item:', JSON.stringify(response.items[0], null, 2));
    return response.items[0];
  } catch (error) {
    console.error('Error fetching about heading:', error);
    return null;
  }
}

export async function getAboutCards(): Promise<Entry<AboutCardContentType>[] | null> {
  try {
    const response = await client.getEntries<AboutCardContentType>({
      content_type: 'aboutUsCard',
    });
    console.log('About Cards Response:', JSON.stringify(response, null, 2));
    return response.items;
  } catch (error) {
    console.error('Error fetching about cards:', error);
    return null;
  }
}

export async function getHeroContent(): Promise<Entry<HeroContentType> | null> {
  try {
    const response = await client.getEntry<HeroContentType>('66YaALrGfY1Xzy1XY1GmyR');
    console.log('Hero Entry Response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
}

export async function getServicesHeading(): Promise<Entry<ServicesContentType> | null> {
  try {
    const response = await client.getEntries<ServicesContentType>({
      content_type: 'servicesTitleAndSubtitle',
      limit: 1,
    });
    console.log('Raw Services Response:', JSON.stringify(response, null, 2));
    return response.items[0];
  } catch (error) {
    console.error('Error fetching services heading:', error);
    return null;
  }
}

export async function getServiceCards(): Promise<Entry<ServiceCardContentType>[] | null> {
  try {
    const response = await client.getEntries<ServiceCardContentType>({
      content_type: 'servicesCard',
    });
    console.log('Service Cards Response:', JSON.stringify(response, null, 2));
    return response.items;
  } catch (error) {
    console.error('Error fetching service cards:', error);
    return null;
  }
}

export async function getTestimonialsHeading(): Promise<Entry<TestimonialsContentType> | null> {
  try {
    const response = await client.getEntries<TestimonialsContentType>({
      content_type: 'testimonialsTitleAndSubtitle',
      limit: 1,
    });
    
    // Get the first item directly
    const testimonialHeading = response.items[0];
    console.log('Testimonial Heading:', testimonialHeading?.fields);
    
    return testimonialHeading || null;
  } catch (error) {
    console.error('Error fetching testimonials heading:', error);
    return null;
  }
}

export async function getTestimonialCards(): Promise<Entry<TestimonialCardContentType>[] | null> {
  try {
    const response = await client.getEntries<TestimonialCardContentType>({
      content_type: 'testimonialCard',
    });
    console.log('Testimonial Cards Response:', JSON.stringify(response, null, 2));
    return response.items;
  } catch (error) {
    console.error('Error fetching testimonial cards:', error);
    return null;
  }
}

export async function getBlogHeading(): Promise<Entry<BlogContentType> | null> {
  try {
    const response = await client.getEntries<BlogContentType>({
      content_type: 'blogTitleAndSubtitle',
      limit: 1,
    });
    return response.items[0];
  } catch (error) {
    console.error('Error fetching blog heading:', error);
    return null;
  }
}

export async function getBlogPosts(limit: number = 2): Promise<Entry<BlogPostContentType>[] | null> {
  try {
    const response = await client.getEntries<BlogPostContentType>({
      content_type: 'blogPost',
      limit,
      order: ['-fields.publishDate'], // Sort by newest first
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}
