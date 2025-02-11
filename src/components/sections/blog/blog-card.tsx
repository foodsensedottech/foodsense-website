'use client';
import React from 'react';
import type { Entry } from 'contentful';
import type { BlogPostContentType, BlogPostFields } from '@/types/contentful/blog';
import { ExternalLink } from 'lucide-react';

interface BlogCardProps {
  data: Entry<BlogPostContentType>;
}

export function BlogCard({ data }: BlogCardProps) {
  const fields = data?.fields as BlogPostFields;
  if (!fields?.linkedInEmbedUrl) return null;

  // Get the article URL
  const articleUrl = 'https://www.linkedin.com/pulse/doggis-arepa-bar-from-hot-dog-cart-hosting-vice-president';

  return (
    <a 
      href={articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{fields.title}</h3>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>

          <p className="text-gray-600 mb-6">
            From our humble beginnings as a hot dog cart, we have always believed hard work would take us far in this great country. 
            Never in our wildest dreams did we imagine that the United States Vice President would make an official stop at Doggi's Arepa Bar for an Arepa!
          </p>

          <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
            <span>{new Date(fields.publishDate).toLocaleDateString()}</span>
            <span className="text-blue-600">By Doggi's Arepa Bar</span>
          </div>
        </div>
      </div>
    </a>
  );
} 