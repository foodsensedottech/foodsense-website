"use client";

import React from "react";
import type {
  TestimonialsTitleEntry,
  TestimonialsCardEntry,
} from "@/lib/contentful/types";
import { TestimonialsHeading } from "./testimonials-heading";
import { TestimonialsCards } from "./testimonials-cards";
import { semanticConfig } from "@/lib/utils";

interface TestimonialsSectionProps {
  heading: TestimonialsTitleEntry;
  cards: TestimonialsCardEntry[];
}

export function TestimonialsSection({
  heading,
  cards,
}: TestimonialsSectionProps) {
  return (
    <section
      id={semanticConfig.sections.testimonials}
      className="py-16 bg-white dark:bg-gray-900"
    >
      <TestimonialsHeading data={heading} />
      <TestimonialsCards data={cards} />
    </section>
  );
}
