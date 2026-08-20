import Link from "next/link";
import { CopyCard } from "@/components/ui/media/copy-card";
import type { HomeMarketingCopy } from "@/lib/copy/resolved";

export function OfferingsSection({
  copy,
  ctaLabel,
}: {
  copy: HomeMarketingCopy["offerings"];
  ctaLabel: string;
}) {
  return (
    <section
      id="franchisee-offers"
      className="scroll-mt-20 py-16 px-4 bg-muted/40 dark:bg-gray-900/40"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.headline}</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-3xl">{copy.body}</p>
        <div className="grid gap-6 md:grid-cols-3">
          {copy.modes.map((mode) => (
            <CopyCard key={mode.title} {...mode} />
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="#contact-section"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
