# FoodSense Website Documentation

## Overview

The FoodSense website (foodsense.tech) is a modern, content-managed website built for a restaurant consulting business. The website serves as the primary digital presence for FoodSense, showcasing their services, expertise, and providing a way for potential restaurant clients to get in touch. The site is designed to be fast, SEO-friendly, and easily maintainable through a headless CMS.

## Technology Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**:
  - Shadcn UI (based on Radix UI primitives)
  - Custom components built with Tailwind
- **Animation**: Framer Motion
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation

### Backend

- **API Routes**: Next.js API routes (serverless functions)
- **CMS**: Contentful (headless CMS)
- **CRM**: HubSpot (for contact form submissions)
- **Analytics**:
  - Google Analytics
  - Vercel Analytics

### Infrastructure

- **Hosting**: Vercel
- **CI/CD**: Vercel with GitHub integration
- **Error Tracking**: Sentry
- **Image Optimization**: Next.js Image component with Contentful CDN

## Project Structure

The project follows a modern Next.js App Router structure:

```
foodsense-website/
├── public/                  # Static assets
├── src/
│   ├── app/                 # App Router pages and layouts
│   │   ├── api/             # API routes
│   │   ├── about/           # About page
│   │   ├── contact/         # Contact page
│   │   ├── services/        # Services page
│   │   └── ...              # Other pages
│   ├── components/          # React components
│   │   ├── a11y/            # Accessibility components
│   │   ├── forms/           # Form components
│   │   ├── layout/          # Layout components
│   │   ├── providers/       # Context providers
│   │   ├── sections/        # Page sections
│   │   ├── seo/             # SEO components
│   │   └── ui/              # UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and libraries
│   │   ├── analytics/       # Analytics integration
│   │   ├── contentful/      # Contentful client and types
│   │   ├── hubspot/         # HubSpot client and types
│   │   ├── validation/      # Zod schemas
│   │   └── utils/           # Utility functions
│   ├── providers/           # Global providers
│   ├── styles/              # Global styles
│   └── types/               # TypeScript type definitions
├── scripts/                 # Build and utility scripts
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── package.json             # Dependencies and scripts
```

## Key Features

### Content Management with Contentful

The website uses Contentful as a headless CMS to manage all content, allowing non-technical users to update the website without code changes. Content types include:

1. **Hero Section**: Main banner with heading, subheading, and background image
2. **About Section**: Company information with cards highlighting key points
3. **Homepage Pains / Offerings**: Same title + card format as About Us (`franchiseePainsTitle`, `franchiseePainCard`, `franchiseeOffersTitle`, `franchiseeOfferCard`). Setup steps: `docs/contentful-homepage-cards.md`
4. **Services Section**: Service offerings with descriptions and images
5. **Testimonials Section**: Client testimonials with ratings and images
6. **Contact Section**: Contact information and form

Example of fetching content from Contentful:

```typescript
// src/lib/contentful/client.ts (excerpt)
export async function getHeroContent() {
  try {
    const response = await client.getEntries({
      content_type: "heroFields",
      limit: 1,
      order: ["-sys.updatedAt"], // Order by most recently updated
    });

    if (!response.items.length) {
      throw new Error("No hero content found");
    }

    // More careful type conversion
    const item = response.items[0];

    // Create a new object with the expected structure
    return {
      sys: item.sys,
      fields: {
        heroHeading: item.fields.heroHeading,
        heroSubheading: item.fields.heroSubheading,
        backgroundImage: item.fields.backgroundImage,
        seoMetadata: item.fields.seoMetadata,
      } as unknown as HeroFields,
      metadata: item.metadata,
    } as unknown as HeroContentType;
  } catch (error) {
    console.error("Error fetching hero content:", error);
    return null;
  }
}
```

### HubSpot CRM Integration

The website integrates with HubSpot CRM to capture and manage leads from the contact form. When a user submits the contact form:

1. The form data is validated using Zod
2. The data is transformed into HubSpot-compatible format
3. A company record is created or updated in HubSpot
4. A contact record is created or updated and associated with the company
5. The contact is added to appropriate workflows in HubSpot

Example of the HubSpot integration:

