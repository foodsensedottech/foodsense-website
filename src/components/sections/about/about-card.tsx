"use client";

import React from "react";
import type { AboutCardFields } from "@/lib/contentful/types";
import { LineChart, Rocket, Star, Computer } from "lucide-react";

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
  const fields = data.fields;

  // Directly map icons based on title
  const getIcon = React.useMemo(() => {
    switch (fields.title) {
      case "Proven Results":
        return (
          <LineChart className="w-8 h-8 mb-4 text-primary" aria-hidden="true" />
        );
      case "Optimization and Profits":
        return (
          <Rocket className="w-8 h-8 mb-4 text-primary" aria-hidden="true" />
        );
      case "Customer Reviews & Sentiment":
        return (
          <Star className="w-8 h-8 mb-4 text-primary" aria-hidden="true" />
        );
      case "Expertise in Restaurant Tech":
        return (
          <Computer className="w-8 h-8 mb-4 text-primary" aria-hidden="true" />
        );
      default:
        return (
          <Star className="w-8 h-8 mb-4 text-primary" aria-hidden="true" />
        );
    }
  }, [fields.title]);

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-white/10 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-[0_0_30px_-5px] dark:hover:shadow-yellow-400/30 dark:hover:border-yellow-400/50">
      {getIcon}
      <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-white">
        {fields.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{fields.description}</p>
    </div>
  );
}
