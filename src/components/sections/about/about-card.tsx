import React from 'react';
import type { Entry } from 'contentful';
import type { AboutCardContentType, AboutCardFields } from '@/types/contentful/about';
import { getLucideIcon } from '@/lib/utils/icon-parser';

interface AboutCardProps {
  data: Entry<AboutCardContentType>;
}

export function AboutCard({ data }: AboutCardProps) {
  const fields = data?.fields as AboutCardFields;
  if (!fields) return null;

  const Icon = getLucideIcon(fields.lucideIcon);
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {Icon && (
        <Icon 
          className="w-8 h-8 mb-4" 
          style={{ color: '#f1c100', strokeWidth: 2.5 }}
        />
      )}
      <h3 className="text-xl font-bold mb-2">{fields.title}</h3>
      <p className="text-gray-600">{fields.description}</p>
    </div>
  );
} 