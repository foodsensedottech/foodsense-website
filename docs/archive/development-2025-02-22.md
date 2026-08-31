# FoodSense Website Development Guide

## Project Overview

FoodSense's website is a single-page Next.js 14 application with scroll-to-section navigation. The site integrates Contentful CMS for content management and HubSpot for contact form handling.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **CMS**: Contentful
- **Form Handling**: HubSpot (DO NOT MODIFY)
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Single-Page Architecture

The website uses a scroll-to-section architecture where:

- All sections are rendered on the homepage
- Navigation links scroll to section IDs
- Each section is a self-contained component
- Sections fetch their own data from Contentful
- The contact form section integrates with HubSpot

## Project Structure

```
foodsense-website/
├── src/
│   ├── app/
│   │   └── page.tsx        # Main single-page container
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx  # Navigation header
│   │   │   └── footer.tsx  # Site footer
│   │   ├── sections/
│   │   │   ├── hero/      # Hero section
│   │   │   ├── about/     # About section
│   │   │   ├── services/  # Services section
│   │   │   ├── testimonials/ # Testimonials
│   │   │   ├── blog/      # Blog section
│   │   │   └── contact/   # Contact form (HubSpot)
│   │   └── ui/            # Shared UI components
│   ├── lib/
│   │   ├── contentful/    # Contentful integration
│   │   ├── hubspot/       # HubSpot (DO NOT MODIFY)
│   │   └── utils/         # Utility functions
│   └── styles/            # Global styles
└── public/                # Static assets
```

## Section Requirements

### 1. Hero Section

- **Components Required**:
  - Background image (Contentful Asset)
  - Header title and subtitle
  - CTA button linking to Contact section
- **Contentful Model**:
  ```typescript
  interface HeroContent {
    backgroundImage: Asset;
    title: string;
    subtitle: string;
    ctaText: string;
  }
  ```

### 2. About Section

- **Components Required**:
  - Section title and subtitle
  - 4-column card grid
  - Lucide icons integration
- **Contentful Model**:
  ```typescript
  interface AboutCard {
    icon: string; // Lucide icon name
    title: string;
    description: string;
  }
  ```

### 3. Services Section

- **Components Required**:
  - Section title and subtitle
  - 3-column card grid with images
- **Contentful Model**:
  ```typescript
  interface ServiceCard {
    thumbnail: Asset;
    title: string;
    description: string;
  }
  ```

### 4. Testimonials Section

- **Components Required**:
  - 3-column testimonial cards
  - Rounded images for business owners
- **Contentful Model**:
  ```typescript
  interface TestimonialCard {
    quote: string;
    authorName: string;
    businessName: string;
    authorImage: Asset;
  }
  ```

### 5. Blog Section

- **Components Required**:
  - 4-column blog post cards
  - LinkedIn post embeddings
- **Structure**:
  ```typescript
  interface BlogPost {
    title: string;
    description: string;
    linkedInUrl: string;
  }
  ```

### 6. Contact Section (HubSpot - DO NOT MODIFY)

- Existing implementation
- HubSpot integration is complete
- Form validation is in place

## Development Guidelines

### Creating New Sections

1. Create section directory:

```bash
mkdir src/components/sections/section-name
```

2. Create required files:

```
section-name/
├── index.tsx          # Main export
├── section.tsx        # Section component
├── section-card.tsx   # Card component
└── loading.tsx        # Loading state
```

### Section Component Template

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { SectionProps } from "@/lib/contentful/types";

export function SectionName({ data }: SectionProps) {
  return (
    <section id="section-id" className="py-16">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Content */}
      </motion.div>
    </section>
  );
}
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use semantic HTML elements
- Support dark mode
- Follow accessibility guidelines

### Animation Guidelines

- Use Framer Motion for animations
- Keep animations subtle and professional
- Ensure animations don't impact performance
- Provide reduced-motion alternatives

### Performance Considerations

- Optimize images using Next.js Image component
- Lazy load below-the-fold content
- Use React Suspense boundaries
- Implement proper loading states
- Monitor Core Web Vitals

## Important Notes

- HubSpot integration code cannot be modified
- All sections must be responsive
- Follow established naming conventions
- Use TypeScript strictly
- Maintain SEO best practices
- Test across all major browsers
- Ensure accessibility compliance

## Deployment Checklist

- Verify all Contentful content
- Test HubSpot form submissions
- Check responsive layouts
- Validate accessibility
- Test performance metrics
- Verify SEO elements
