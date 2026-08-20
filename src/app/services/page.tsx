import Link from "next/link";
import { CopyCard } from "@/components/ui/media/copy-card";
import { SiteShell } from "@/components/layout";
import { getServicesMarketingCopy } from "@/lib/contentful/marketing";
import type { Metadata } from "next";
import { seo } from "@/lib/copy/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: seo.services.title,
  description: seo.services.description,
};

export default async function ServicesPage() {
  const copy = await getServicesMarketingCopy();

  return (
    <SiteShell chrome={copy.chrome}>
      <div className="container mx-auto max-w-4xl py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">{copy.headline}</h1>
        <p className="text-lg text-muted-foreground mb-6">{copy.body}</p>
        <p className="mb-10">
          <Link href="/#franchisee-offers" className="underline underline-offset-4">
            See the three modes
          </Link>
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">{copy.modesRecapHeadline}</h2>
          <p className="text-muted-foreground">{copy.modesRecapBody}</p>
        </section>

        <div className="space-y-8">
          {copy.domains.map((domain) => (
            <CopyCard
              key={domain.title}
              title={domain.title}
              body={domain.body}
              extra={domain.extra ? `${domain.extra}\n${copy.modeLine}` : copy.modeLine}
              image={domain.image}
            />
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-3">{copy.closeHeadline}</h2>
          <p className="text-muted-foreground mb-6">{copy.closeBody}</p>
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {copy.chrome.ctaLabel}
          </Link>
        </section>
      </div>
    </SiteShell>
  );
}
