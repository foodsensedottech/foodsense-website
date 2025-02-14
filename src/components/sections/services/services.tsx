import React from 'react';
import type { Entry } from 'contentful';
import type { ServicesContentType, ServiceCardContentType, ServicesFields } from '@/types/contentful/services';
import { ServiceCard } from './service-card';

interface ServicesProps {
  data: Entry<ServicesContentType>;
  cards: Entry<ServiceCardContentType>[] | null;
}

export function Services({ data, cards }: ServicesProps) {
  const fields = data?.fields as ServicesFields;
  if (!fields?.servicesTitle || !fields?.servicesSubtitle) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{fields.servicesTitle}</h2>
          <p className="text-lg text-gray-600">{fields.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards?.map((card) => (
            <ServiceCard key={card.sys.id} data={card} />
          ))}
        </div>
      </div>
    </section>
  );
} 