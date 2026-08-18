"use client";

import React from "react";
import type {
  FranchiseeCardEntry,
  FranchiseeTitleEntry,
} from "@/lib/contentful/types";
import { FranchiseeSectionHeading } from "./section-heading";
import { FranchiseeContentCards } from "./content-cards";

interface PainsSectionProps {
  heading: FranchiseeTitleEntry;
  cards: FranchiseeCardEntry[];
}

export function FranchiseePainsSection({ heading, cards }: PainsSectionProps) {
  return (
    <section
      id="franchisee-pains"
      className="py-16 bg-white dark:bg-gray-900"
    >
      <FranchiseeSectionHeading data={heading} />
      <FranchiseeContentCards data={cards} />
    </section>
  );
}
