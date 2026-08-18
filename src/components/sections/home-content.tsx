import { Suspense } from "react";
import { HeroSection } from "./hero";
import { ContactSection } from "./contact";
import { AboutSection } from "./about";
import { getAboutCards, getAboutHeading, getHeroContent } from "@/lib/contentful/client";
import { applyFranchiseeHomepageHero } from "@/lib/contentful/homepage-hero";
import { getFranchiseePains } from "@/lib/contentful/franchisee";
import { SectionLoading } from "@/components/ui/layout/section-loading";
import { FranchiseePainsSection } from "./franchisees/pains-section";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";

interface HomeContentProps {
  locale?: FranchiseeLocale;
}

export async function HomeContent({ locale = "en" }: HomeContentProps) {
  try {
    const [heroContent, aboutHeading, aboutCards, pains] = await Promise.all([
      getHeroContent(),
      getAboutHeading(locale),
      getAboutCards(locale),
      getFranchiseePains(locale),
    ]);

    const hero = applyFranchiseeHomepageHero(heroContent, locale);

    return (
      <>
        <Suspense fallback={<SectionLoading />}>
          <HeroSection data={hero} locale={locale} />
        </Suspense>
        {aboutHeading && aboutCards?.length ? (
          <AboutSection heading={aboutHeading} cards={aboutCards} />
        ) : null}
        {pains.heading && pains.cards.length > 0 ? (
          <FranchiseePainsSection heading={pains.heading} cards={pains.cards} />
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
