import React from 'react';
import type { Entry } from 'contentful';
import type { AboutCardContentType } from '@/lib/contentful/types';
import { AboutCard } from '@/components/sections/about/about-card';

interface AboutCardsProps {
  data: Entry<AboutCardContentType>[] | null;
}

export function AboutCards({ data }: AboutCardsProps) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {data.map((card) => (
        <AboutCard key={card.sys.id} data={card} />
      ))}
    </div>
  );
}