```typescript
// src/app/api/contact/route.ts (excerpt)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validated = contactFormSchema.parse(data);

    // Transform the validated data for HubSpot
    const companyProperties = transformCompanyProperties(validated);
    const contactProperties = transformContactProperties({
      ...validated,
      phone: parsePhoneNumber(validated.phone),
    });

    // Create or update company first
    const companyId = await createOrUpdateCompany(companyProperties);

    // Create contact and associate with company
    const contactId = await createContactWithCompany(
      contactProperties,
      companyId
    );

    return NextResponse.json({
      success: true,
      contactId,
      companyId,
    });
  } catch (error) {
    console.error("Contact form submission error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      data: error,
    });

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
```

### SEO Implementation

The website is built with SEO as a priority, implementing:

1. **Server-side rendering** for optimal search engine crawling
2. **Structured metadata** for better search results
3. **Sitemap generation** for improved indexing
4. **Robots.txt** configuration
5. **Core Web Vitals** optimization
6. **Semantic HTML** structure
7. **SEO monitoring dashboard** (in development)

Example of the SEO metadata configuration:

```typescript
// src/app/layout.tsx (excerpt)
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
  // Additional metadata...
};
```

### Analytics Integration

The website uses multiple analytics solutions to track user behavior:

1. **Google Analytics**: For general website analytics
2. **Vercel Analytics**: For performance monitoring and user behavior

Example of the analytics implementation:

```typescript
// src/lib/analytics/index.tsx
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export function AnalyticsProvider() {
  return (
    <>
      <Analytics />
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
```

## Component Structure

The website is built using a component-based architecture, with reusable components organized by function:

### Page Sections

The main page sections are composed of smaller components:

```typescript
// src/components/sections/home-content.tsx
export async function HomeContent() {
  try {
    const [heroContent, aboutContent, servicesContent, testimonialsContent] =
      await Promise.all([
        getHeroContent(),
        getAboutContent(),
        getServicesContent(),
        getTestimonialsContent(),
      ]);

    if (
      !heroContent ||
      !aboutContent.heading ||
      !servicesContent.heading ||
      !testimonialsContent.heading
    ) {
      return <SectionLoading />;
    }

    return (
      <>
        <HeroSection data={heroContent} />
        <AboutSection
          heading={aboutContent.heading}
          cards={aboutContent.cards || []}
        />
        <ServicesSection
          heading={servicesContent.heading}
          cards={servicesContent.cards || []}
        />
        <TestimonialsSection
          heading={testimonialsContent.heading}
          cards={testimonialsContent.cards || []}
        />
        <ContactSection />
      </>
    );
  } catch (error) {
    console.error("Error loading content:", error);
    return <SectionLoading />;
  }
}
```

### UI Components

The UI components are built using Shadcn UI, which is based on Radix UI primitives and styled with Tailwind CSS:

```typescript
// Example of a UI component (simplified)
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

## Performance Optimizations

The website implements several performance optimizations:

1. **Image Optimization**: Using Next.js Image component with proper sizing and formats
2. **Code Splitting**: Automatic code splitting by Next.js
3. **Font Optimization**: Using next/font for optimized font loading
4. **Lazy Loading**: Components and images loaded only when needed
5. **Server Components**: Using React Server Components where possible
6. **Edge Caching**: Leveraging Vercel's edge network for fast global delivery

## Development Workflow

The development workflow includes:

1. **Local Development**: Using `npm run dev` for local development
2. **Testing**: Jest and React Testing Library for unit and component tests
3. **Linting**: ESLint for code quality
4. **Build Process**: Custom build scripts with cache busting for Contentful
5. **Deployment**: Automatic deployment via Vercel on push to main branch

## Integration with RestaurantIQ SEO and Analytics System

The FoodSense website is designed to integrate with the upcoming RestaurantIQ SEO and Analytics System. Key integration points include:

1. **Analytics Tracking**: The website already includes basic analytics that will be enhanced by RestaurantIQ
2. **SEO Dashboard**: A preliminary SEO dashboard exists that will be expanded with RestaurantIQ data
3. **Content Performance**: Content from Contentful will be analyzed for performance
4. **User Behavior Tracking**: Current basic tracking will be enhanced with detailed user journey analysis

## Conclusion

The FoodSense website is a modern, performant, and SEO-friendly website built with Next.js, TypeScript, and Tailwind CSS. It leverages Contentful for content management and HubSpot for CRM integration. The website is designed to be easily maintainable and extensible, with a focus on performance and user experience.

This documentation provides a foundation for understanding the website's architecture and can be used as a reference for developing the RestaurantIQ SEO and Analytics System that will integrate with it.
