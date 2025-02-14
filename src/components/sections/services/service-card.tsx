import React from 'react';
import Image from 'next/image';
import type { Entry } from 'contentful';
import type { ServiceCardContentType, ServiceCardFields } from '@/types/contentful/services';

interface ServiceCardProps {
  data: Entry<ServiceCardContentType>;
}

export function ServiceCard({ data }: ServiceCardProps) {
  const fields = data?.fields as ServiceCardFields;
  if (!fields?.servicesThumbnail?.fields?.file?.url) return null;

  const imageUrl = fields.servicesThumbnail.fields.file.url.startsWith('//') 
    ? `https:${fields.servicesThumbnail.fields.file.url}`
    : fields.servicesThumbnail.fields.file.url;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Thumbnail Image */}
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={fields.servicesThumbnail.fields.title || fields.servicesTitle}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {fields.servicesTitle}
        </h3>
        <p className="text-gray-600">
          {fields.servicesDescription}
        </p>
      </div>
    </div>
  );
} 