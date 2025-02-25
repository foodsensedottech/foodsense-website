import type { Metadata } from "next";

type OpenGraphType = "article" | "website";

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  openGraph?: {
    images?: string[];
    type?: OpenGraphType;
  };
  alternates?: {
    languages?: Record<string, string>;
  };
  keywords?: string[];
  canonicalUrl?: string;
  jsonLd?: Record<string, unknown>;
  searchTerms?: string[];
}

export function generatePageMetadata({
  title,
  description,
  path,
  openGraph,
  alternates,
  keywords,
  canonicalUrl,
  jsonLd,
  searchTerms,
}: GenerateMetadataProps): Metadata {
  const url = canonicalUrl || `https://foodsense.tech${path}`;

  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FoodSense",
    url: "https://foodsense.tech",
    logo: "https://foodsense.tech/logo.png",
    sameAs: [
      "https://twitter.com/foodsense",
      "https://linkedin.com/company/foodsense",
    ],
  };

  return {
    title,
    description,
    keywords: [...(keywords || []), ...(searchTerms || [])],
    alternates: {
      canonical: url,
      languages: alternates?.languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "FoodSense",
      type: (openGraph?.type || "website") as OpenGraphType,
      images: openGraph?.images?.map((image) => ({
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      })) || [
        {
          url: "https://foodsense.tech/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: openGraph?.images || ["/og-image.jpg"],
      creator: "@foodsense",
    },
    other: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? {
            "google-site-verification":
              process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          }
        : {}),
      ...(searchTerms?.length
        ? { "keywords-extra": searchTerms.join(", ") }
        : {}),
      "script:ld+json": JSON.stringify(jsonLd || defaultJsonLd),
    },
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          }
        : {}),
    },
  };
}
