import { Suspense } from "react";
import { HeroSection } from "./hero";
import { AboutSection } from "./about/about-section";
import { ServicesSection } from "./services";
import { TestimonialsSection } from "./testimonials";
import { ContactSection } from "./contact";
import {
  getHeroContent,
  getAboutContent,
  getServicesContent,
  getTestimonialsContent,
} from "@/lib/contentful/client";
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
    const [
      heroContent,
      aboutContent,
      servicesContent,
      testimonialsContent,
      pains,
      offers,
    ] = await Promise.all([
      getHeroContent(),
      getAboutContent(),
      getServicesContent(),
      getTestimonialsContent(),
      getFranchiseePains("en"),
      getFranchiseeOffers("en"),
    ]);

    const hero = applyFranchiseeHomepageHero(heroContent);
    const multiUnit = (
      <>
        <FranchiseePainsSection heading={pains.heading} cards={pains.cards} />
        <FranchiseeOffersSection heading={offers.heading} cards={offers.cards} />
        <FranchiseeMaturityCta />
      </>
    );

    if (
      !aboutContent?.heading ||
      !servicesContent?.heading ||
      !testimonialsContent?.heading
    ) {
      return (
        <>
          <HeroSection data={hero} />
          {multiUnit}
          <SectionLoading />
        </>
      );
    }

    return (
      <>
        <Suspense fallback={<SectionLoading />}>
          <HeroSection data={hero} />
        </Suspense>
        {multiUnit}
        <Suspense fallback={<SectionLoading />}>
          <AboutSection
            heading={aboutContent.heading}
            cards={aboutContent.cards || []}
          />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <ServicesSection
            heading={servicesContent.heading}
            cards={servicesContent.cards || []}
          />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <TestimonialsSection
            heading={testimonialsContent.heading}
            cards={testimonialsContent.cards || []}
          />
        </Suspense>
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
