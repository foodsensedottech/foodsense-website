import React from "react";
import type { ServicesCardEntry } from "@/lib/contentful/types";
import { ServicesCard } from "./services-card";

interface ServicesCardsProps {
  data: ServicesCardEntry[];
}

export function ServicesCards({ data }: ServicesCardsProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          {data.map((card) => (
            <ServicesCard key={card.sys.id} data={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
