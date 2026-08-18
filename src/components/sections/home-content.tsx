import { Suspense } from "react";
import { HeroSection } from "./hero";
import { ContactSection } from "./contact";
import { getHeroContent } from "@/lib/contentful/client";
import { applyFranchiseeHomepageHero } from "@/lib/contentful/homepage-hero";
import {
  getFranchiseeOffers,
  getFranchiseePains,
} from "@/lib/contentful/franchisee";
import { SectionLoading } from "@/components/ui/layout/section-loading";
import { FranchiseePainsSection } from "./franchisees/pains-section";
import { FranchiseeOffersSection } from "./franchisees/offers-section";
import { FranchiseeMaturityCta } from "./franchisees/maturity-cta";

export async function HomeContent() {
  try {
    const [heroContent, pains, offers] = await Promise.all([
      getHeroContent(),
      getFranchiseePains("en"),
      getFranchiseeOffers("en"),
    ]);

    const hero = applyFranchiseeHomepageHero(heroContent);

    return (
      <>
        <Suspense fallback={<SectionLoading />}>
          <HeroSection data={hero} />
        </Suspense>
        <FranchiseePainsSection heading={pains.heading} cards={pains.cards} />
        <FranchiseeOffersSection heading={offers.heading} cards={offers.cards} />
        <FranchiseeMaturityCta ctaHref="#contact-section" />
        <Suspense fallback={<SectionLoading />}>
          <ContactSection />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error("Error loading content:", error);
    return (
      <>
        <HeroSection data={applyFranchiseeHomepageHero(null)} />
        <SectionLoading />
      </>
    );
  }
}
