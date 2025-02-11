import { createClient, Entry } from 'contentful';
import { getEnvVar } from '../env';
import type { AboutContentType, AboutCardContentType } from '@/types/contentful/about';

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
