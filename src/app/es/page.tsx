import { Suspense } from "react";
import type { Metadata } from "next";
import { BaseLayout } from "@/components/layout";
import { HomeContent } from "@/components/sections/home-content";
import { SectionLoading } from "@/components/ui/layout/section-loading";
import { franchiseeCopy } from "@/lib/franchisees/copy";

export const metadata: Metadata = {
  title: franchiseeCopy.es.metaTitle,
  description: franchiseeCopy.es.metaDescription,
  alternates: {
    canonical: "/es",
    languages: {
      en: "/",
      es: "/es",
    },
  },
  openGraph: {
    title: franchiseeCopy.es.metaTitle,
    description: franchiseeCopy.es.metaDescription,
    locale: "es_LA",
    alternateLocale: ["en_US"],
  },
};

export default function SpanishHome() {
  return (
    <BaseLayout>
      <Suspense fallback={<SectionLoading />}>
        <HomeContent locale="es" />
      </Suspense>
    </BaseLayout>
  );
}

export const revalidate = 3600;
