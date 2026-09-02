import { BaseLayout } from "@/components/layout";
import { FranchiseePainsSection } from "@/components/sections/franchisees/pains-section";
import { FranchiseeOffersSection } from "@/components/sections/franchisees/offers-section";
import { FranchiseeMaturityCta } from "@/components/sections/franchisees/maturity-cta";
import { getFranchiseePage } from "@/lib/contentful/franchisee";
import type { FranchiseeCopy, FranchiseeLocale } from "@/lib/franchisees/copy";
import Link from "next/link";

interface FranchiseeLandingProps {
  locale: FranchiseeLocale;
}

function FranchiseeHero({ copy }: { copy: FranchiseeCopy }) {
  return (
    <section className="bg-[#253B59] text-white py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-sm tracking-[0.18em] uppercase text-[#F1C100] mb-3">
          {copy.heroEyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {copy.heroHeadline}
        </h1>
        <p className="text-lg text-white/80 leading-relaxed mb-8">
          {copy.heroSubheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-[#F1C100] text-[#253B59] font-semibold hover:bg-[#D4A800] transition-colors duration-200"
          >
            {copy.heroPrimaryCta}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 rounded-md border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors duration-200"
          >
            {copy.heroSecondaryCta}
          </Link>
        </div>
        <p className="mt-8 text-[#F1C100] font-medium">{copy.trustMetric}</p>
        <p className="mt-6 text-sm text-white/70">
          <Link href={copy.otherLocaleHref} className="underline underline-offset-4">
            {copy.otherLocaleLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}

export async function FranchiseeLanding({ locale }: FranchiseeLandingProps) {
  const copy = await getFranchiseePage(locale);

  return (
    <BaseLayout>
      <article lang={copy.htmlLang}>
        <FranchiseeHero copy={copy} />
        <FranchiseePainsSection
          heading={copy.painHeading}
          intro={copy.painIntro}
          cards={copy.pains}
        />
        <FranchiseeOffersSection
          heading={copy.offersHeading}
          intro={copy.offersIntro}
          cards={copy.offers}
        />
        <FranchiseeMaturityCta
          heading={copy.assessmentHeading}
          intro={copy.assessmentIntro}
          ctaLabel={copy.heroPrimaryCta}
        />
      </article>
    </BaseLayout>
  );
}
