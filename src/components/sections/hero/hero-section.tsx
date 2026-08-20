"use client";

import type { HeroCopyResolved, SiteChromeCopy } from "@/lib/copy/resolved";
import { semanticConfig } from "@/lib/utils";
import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";

export function HeroSection({
  hero,
  chrome,
}: {
  hero: HeroCopyResolved;
  chrome: SiteChromeCopy;
}) {
  return (
    <section
      id={semanticConfig.sections.hero}
      className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px] flex items-center justify-center"
    >
      <HeroBackground
        imageUrl={hero.backgroundImage?.url}
        imageAlt={hero.backgroundImage?.alt || "Hero background"}
      />
      <HeroContent hero={hero} chrome={chrome} />
    </section>
  );
}
