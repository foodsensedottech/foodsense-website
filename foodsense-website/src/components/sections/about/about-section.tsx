"use client";

import React from "react";
import { motion } from "framer-motion";
import type { AboutTitleFields, AboutCardFields } from "@/lib/contentful/types";
import { AboutHeading } from "./about-heading";
import { AboutCards } from "./about-cards";
import { semanticConfig } from "@/lib/utils";

// Define the ContentfulEntry type here to match the one in client.ts
type ContentfulEntry<T> = {
  sys: {
    id: string;
    [key: string]: any;
  };
  fields: T;
  [key: string]: any;
};

interface AboutSectionProps {
  heading: ContentfulEntry<AboutTitleFields>;
  cards: ContentfulEntry<AboutCardFields>[];
}

export function AboutSection({ heading, cards }: AboutSectionProps) {
  return (
    <section
      id={semanticConfig.sections.about}
      className="py-16 bg-white dark:bg-gray-900"
    >
      <AboutHeading data={heading} />
      <AboutCards data={cards} />
    </section>
  );
}
