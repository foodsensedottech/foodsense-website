import React from 'react';
import { Metadata } from 'next';
import { Blog } from "@/components/sections/blog";
import { generatePageMetadata } from '@/lib/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'FoodSense Blog',
    description: 'Expert insights, tips, and strategies for restaurant owners and managers.',
    publisher: {
      '@type': 'Organization',
      name: 'FoodSense',
      logo: {
        '@type': 'ImageObject',
        url: 'https://foodsense.tech/logo.png',
      },
    },
    url: 'https://foodsense.tech/blog',
  };

  return generatePageMetadata({
    title: 'Restaurant Industry Insights & Tips | FoodSense Blog',
    description: 'Expert insights, tips, and strategies for restaurant owners and managers. Learn about menu optimization, cost control, and operational efficiency.',
    path: '/blog',
    openGraph: {
      type: 'blog',
      images: ['/blog-og-image.jpg'],
    },
    alternates: {
      languages: {
        'en': 'https://foodsense.tech/en/blog',
        'es': 'https://foodsense.tech/es/blog',
      },
    },
    jsonLd,
  });
}

export default function BlogPage() {
  return (
    <main className="container mx-auto">
      <Blog />
    </main>
  );
} 