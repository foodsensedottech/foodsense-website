import { franchiseeCopy, type FranchiseeLocale } from "@/lib/franchisees/copy";
import type { HeroContentType } from "@/lib/contentful/types";

/**
 * Homepage hero copy is locale-specific. Contentful still supplies the
 * background image (and any extra fields).
 */
export function applyFranchiseeHomepageHero(
  hero: HeroContentType | null,
  locale: FranchiseeLocale = "en"
): HeroContentType {
  const copy = franchiseeCopy[locale];
  return {
    sys: hero?.sys ?? { id: "homepage-hero" },
    metadata: hero?.metadata,
    fields: {
      heroHeading: copy.heroHeadline,
      heroSubheading: copy.heroSubheadline,
      backgroundImage: hero?.fields?.backgroundImage,
      seoMetadata: hero?.fields?.seoMetadata,
    },
  };
}

export function getHomepageHeroCta(locale: FranchiseeLocale = "en") {
  const copy = franchiseeCopy[locale];
  return {
    eyebrow: copy.heroEyebrow,
    ctaLabel: copy.heroPrimaryCta,
    ctaHref: "#contact-section",
  } as const;
}
