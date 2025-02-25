"use client";

import React from "react";
import type { ServicesTitleEntry } from "@/lib/contentful/types";

interface ServicesHeadingProps {
  data: ServicesTitleEntry;
}

export function ServicesHeading({ data }: ServicesHeadingProps) {
  // Add logging to debug the structure
  console.log("Services Heading Data:", JSON.stringify(data, null, 2));

  // Use type assertion to handle the discrepancy
  const fields = data.fields as any;
  const servicesTitle = fields.servicesTitle;
  const servicesSubtitle = fields.servicesSubtitle;

  return (
    <div className="container mx-auto px-4 text-center mb-12">
      <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-white">
        {servicesTitle?.toString() || "Our Services"}
      </h2>
      <p className="text-lg text-neutral-600 dark:text-neutral-200">
        {servicesSubtitle?.toString() || "Discover what we can do for you"}
      </p>
    </div>
  );
}
