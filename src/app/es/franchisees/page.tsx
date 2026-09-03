import type { Metadata } from "next";
import { FranchiseeLanding } from "@/components/sections/franchisees/franchisee-landing";
import { getFranchiseePage } from "@/lib/contentful/franchisee";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getFranchiseePage("es");
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: "/es/franchisees",
      languages: {
        en: "/franchisees",
        es: "/es/franchisees",
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: "es_LA",
      alternateLocale: ["en_US"],
    },
  };
}

export default function FranchiseesEsPage() {
  return <FranchiseeLanding locale="es" />;
}
