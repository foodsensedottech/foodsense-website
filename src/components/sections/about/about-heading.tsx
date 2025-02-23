import React from 'react';
import type { AboutFields, AboutEntry } from '@/lib/contentful/types';

interface AboutHeadingProps {
  data: AboutEntry;
}

export function AboutHeading({ data }: AboutHeadingProps) {
  const fields = data?.fields as AboutFields;
  if (!fields) return null;
  
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">{fields.heading}</h2>
      <p className="text-lg text-gray-600">{fields.subheading}</p>
    </div>
  );
} 