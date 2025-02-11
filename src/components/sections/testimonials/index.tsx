import React from 'react';
import type { Entry } from 'contentful';
import type { TestimonialsContentType, TestimonialCardContentType, TestimonialsFields } from '@/types/contentful/testimonials';
import { TestimonialCard } from './testimonial-card';

interface TestimonialsProps {
  data: Entry<TestimonialsContentType>;
  cards: Entry<TestimonialCardContentType>[] | null;
}

export function Testimonials({ data, cards }: TestimonialsProps) {
  console.log('Testimonials Data:', JSON.stringify(data, null, 2));
  console.log('Testimonials Cards:', JSON.stringify(cards, null, 2));

  const fields = data?.fields as TestimonialsFields;
  if (!data || !fields?.testimonialTitle || !fields?.testimonialSubtitle) {
    console.warn('Testimonials: Missing required fields', { data, fields });
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{fields.testimonialTitle}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{fields.testimonialSubtitle}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards?.map((card) => (
            <TestimonialCard key={card.sys.id} data={card} />
          ))}
        </div>
      </div>
    </section>
  );
} 