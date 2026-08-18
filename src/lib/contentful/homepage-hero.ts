import { franchiseeCopy } from "@/lib/franchisees/copy";
import type { HeroContentType } from "@/lib/contentful/types";

const copy = franchiseeCopy.en;

/**
 * Homepage hero copy is owned by the multi-unit franchisee ICP.
 * Contentful still supplies the background image (and any extra fields).
 * Keep Contentful `heroFields.heroHeading` / `heroSubheading` in sync with
 * these strings so the CMS preview matches production.
 */
export function applyFranchiseeHomepageHero(
  hero: HeroContentType | null
): HeroContentType {
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

export const homepageHeroCta = {
  eyebrow: copy.heroEyebrow,
  primaryLabel: copy.heroPrimaryCta,
  primaryHref: "/franchisees#assessment",
  secondaryLabel: copy.heroSecondaryCta,
  trustMetric: copy.trustMetric,
} as const;
