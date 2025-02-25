import React from "react";
import type { TestimonialsCardEntry } from "@/lib/contentful/types";
import { TestimonialsCard } from "./testimonials-card";

interface TestimonialsCardsProps {
  data: TestimonialsCardEntry[];
}

export function TestimonialsCards({ data }: TestimonialsCardsProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          {data.map((card) => (
            <TestimonialsCard key={card.sys.id} data={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
