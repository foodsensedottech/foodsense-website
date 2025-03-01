import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "@/components/providers/client-providers";
import Script from "next/script";
import "./globals.css";
import { validateEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

try {
  // Validate environment variables at build/runtime
  validateEnv();
} catch (error) {
  console.error("Environment validation failed:", error);
  // In development, we can continue with warnings
  if (process.env.NODE_ENV === "production") {
    throw error;
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://foodsense.tech"
  ),
  title: {
    template: "%s | FoodSense",
    default: "FoodSense - Restaurant Analytics and Insights",
  },
  description:
    "FoodSense helps restaurants optimize their operations with data-driven insights and analytics.",
  openGraph: {
    title: "FoodSense - Restaurant Analytics and Insights",
    description:
      "FoodSense helps restaurants optimize their operations with data-driven insights and analytics.",
    url: "https://foodsense.tech",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "FoodSense",
    card: "summary_large_image",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          src="https://www.clarity.ms/tag/qg2nt96cix"
        />
      </head>
      <body className={cn(inter.className, "antialiased")}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
