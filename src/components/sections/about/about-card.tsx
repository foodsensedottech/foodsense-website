"use client";

import React from "react";
import type { AboutCardFields } from "@/lib/contentful/types";
import type { AboutIconName } from "@/lib/about-icons";
import { getAboutIcon } from "@/lib/about-icons";

// Define the ContentfulEntry type here to match the one in client.ts
type ContentfulEntry<T> = {
  sys: {
    id: string;
    [key: string]: any;
  };
  fields: T;
  [key: string]: any;
};

interface AboutCardProps {
  data: ContentfulEntry<AboutCardFields>;
}

export function AboutCard({ data }: AboutCardProps) {
  // Add detailed logging
  console.log("About Card Component Data:", {
    fullData: data,
    fields: data.fields,
    sys: data.sys,
  });

  const fields = data.fields;
  const iconName = (fields.lucideIcon || "Star") as AboutIconName;
  const IconComponent = getAboutIcon(iconName);

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-white/10 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-[0_0_30px_-5px] dark:hover:shadow-yellow-400/30 dark:hover:border-yellow-400/50">
      <IconComponent className="w-8 h-8 mb-4 text-primary" aria-hidden="true" />
      <h3 className="text-xl font-semibold mb-2 text-secondary">
        {fields.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{fields.description}</p>
    </div>
  );
}
