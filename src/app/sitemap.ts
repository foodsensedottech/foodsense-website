import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://foodsense.tech'
  
  const routes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/blog'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8
  }))

  // Add dynamic routes for blog posts if any
  // const posts = await getPosts()
  // const blogRoutes = posts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6
  // }))

  return [
    ...routes,
    // ...blogRoutes
  ]
} 