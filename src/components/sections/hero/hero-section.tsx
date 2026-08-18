"use client";

import * as React from "react";
import type { HeroContentType } from "@/lib/contentful/types";
import { semanticConfig } from "@/lib/utils";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";
import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";

interface HeroSectionProps {
  data: HeroContentType;
  locale?: FranchiseeLocale;
}

export function HeroSection({ data, locale = "en" }: HeroSectionProps) {
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
      className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px] flex items-center justify-center"
    >
      <HeroBackground imageUrl={imageUrl} imageAlt={imageAlt} />
      <HeroContent
        title={heroHeading}
        subtitle={heroSubheading}
        locale={locale}
      />
    </section>
  );
}
