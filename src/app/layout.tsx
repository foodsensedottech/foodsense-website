import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { validateEnv } from "@/lib/env";
import { ToastProvider } from "@/components/providers/toast-provider";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
  adjustFontFallback: false,
});

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
    default: "FoodSense - Restaurant Consulting",
    template: "%s | FoodSense",
  },
  description:
    "We help independent restaurants improve their sales and customer engagement with the use of enterprise-grade technology.",
  keywords: [
    "restaurant online ordering",
    "food near me",
    "menu optimization",
    "restaurant growth",
    "restaurant technology",
    "restaurant consulting",
    "restaurant Google My Business",
  ],
  authors: [{ name: "FoodSense" }],
  creator: "FoodSense",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foodsense.tech",
    title: "FoodSense - Restaurant Consulting",
    description: "We help independent restaurants.",
    siteName: "FoodSense",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FoodSense - Restaurant Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodSense - Restaurant Consulting",
    description: "We help independent restaurants.",
    images: ["/images/twitter-image.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
