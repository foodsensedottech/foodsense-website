"use client";

import React from "react";
import type {
  ServicesTitleEntry,
  ServicesCardEntry,
} from "@/lib/contentful/types";
import { ServicesHeading } from "./services-heading";
import { ServicesCards } from "./services-cards";
import { semanticConfig } from "@/lib/utils";

interface ServicesSectionProps {
  heading: ServicesTitleEntry;
  cards: ServicesCardEntry[];
}

export function ServicesSection({ heading, cards }: ServicesSectionProps) {
  return (
    <section
      id={semanticConfig.sections.services}
      className="py-16 bg-gray-50 dark:bg-gray-900"
    >
      <ServicesHeading data={heading} />
      <ServicesCards data={cards} />
    </section>
  );
}
