"use client";

import React from "react";
import type { ServicesTitleEntry } from "@/lib/contentful/types";

interface ServicesHeadingProps {
  data: ServicesTitleEntry;
}

export function ServicesHeading({ data }: ServicesHeadingProps) {
  const { servicesTitle, servicesSubtitle } = data.fields;

  return (
    <div className="container mx-auto px-4 text-center mb-12">
      <h2 className="text-3xl font-bold mb-4 text-secondary dark:text-white">
        {servicesTitle || "Our Services"}
      </h2>
      <p className="text-lg text-neutral-600 dark:text-neutral-200">
        {servicesSubtitle || "Discover what we can do for you"}
      </p>
    </div>
  );
}
