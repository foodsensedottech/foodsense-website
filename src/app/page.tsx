import { Suspense } from "react";
import type { Metadata } from "next";
import { BaseLayout } from "@/components/layout";
import { HomeContent } from "@/components/sections/home-content";
import { SectionLoading } from "@/components/ui/layout/section-loading";
import { getConversionHomepage } from "@/lib/contentful/conversion";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getConversionHomepage();
  return {
    title: page.hero.heading,
    description: page.hero.subheading,
    openGraph: {
      title: page.hero.heading,
      description: page.hero.subheading,
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
