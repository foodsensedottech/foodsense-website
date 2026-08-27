import { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClientProviders } from "@/components/providers/client-providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { validateEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "700"],
});

try {
  validateEnv();
} catch (error) {
  console.error("Environment validation failed:", error);
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
    default: "FoodSense | Fractional Tech & Ops Leadership for QSR",
  },
  description:
    "We help SMB and Enterprise Quick Service Restaurants optimize their tech stack and operational workflows to increase margins and efficiency.",
  openGraph: {
    title: "FoodSense | Fractional Tech & Ops Leadership for QSR",
    description:
      "Scaling QSR excellence through fractional tech and ops leadership.",
    url: "https://foodsense.tech",
    siteName: "FoodSense",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FoodSense",
      },
    ],
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
      <body className={cn(nunito.variable, "font-sans antialiased")}>
        <ClientProviders>{children}</ClientProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
