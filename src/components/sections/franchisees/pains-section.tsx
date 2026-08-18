"use client";

import React from "react";
import type {
  FranchiseeCardEntry,
  FranchiseeTitleEntry,
} from "@/lib/contentful/types";
import { AboutHeading } from "@/components/sections/about/about-heading";
import { AboutCards } from "@/components/sections/about/about-cards";

interface PainsSectionProps {
  heading: FranchiseeTitleEntry;
  cards: FranchiseeCardEntry[];
}

export function FranchiseePainsSection({ heading, cards }: PainsSectionProps) {
  return (
    <section
      id="franchisee-pains"
      className="py-16 bg-gray-50 dark:bg-gray-900"
    >
      <AboutHeading data={heading} />
      <AboutCards data={cards} />
    </section>
  );
}
