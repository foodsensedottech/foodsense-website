import Link from "next/link";
import { CopyCard } from "@/components/ui/media/copy-card";
import { SiteShell } from "@/components/layout";
import { getAboutMarketingCopy } from "@/lib/contentful/marketing";
import { seo } from "@/lib/copy/site";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About — the operator résumé",
  description: seo.about.description,
};

export default async function AboutPage() {
  const copy = await getAboutMarketingCopy();

  return (
    <SiteShell chrome={copy.chrome}>
      <article className="container mx-auto max-w-3xl py-16 px-4 space-y-12">
        <header>
          <h1 className="text-4xl font-bold mb-4">{copy.headline}</h1>
          <p className="text-lg text-muted-foreground mb-4">{copy.body}</p>
          <p className="text-sm">{copy.conferenceLine}</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-3">{copy.originHeadline}</h2>
          <p className="text-muted-foreground">{copy.originBody}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">{copy.resumeHeadline}</h2>
          <p className="text-sm mb-6">{copy.resumeDisclaimer}</p>
          <div className="grid gap-6 md:grid-cols-1">
            {copy.beats.map((beat) => (
              <CopyCard key={beat.title} {...beat} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">{copy.differenceHeadline}</h2>
          <div className="grid gap-6 md:grid-cols-1">
            {copy.differences.map((item) => (
              <CopyCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        <p>
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {copy.chrome.ctaLabel}
          </Link>
        </p>
      </article>
    </SiteShell>
  );
}
