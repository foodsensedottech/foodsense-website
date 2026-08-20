import { BaseLayout } from "@/components/layout";
import Link from "next/link";
import { aboutCopy, ctaLabel, proofCopy, seo } from "@/lib/copy/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — the operator résumé",
  description: seo.about.description,
  openGraph: {
    title: "About | FoodSense — the operator résumé",
    description: seo.about.description,
  },
};

export default function AboutPage() {
  return (
    <BaseLayout>
      <article className="container mx-auto max-w-3xl py-16 px-4 space-y-12">
        <header>
          <h1 className="text-4xl font-bold mb-4">{aboutCopy.headline}</h1>
          <p className="text-lg text-muted-foreground mb-4">{aboutCopy.body}</p>
          <p className="text-sm">{aboutCopy.conferenceLine}</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-3">{aboutCopy.originHeadline}</h2>
          <p className="text-muted-foreground">{aboutCopy.originBody}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">{aboutCopy.resumeHeadline}</h2>
          <p className="text-sm mb-6">{aboutCopy.resumeDisclaimer}</p>
          <div className="space-y-4">
            {proofCopy.beats.map((beat) => (
              <div key={beat.title} className="rounded-lg border border-border p-5">
                <h3 className="font-semibold mb-2">{beat.title}</h3>
                <p className="text-sm text-muted-foreground">{beat.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">
            {aboutCopy.differenceHeadline}
          </h2>
          <div className="space-y-4">
            {aboutCopy.differences.map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <p>
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {ctaLabel}
          </Link>
        </p>
      </article>
    </BaseLayout>
  );
}
