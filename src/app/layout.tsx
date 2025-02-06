import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { getAllSchemas } from "@/lib/schema";
import { AnalyticsProvider } from "@/components/providers/analytics-provider";
import { ScrollTrackingProvider } from "@/components/providers/scroll-tracking-provider";
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Add more targeted keywords
const industryKeywords = [
  // Restaurant Management
  "restaurant consulting services",
  "bar and restaurant consulting",
  "restaurant management consulting",
  "restaurant management systems",
  "restaurant pos systems",
  
  // Location-based
  "miami restaurant consulting",
  "florida restaurant management",
  "south florida restaurant solutions",
  
  // Delivery & Operations
  "delivery near me",
  "food near me",
  "restaurant delivery optimization",
  "ghost kitchen consulting",
  "cloud kitchen management",
  
  // Technology
  "restaurant technology solutions",
  "pos system integration",
  "restaurant analytics platform",
  "digital menu optimization",
  
  // Business Growth
  "restaurant revenue optimization",
  "restaurant business consulting",
  "restaurant profit maximization",
  "restaurant efficiency solutions"
].join(", ");

export const metadata: Metadata = {
  title: 'FoodSense - Restaurant Management Solutions',
  description: 'Optimize your restaurant operations with FoodSense. Delivery management, POS integration, and analytics solutions.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://foodsense.tech'),
  openGraph: {
    title: 'FoodSense - Restaurant Management Solutions',
    description: 'Optimize your restaurant operations with FoodSense. Delivery management, POS integration, and analytics solutions.',
    url: 'https://foodsense.tech',
    siteName: 'FoodSense',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FoodSense'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodSense - Restaurant Management Solutions',
    description: 'Optimize your restaurant operations with FoodSense. Delivery management, POS integration, and analytics solutions.',
    images: ['/images/og-image.jpg'],
  },
  keywords: industryKeywords,
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <AnalyticsProvider />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getAllSchemas())
          }}
        />
      </head>
      <body
        className={cn(
          inter.variable,
          "font-sans min-h-screen flex flex-col",
          "bg-white dark:bg-dark"
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="top-center" />
        <ScrollTrackingProvider />
      </body>
    </html>
  );
}