import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "@/components/providers/client-providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.foodsense.tech"
  ),
  title: {
    template: "%s | FoodSense",
    default: "FoodSense | Advisor for 10+ unit restaurant operators",
  },
  description:
    "Advisory and fractional program management for VP Tech, CDTO, CEO, and Country GMs at 10+ units. We advise, guide, and help implement stack standardization.",
  openGraph: {
    title: "FoodSense | Advisor for 10+ unit restaurant operators",
    description:
      "Advisory and fractional program management for VP Tech, CDTO, CEO, and Country GMs at 10+ units. We advise, guide, and help implement stack standardization.",
    url: "https://www.foodsense.tech",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-icon.png" },
      { url: "/icons/icon-180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon",
        url: "/icons/apple-touch-icon.png",
      },
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#1e3a5f",
      },
    ],
  },
  manifest: "/manifest.json",
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
    title: "FoodSense | Advisor for 10+ unit restaurant operators",
    card: "summary",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        <ClientProviders>{children}</ClientProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
