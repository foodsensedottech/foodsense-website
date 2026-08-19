import { Suspense } from "react";
import { HeroSection } from "./hero";
import { ContactSection } from "./contact";
import { AboutSection } from "./about";
import { getAboutContent } from "@/lib/contentful/about";
import { getHeroContent } from "@/lib/contentful/client";
import { getContactHeading } from "@/lib/contentful/contact";
import { getFranchiseeOffers, getFranchiseePains } from "@/lib/contentful/franchisee";
import { SectionLoading } from "@/components/ui/layout/section-loading";
import { FranchiseePainsSection } from "./franchisees/pains-section";
import { FranchiseeOffersSection } from "./franchisees/offers-section";

export async function HomeContent() {
  try {
    const [hero, about, pains, offers, contact] = await Promise.all([
      getHeroContent(),
      getAboutContent(),
      getFranchiseePains(),
      getFranchiseeOffers(),
      getContactHeading(),
    ]);

    return (
      <>
        {hero ? (
          <Suspense fallback={<SectionLoading />}>
            <HeroSection data={hero} />
          </Suspense>
        ) : null}
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
          <ContactSection heading={contact} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error("Error loading content:", error);
    return <SectionLoading />;
  }
}
