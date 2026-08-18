"use client";

import React from "react";
import type {
  FranchiseeCardEntry,
  FranchiseeTitleEntry,
} from "@/lib/contentful/types";
import { AboutHeading } from "@/components/sections/about/about-heading";
import { AboutCards } from "@/components/sections/about/about-cards";

interface OffersSectionProps {
  heading: FranchiseeTitleEntry;
  cards: FranchiseeCardEntry[];
}

export function FranchiseeOffersSection({ heading, cards }: OffersSectionProps) {
  return (
    <section
      id="franchisee-offers"
      className="py-16 bg-white dark:bg-gray-900"
    >
      <AboutHeading data={heading} />
      <AboutCards data={cards} />
    </section>
  );
}
