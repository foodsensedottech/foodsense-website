import { Suspense } from "react";
import { HeroSection } from "./hero";
import { ContactSection } from "./contact";
import { AboutSection } from "./about";
import { getAboutContent } from "@/lib/contentful/about";
import { getHeroContent } from "@/lib/contentful/client";
import { applyFranchiseeHomepageHero } from "@/lib/contentful/homepage-hero";
import { getFranchiseeOffers, getFranchiseePains } from "@/lib/contentful/franchisee";
import { SectionLoading } from "@/components/ui/layout/section-loading";
import { FranchiseePainsSection } from "./franchisees/pains-section";
import { FranchiseeOffersSection } from "./franchisees/offers-section";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";

interface HomeContentProps {
  locale?: FranchiseeLocale;
}

export async function HomeContent({ locale = "en" }: HomeContentProps) {
  try {
    const [heroContent, about, pains, offers] = await Promise.all([
      getHeroContent(),
      getAboutContent(locale),
      getFranchiseePains(locale),
      getFranchiseeOffers(locale),
    ]);

    const hero = applyFranchiseeHomepageHero(heroContent, locale);

    return (
      <>
        <Suspense fallback={<SectionLoading />}>
          <HeroSection data={hero} locale={locale} />
        </Suspense>
        {about.heading && about.cards.length ? (
          <AboutSection heading={about.heading} cards={about.cards} />
        ) : null}
        {pains.heading && pains.cards.length > 0 ? (
          <FranchiseePainsSection heading={pains.heading} cards={pains.cards} />
        ) : null}
        {offers.heading && offers.cards.length > 0 ? (
          <FranchiseeOffersSection
            heading={offers.heading}
            cards={offers.cards}
          />
        ) : null}
        <Suspense fallback={<SectionLoading />}>
          <ContactSection />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error("Error loading content:", error);
    return (
      <>
        <HeroSection data={applyFranchiseeHomepageHero(null, locale)} locale={locale} />
        <SectionLoading />
      </>
    );
  }
}
