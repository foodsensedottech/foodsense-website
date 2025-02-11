import React from 'react';
import Image from 'next/image';
import type { Entry } from 'contentful';
import type { TestimonialCardContentType, TestimonialCardFields } from '@/types/contentful/testimonials';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  data: Entry<TestimonialCardContentType>;
}

export function TestimonialCard({ data }: TestimonialCardProps) {
  const fields = data?.fields as TestimonialCardFields;
  if (!fields?.businessImage?.fields?.file?.url) return null;

  const imageUrl = fields.businessImage.fields.file.url.startsWith('//') 
    ? `https:${fields.businessImage.fields.file.url}`
    : fields.businessImage.fields.file.url;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Quote */}
      <p className="text-gray-600 mb-6 italic">&ldquo;{fields.testimonialQuote}&rdquo;</p>

      <div className="flex items-center">
        {/* Circular Image */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
          <Image
            src={imageUrl}
            alt={fields.businessImage.fields.title || fields.businessName}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div>
          {/* Business Owner & Name */}
          <h4 className="font-bold">{fields.businessOwner}</h4>
          <p className="text-sm text-gray-600">{fields.businessName}</p>
          
          {/* Rating Stars */}
          <div className="flex mt-1">
            {[...Array(fields.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 