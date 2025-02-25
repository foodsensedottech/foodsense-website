import React from "react";
import type { AboutCardFields } from "@/lib/contentful/types";
import { AboutCard } from "./about-card";

// Define the ContentfulEntry type here to match the one in client.ts
type ContentfulEntry<T> = {
  sys: {
    id: string;
    [key: string]: any;
  };
  fields: T;
  [key: string]: any;
};

interface AboutCardsProps {
  data: ContentfulEntry<AboutCardFields>[];
}

export function AboutCards({ data }: AboutCardsProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((card) => (
          <AboutCard key={card.sys.id} data={card} />
        ))}
      </div>
    </div>
  );
}
