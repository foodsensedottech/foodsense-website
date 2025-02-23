"use client";

import React from "react";
import { Computer, Rocket, Star, LineChart } from "lucide-react";
import { cardStyles } from "@/styles/card-styles";
import type {
  AboutProps,
  AboutTitleFields,
  AboutCardFields,
} from '@/lib/contentful/types';

// Map of icon names to components
const iconMap = {
  "#Computer": Computer,
  "#Rocket": Rocket,
  "#Star": Star,
  "#LineChart": LineChart,
} as const;

export function About({ data, cards }: AboutProps) {
  const fields = data?.fields as AboutTitleFields;

  const heading = fields?.heading ?? "About Us";
  const subheading =
    fields?.subheading ?? "Learn more about our mission and services";

  return (
    <section
      id="about"
      className="py-16 bg-white dark:bg-secondary-dark/95 transition-colors"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-white">
            {heading}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-200">
            {subheading}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards?.map((card) => {
              const fields = card.fields as AboutCardFields;
              const IconComponent = iconMap[fields.lucideIcon];

              return (
                <div
                  key={card.sys.id}
                  className={`${cardStyles.base} ${cardStyles.hover} p-6`}
                >
                  {IconComponent && (
                    <IconComponent className="w-8 h-8 mb-4 text-primary" />
                  )}
                  <h3 className={cardStyles.content.title}>{fields.title}</h3>
                  <p className={cardStyles.content.text}>
                    {fields.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
