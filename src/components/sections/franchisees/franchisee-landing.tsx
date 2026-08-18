import Link from "next/link";
import { BaseLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { AssessmentTool } from "@/components/sections/franchisees/assessment-tool";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";
import { getFranchiseeCopy } from "@/lib/franchisees/copy";

interface FranchiseeLandingProps {
  locale: FranchiseeLocale;
}

export function FranchiseeLanding({ locale }: FranchiseeLandingProps) {
  const copy = getFranchiseeCopy(locale);
  const contactHref = "/contact";

  return (
    <BaseLayout>
      <section className="relative overflow-hidden bg-[#1e3a5f] text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
          <p className="text-yellow-400 font-semibold tracking-wide uppercase text-sm mb-4">
            {copy.heroEyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {copy.heroHeadline}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8">
            {copy.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-yellow-400 text-[#1e3a5f] hover:bg-yellow-500">
              <a href="#assessment">{copy.heroPrimaryCta}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href={contactHref}>{copy.heroSecondaryCta}</Link>
            </Button>
          </div>
          <p className="mt-10 text-yellow-400 font-medium">{copy.trustMetric}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.painHeading}</h2>
        <p className="text-lg text-foreground/70 mb-10 max-w-3xl">{copy.painIntro}</p>
        <div className="grid gap-6 md:grid-cols-3">
          {copy.pains.map((pain) => (
            <article
              key={pain.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-semibold mb-3">{pain.title}</h3>
              <p className="text-foreground/70">{pain.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.offersHeading}</h2>
          <p className="text-lg text-foreground/70 mb-10 max-w-3xl">{copy.offersIntro}</p>
          <div className="grid gap-6">
            {copy.offers.map((offer) => (
              <article
                key={offer.title}
                className="rounded-xl border border-border bg-card p-6 md:p-8"
              >
                <h3 className="text-2xl font-semibold mb-3">{offer.title}</h3>
                <p className="text-foreground/70 text-lg">{offer.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {copy.assessmentHeading}
        </h2>
        <p className="text-lg text-foreground/70 mb-8">{copy.assessmentIntro}</p>
        <AssessmentTool locale={locale} />
      </section>
    </BaseLayout>
  );
}
