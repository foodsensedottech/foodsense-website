"use client";

import React from "react";
import type {
  FranchiseeCardEntry,
  FranchiseeTitleEntry,
} from "@/lib/contentful/types";
import { FranchiseeSectionHeading } from "./section-heading";
import { FranchiseeContentCards } from "./content-cards";

interface OffersSectionProps {
  heading: FranchiseeTitleEntry;
  cards: FranchiseeCardEntry[];
}

export function FranchiseeOffersSection({ heading, cards }: OffersSectionProps) {
  return (
    <section
      id="franchisee-offers"
      className="py-16 bg-gray-50 dark:bg-gray-900"
    >
      <FranchiseeSectionHeading data={heading} />
      <FranchiseeContentCards data={cards} />
    </section>
  );
}
