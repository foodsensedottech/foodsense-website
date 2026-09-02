import type { Metadata } from "next";
import { FranchiseeLanding } from "@/components/sections/franchisees/franchisee-landing";
import { getFranchiseePage } from "@/lib/contentful/franchisee";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getFranchiseePage("en");
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: "/franchisees",
      languages: {
        en: "/franchisees",
        es: "/es/franchisees",
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: "en_US",
      alternateLocale: ["es_LA"],
    },
  };
}

export default function FranchiseesPage() {
  return <FranchiseeLanding locale="en" />;
}
