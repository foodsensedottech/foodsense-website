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
    console.warn("HeroSection: No fields in data");
    return null;
  }

  const { heroHeading, heroSubheading, backgroundImage } = data.fields;

  // Debug logging
  console.log("Hero Data:", {
    heroHeading,
    heroSubheading,
    backgroundImage: {
      url: backgroundImage?.fields?.file?.url,
      title: backgroundImage?.fields?.title,
    },
  });

  // Safely access the image URL using optional chaining
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
