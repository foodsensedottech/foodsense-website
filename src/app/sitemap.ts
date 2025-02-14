import { MetadataRoute } from 'next';
import { getClient } from '@/lib/contentful/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all dynamic routes from Contentful
  const services = await getClient().getEntries({ content_type: 'service' });
  const blogs = await getClient().getEntries({ content_type: 'blogPost' });

  // Static routes
  const staticRoutes = [
    {
      url: 'https://foodsense.tech',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://foodsense.tech/about',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://foodsense.tech/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Dynamic routes from services
  const serviceRoutes = services.items.map((service) => ({
    url: `https://foodsense.tech/services/${service.fields.slug}`,
    lastModified: new Date(service.sys.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic routes from blog posts
  const blogRoutes = blogs.items.map((blog) => ({
    url: `https://foodsense.tech/blog/${blog.fields.slug}`,
    lastModified: new Date(blog.sys.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
} 