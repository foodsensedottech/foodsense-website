import type { Metadata } from "next";
import { FranchiseeLanding } from "@/components/sections/franchisees/franchisee-landing";
import { franchiseeCopy } from "@/lib/franchisees/copy";

export const metadata: Metadata = {
  title: franchiseeCopy.en.metaTitle,
  description: franchiseeCopy.en.metaDescription,
  alternates: {
    canonical: "/franchisees",
    languages: {
      en: "/franchisees",
      es: "/es/franchisees",
    },
  },
  openGraph: {
    title: franchiseeCopy.en.metaTitle,
    description: franchiseeCopy.en.metaDescription,
    locale: "en_US",
    alternateLocale: ["es_LA"],
  },
};

export default function FranchiseesPage() {
  return <FranchiseeLanding locale="en" />;
}
