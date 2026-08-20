import { Suspense } from "react";
import { HeroSection } from "./hero";
import { ContactSection } from "./contact";
import { getHeroContent } from "@/lib/contentful/client";
import { applyFranchiseeHomepageHero } from "@/lib/contentful/homepage-hero";
import { SectionLoading } from "@/components/ui/layout/section-loading";
import { ForWhomSection } from "./home/for-whom-section";
import { OfferingsSection } from "./home/offerings-section";
import { HowWeWorkSection } from "./home/how-we-work-section";
import { ProofSection } from "./home/proof-section";
import { FaqSection } from "./home/faq-section";

export async function HomeContent() {
  try {
    const heroContent = await getHeroContent();
    const hero = applyFranchiseeHomepageHero(heroContent);

    return (
      <>
        <Suspense fallback={<SectionLoading />}>
          <HeroSection data={hero} />
        </Suspense>
        <ForWhomSection />
        <OfferingsSection />
        <HowWeWorkSection />
        <ProofSection />
        <FaqSection />
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
        <ForWhomSection />
        <OfferingsSection />
        <HowWeWorkSection />
        <ProofSection />
        <FaqSection />
        <ContactSection />
      </>
    );
  }
}
