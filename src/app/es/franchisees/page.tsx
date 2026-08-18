import type { Metadata } from "next";
import { FranchiseeLanding } from "@/components/sections/franchisees/franchisee-landing";
import { franchiseeCopy } from "@/lib/franchisees/copy";

export const metadata: Metadata = {
  title: franchiseeCopy.es.metaTitle,
  description: franchiseeCopy.es.metaDescription,
  alternates: {
    canonical: "/es/franchisees",
    languages: {
      en: "/franchisees",
      es: "/es/franchisees",
    },
  },
  openGraph: {
    title: franchiseeCopy.es.metaTitle,
    description: franchiseeCopy.es.metaDescription,
    locale: "es_LA",
    alternateLocale: ["en_US"],
  },
};

export default function FranchiseesEsPage() {
  return <FranchiseeLanding locale="es" />;
}
