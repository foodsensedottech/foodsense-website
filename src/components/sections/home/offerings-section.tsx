import Link from "next/link";
import { ctaLabel, offeringsCopy } from "@/lib/copy/site";

export function OfferingsSection() {
  return (
    <section
      id="franchisee-offers"
      className="scroll-mt-20 py-16 px-4 bg-muted/40 dark:bg-gray-900/40"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {offeringsCopy.headline}
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
          {offeringsCopy.body}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {offeringsCopy.modes.map((mode) => (
            <article
              key={mode.slug}
              className="rounded-lg border border-border bg-card p-6 flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-3">{mode.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {mode.body}
              </p>
              <p className="text-sm">{mode.doNot}</p>
            </article>
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
