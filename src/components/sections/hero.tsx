import React from 'react';
import Image from 'next/image';
import type { Entry } from 'contentful';
import type { HeroContentType, HeroFields } from '@/types/contentful/hero';

interface HeroProps {
  data: Entry<HeroContentType>;
}

export function Hero({ data }: HeroProps) {
  const fields = data?.fields as HeroFields;
  
  // Early return with proper validation
  if (!fields?.backgroundImage?.fields?.file?.url) {
    console.warn('Hero: Missing required image data');
    return null;
  }

  // Process image URL with validation
  const imageUrl = fields.backgroundImage.fields.file.url.startsWith('//') 
    ? `https:${fields.backgroundImage.fields.file.url}`
    : fields.backgroundImage.fields.file.url;

  // Validate final URL
  if (!imageUrl) {
    console.error('Hero: Invalid image URL');
    return null;
  }

  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={fields.backgroundImage.fields.title || 'Hero background'}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized // Keep optimization disabled for now
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {fields.heroHeading}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl">
          {fields.heroSubheading}
        </p>
      </div>
    </section>
  );
} 