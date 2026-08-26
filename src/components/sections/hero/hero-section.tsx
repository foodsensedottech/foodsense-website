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

  const {
    heroHeading,
    heroSubheading,
    heroEyebrow,
    heroCta,
    heroCtaHref,
    backgroundImage,
  } = data.fields;

  const imageUrl = backgroundImage?.fields?.file?.url;
  const imageAlt = backgroundImage?.fields?.title || "";

  return (
    <section
      id={semanticConfig.sections.hero}
      className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px] flex items-center justify-center"
    >
      <HeroBackground imageUrl={imageUrl} imageAlt={imageAlt} />
      <HeroContent
        title={heroHeading}
        subtitle={heroSubheading}
        eyebrow={heroEyebrow}
        ctaLabel={heroCta}
        ctaHref={heroCtaHref}
      />
    </section>
  );
}
