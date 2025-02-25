"use client";

import * as React from "react";
import type { HeroContentType } from "@/lib/contentful/types";
import { semanticConfig } from "@/lib/utils";
import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";

interface HeroSectionProps {
  data: HeroContentType;
}

export function HeroSection({ data }: HeroSectionProps) {
  if (!data?.fields) {
    return null;
  }

  // Add logging to debug the structure
  console.log("Hero Data:", JSON.stringify(data, null, 2));

  // Use type assertion to handle the discrepancy
  const fields = data.fields as any;
  const heroHeading = fields.heroHeading;
  const heroSubheading = fields.heroSubheading;
  const backgroundImage = fields.backgroundImage;

  // Use optional chaining to safely access nested properties
  const imageUrl = backgroundImage?.fields?.file?.url;
  const imageAlt = backgroundImage?.fields?.title || "Hero background";

  return (
    <section
      id={semanticConfig.sections.hero}
      className="relative min-h-[80vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center py-20"
    >
      <HeroBackground imageUrl={imageUrl} imageAlt={imageAlt} />
      <HeroContent title={heroHeading} subtitle={heroSubheading} />
    </section>
  );
}
