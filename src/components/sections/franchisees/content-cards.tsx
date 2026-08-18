"use client";

import React from "react";
import type { FranchiseeCardEntry } from "@/lib/contentful/types";
import { FranchiseeContentCard } from "./content-card";

interface ContentCardsProps {
  data: FranchiseeCardEntry[];
}

export function FranchiseeContentCards({ data }: ContentCardsProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((card) => (
          <FranchiseeContentCard key={card.sys.id} data={card} />
        ))}
      </div>
    </div>
  );
}
