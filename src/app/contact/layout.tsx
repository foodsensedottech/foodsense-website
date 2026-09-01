import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where the gap is. Operators, ops, technology, heads of digital — one conversation. Book a Strategy Audit.",
  openGraph: {
    title: "Contact | FoodSense",
    description:
      "Tell us where the gap is. Operators, ops, technology, heads of digital. Book a Strategy Audit.",
    url: "https://foodsense.tech/contact",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | FoodSense",
    description:
      "Tell us where the gap is. Operators, ops, technology, heads of digital. Book a Strategy Audit.",
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
