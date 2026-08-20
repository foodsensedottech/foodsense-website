import { Suspense } from "react";
import { HeroSection } from "./hero";
import { ContactSection } from "./contact";
import { getHomeMarketingCopy } from "@/lib/contentful/marketing";
import { SectionLoading } from "@/components/ui/layout/section-loading";
import { ForWhomSection } from "./home/for-whom-section";
import { OfferingsSection } from "./home/offerings-section";
import { HowWeWorkSection } from "./home/how-we-work-section";
import { ProofSection } from "./home/proof-section";
import { FaqSection } from "./home/faq-section";

export async function HomeContent() {
  const copy = await getHomeMarketingCopy();

  return (
    <>
      <Suspense fallback={<SectionLoading />}>
        <HeroSection hero={copy.hero} chrome={copy.chrome} />
      </Suspense>
      <ForWhomSection copy={copy.forWhom} />
      <OfferingsSection copy={copy.offerings} ctaLabel={copy.chrome.ctaLabel} />
      <HowWeWorkSection copy={copy.howWeWork} />
      <ProofSection copy={copy.proof} />
      <FaqSection copy={copy.faq} />
      <Suspense fallback={<SectionLoading />}>
        <ContactSection copy={copy.contact} chrome={copy.chrome} />
      </Suspense>
    </>
  );
}
