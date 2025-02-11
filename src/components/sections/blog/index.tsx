'use client';
import React, { useState } from 'react';
import type { Entry } from 'contentful';
import type { BlogPostContentType } from '@/types/contentful/blog';
import { BlogCard } from './blog-card';

interface BlogProps {
  posts: Entry<BlogPostContentType>[] | null;
}

export function Blog({ posts }: BlogProps) {
  const [showAll, setShowAll] = useState(false);
  
  if (!posts?.length) {
    return null;
  }

  const visiblePosts = showAll ? posts : posts.slice(0, 2);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest News</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest insights and success stories
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {visiblePosts.map((post) => (
            <BlogCard key={post.sys.id} data={post} />
          ))}
        </div>

        {posts.length > 2 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent 
                text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                transition duration-150 ease-in-out"
            >
              {showAll ? 'Show Less' : 'Read More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
} 