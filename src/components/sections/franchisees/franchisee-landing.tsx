import { BaseLayout } from "@/components/layout";
import { HeroSection } from "@/components/sections/hero";
import { FranchiseePainsSection } from "@/components/sections/franchisees/pains-section";
import { FranchiseeOffersSection } from "@/components/sections/franchisees/offers-section";
import { FranchiseeMaturityCta } from "@/components/sections/franchisees/maturity-cta";
import { getHeroContent } from "@/lib/contentful/client";
import { applyFranchiseeHomepageHero } from "@/lib/contentful/homepage-hero";
import {
  getFranchiseeOffers,
  getFranchiseePains,
} from "@/lib/contentful/franchisee";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";

interface FranchiseeLandingProps {
  locale: FranchiseeLocale;
}

export async function FranchiseeLanding({ locale }: FranchiseeLandingProps) {
  const [heroContent, pains, offers] = await Promise.all([
    getHeroContent(),
    getFranchiseePains(locale),
    getFranchiseeOffers(locale),
  ]);

  return (
    <BaseLayout>
      <HeroSection data={applyFranchiseeHomepageHero(heroContent)} />
      <FranchiseePainsSection heading={pains.heading} cards={pains.cards} />
      <FranchiseeOffersSection heading={offers.heading} cards={offers.cards} />
      <FranchiseeMaturityCta locale={locale} />
    </BaseLayout>
  );
}
