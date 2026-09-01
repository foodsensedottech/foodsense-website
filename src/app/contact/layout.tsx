import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a Strategy Audit. Tell us the blocker — stack, cutover, or vendor. We respond within 24 hours.",
  openGraph: {
    title: "Contact | FoodSense",
    description:
      "Book a Strategy Audit. Tell us the blocker — stack, cutover, or vendor.",
    url: "https://foodsense.tech/contact",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | FoodSense",
    description: "Book a Strategy Audit with FoodSense.",
  },
};

// Add revalidation at the layout level (server component)
export const revalidate = 3600; // Revalidate at most once per hour

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
