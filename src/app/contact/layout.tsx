import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | FoodSense",
  description: "Get in touch with the FoodSense team",
  openGraph: {
    title: "Contact Us | FoodSense",
    description: "Get in touch with the FoodSense team",
    url: "https://foodsense.tech/contact",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | FoodSense",
    description: "Get in touch with the FoodSense team",
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
