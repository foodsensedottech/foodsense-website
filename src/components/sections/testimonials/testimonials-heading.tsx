"use client";

import React from "react";
import type { TestimonialsTitleEntry } from "@/lib/contentful/types";

interface TestimonialsHeadingProps {
  data: TestimonialsTitleEntry;
}

export function TestimonialsHeading({ data }: TestimonialsHeadingProps) {
  // Add logging to debug the structure
  console.log("Testimonials Heading Data:", JSON.stringify(data, null, 2));

  // Use type assertion to handle the discrepancy
  const fields = data.fields as any;
  const testimonialTitle = fields.testimonialTitle;
  const testimonialSubtitle = fields.testimonialSubtitle;

  return (
    <div className="container mx-auto px-4 text-center mb-12">
      <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-white">
        {testimonialTitle?.toString() || "What Our Clients Say"}
      </h2>
      <p className="text-lg text-neutral-600 dark:text-neutral-200">
        {testimonialSubtitle?.toString() || "Hear from businesses we've helped"}
      </p>
    </div>
  );
}
