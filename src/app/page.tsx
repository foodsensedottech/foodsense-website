import { Suspense } from "react";
import type { Metadata } from "next";
import { BaseLayout } from "@/components/layout";
import { HomeContent } from "@/components/sections/home-content";
import { SectionLoading } from "@/components/ui/layout/section-loading";
import { getHeroContent } from "@/lib/contentful/client";

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getHeroContent();
  const seo = hero?.fields?.seoMetadata?.fields;
  const title = seo?.title || hero?.fields?.heroHeading;
  const description = seo?.description || hero?.fields?.heroSubheading;

  return {
    title: title || undefined,
    description: description || undefined,
    openGraph: {
      title: title || undefined,
      description: description || undefined,
    },
  };
}

export default function Home() {
  return (
    <BaseLayout>
      <Suspense fallback={<SectionLoading />}>
        <HomeContent />
      </Suspense>
    </BaseLayout>
  );
}

export const revalidate = 3600;
