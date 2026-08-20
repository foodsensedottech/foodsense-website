import { SiteShell } from "@/components/layout";
import { HeroSection } from "@/components/sections/hero";
import { FranchiseePainsSection } from "@/components/sections/franchisees/pains-section";
import { FranchiseeOffersSection } from "@/components/sections/franchisees/offers-section";
import { FranchiseeMaturityCta } from "@/components/sections/franchisees/maturity-cta";
import { getHomeMarketingCopy } from "@/lib/contentful/marketing";
import {
  getFranchiseeOffers,
  getFranchiseePains,
} from "@/lib/contentful/franchisee";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";

interface FranchiseeLandingProps {
  locale: FranchiseeLocale;
}

export async function FranchiseeLanding({ locale }: FranchiseeLandingProps) {
  const [copy, pains, offers] = await Promise.all([
    getHomeMarketingCopy(),
    getFranchiseePains(),
    getFranchiseeOffers(),
  ]);

  return (
    <SiteShell chrome={copy.chrome}>
      <HeroSection hero={copy.hero} chrome={copy.chrome} />
      {pains.heading && pains.cards.length > 0 ? (
        <FranchiseePainsSection heading={pains.heading} cards={pains.cards} />
      ) : null}
      {offers.heading && offers.cards.length > 0 ? (
        <FranchiseeOffersSection heading={offers.heading} cards={offers.cards} />
      ) : null}
      <FranchiseeMaturityCta locale={locale} />
    </SiteShell>
  );
}
