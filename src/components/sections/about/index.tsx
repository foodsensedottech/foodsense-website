import React from 'react';
import type { Entry } from 'contentful';
import type { AboutContentType, AboutCardContentType } from '@/lib/contentful/types';
import { AboutHeading } from "./about-heading";
import { AboutCards } from "./about-cards";

interface AboutProps {
  data: Entry<AboutContentType>;
  cards: Entry<AboutCardContentType>[] | null;
}

export function About({ data, cards }: AboutProps) {
  console.log('About Component Data:', JSON.stringify(data, null, 2));
  if (!data?.fields) return null;

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto">
        <AboutHeading data={data} />
        <AboutCards data={cards} />
      </div>
    </section>
  );
} 