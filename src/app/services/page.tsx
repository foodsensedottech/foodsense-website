import { Metadata } from "next";
import Link from "next/link";
import { BaseLayout } from "@/components/layout";
import { ctaLabel, seo, servicesCopy } from "@/lib/copy/site";

export const metadata: Metadata = {
  title: seo.services.title,
  description: seo.services.description,
  openGraph: {
    title: "Services | FoodSense",
    description: seo.services.description,
    url: "https://www.foodsense.tech/services",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <BaseLayout>
      <div className="container mx-auto max-w-4xl py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">{servicesCopy.headline}</h1>
        <p className="text-lg text-muted-foreground mb-6">{servicesCopy.body}</p>
        <p className="mb-10">
          <Link href="/#franchisee-offers" className="underline underline-offset-4">
            See the three modes
          </Link>
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">
            {servicesCopy.modesRecapHeadline}
          </h2>
          <p className="text-muted-foreground">{servicesCopy.modesRecapBody}</p>
        </section>

        <div className="space-y-8">
          {servicesCopy.domains.map((domain) => (
            <section key={domain.title} className="rounded-lg border border-border p-6">
              <h2 className="text-2xl font-semibold mb-3">{domain.title}</h2>
              <p className="text-muted-foreground mb-3">{domain.body}</p>
              {domain.stacks ? (
                <p className="text-sm mb-3">{domain.stacks}</p>
              ) : null}
              <p className="text-sm font-medium">{servicesCopy.modeLine}</p>
            </section>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-3">{servicesCopy.closeHeadline}</h2>
          <p className="text-muted-foreground mb-6">{servicesCopy.closeBody}</p>
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {ctaLabel}
          </Link>
        </section>
      </div>
    </BaseLayout>
  );
}
