import { Metadata } from "next";
import { getContactHeading } from "@/lib/contentful/contact";

export async function generateMetadata(): Promise<Metadata> {
  const heading = await getContactHeading();
  const title = heading?.fields?.heading;
  const description = heading?.fields?.subheading;

  return {
    title: title ? `${title} | FoodSense` : undefined,
    description: description || undefined,
    openGraph: {
      title: title ? `${title} | FoodSense` : undefined,
      description: description || undefined,
      url: "https://foodsense.tech/contact",
      siteName: "FoodSense",
      locale: "en_US",
      type: "website",
    },
  };
}

export const revalidate = 3600;

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
