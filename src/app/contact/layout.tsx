import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a scoped engagement",
  description:
    "Tell us what is breaking. We reply next business day, not later than 48 hours in normal business hours. Then we agree on a mode and a scope of work.",
  openGraph: {
    title: "Start a scoped engagement | FoodSense",
    description:
      "Tell us what is breaking. We reply next business day, not later than 48 hours in normal business hours. Then we agree on a mode and a scope of work.",
    url: "https://www.foodsense.tech/contact",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Start a scoped engagement | FoodSense",
    description:
      "Tell us what is breaking. We reply next business day, not later than 48 hours in normal business hours.",
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
