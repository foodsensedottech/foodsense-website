import { heroCopy } from "@/lib/copy/site";
import type { HeroContentType } from "@/lib/contentful/types";

/**
 * Homepage hero copy is the locked site deck.
 * Contentful still supplies the background image.
 */
export function applyFranchiseeHomepageHero(
  hero: HeroContentType | null
): HeroContentType {
  return {
    sys: hero?.sys ?? { id: "homepage-hero" },
    metadata: hero?.metadata,
    fields: {
      heroHeading: heroCopy.headline,
      heroSubheading: heroCopy.subhead,
      backgroundImage: hero?.fields?.backgroundImage,
      seoMetadata: hero?.fields?.seoMetadata,
    },
  };
}

export const homepageHeroCta = {
  eyebrow: heroCopy.eyebrow,
  primaryLabel: heroCopy.primaryCta,
  primaryHref: heroCopy.primaryHref,
} as const;
