# FoodSense Analytics Implementation Guide

This document outlines the implementation plan for Microsoft Clarity and enhanced Google Analytics tracking for the FoodSense website.

## Table of Contents

- [Current Implementation](#current-implementation)
- [Microsoft Clarity Setup](#microsoft-clarity-setup)
- [Enhanced Google Analytics](#enhanced-google-analytics)
- [Component Integration](#component-integration)
- [Google Analytics Configuration](#google-analytics-configuration)
- [Microsoft Clarity Configuration](#microsoft-clarity-configuration)
- [Implementation Checklist](#implementation-checklist)

## Current Implementation

The website currently uses:

- Google Analytics 4
- Vercel Analytics
- Lazy loading strategy for analytics scripts

## Microsoft Clarity Setup

### 1. Analytics Provider Implementation

```typescript
// src/lib/analytics/index.tsx
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import React from "react";

export function AnalyticsProvider(): React.ReactNode {
  return (
    <React.Fragment>
      <Analytics />
      {/* Microsoft Clarity */}
      <Script strategy="afterInteractive" id="microsoft-clarity">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
        `}
      </Script>
      {/* Google Analytics */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </React.Fragment>
  );
}
```

### 2. Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_CLARITY_ID=your_clarity_id_here
```

## Enhanced Google Analytics

### 1. Analytics Tracking Utility

```typescript
// src/lib/analytics/tracking.ts
type EventNames =
  | "page_view"
  | "scroll_to_contact"
  | "form_start"
  | "form_complete"
  | "service_view"
  | "testimonial_view"
  | "menu_interaction"
  | "cta_click"
  | "external_link_click";

interface AnalyticsEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

export function trackEvent(eventName: EventNames, params: AnalyticsEvent = {}) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, {
    ...params,
    timestamp: new Date().toISOString(),
    page_path: window.location.pathname,
  });
}

export const analytics = {
  trackPageView: (url: string) => {
    trackEvent("page_view", {
      page_path: url,
      page_title: document.title,
    });
  },

  trackFormStart: (formId: string) => {
    trackEvent("form_start", {
      event_category: "Form",
      event_label: formId,
    });
  },

  // ... other tracking functions
};
```

## Component Integration

### 1. Contact Form Tracking

```typescript
// src/components/sections/contact/contact-form.tsx
"use client";

import { analytics } from "@/lib/analytics/tracking";

export function ContactForm() {
  const onSubmit = async (data: ContactFormData) => {
    try {
      analytics.trackFormStart("contact_form");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      analytics.trackFormComplete("contact_form", true);
      analytics.trackConversion("contact_form_submission");
    } catch (error) {
      analytics.trackFormComplete("contact_form", false);
    }
  };

  // ... rest of the component
}
```

### 2. Services Section Tracking

```typescript
// src/components/sections/services/services-cards.tsx
"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/lib/analytics/tracking";
import { useInView } from "framer-motion";

export function ServicesCards({ data }: ServicesCardsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && data) {
      data.forEach((service) => {
        analytics.trackServiceView(service.title);
      });
    }
  }, [isInView, data]);

  // ... rest of the component
}
```

## Google Analytics Configuration

### Custom Events Setup

1. Navigate to GA4 > Configure > Events
2. Create the following events:
   - form_start
   - form_complete
   - service_view
   - scroll_to_contact
   - conversion

### Conversion Events

1. Go to Configure > Conversions
2. Mark these events as conversions:
   - form_complete (when success=true)
   - scroll_to_contact
   - service_view

### Custom Dimensions

1. Access Configure > Custom Definitions
2. Add dimensions:
   - service_name
   - form_id
   - cta_text

## Microsoft Clarity Configuration

### Custom Tags

1. Access Clarity Dashboard > Settings > Custom Tags
2. Configure tags for:
   - Form interactions
   - Service views
   - Scroll depth
   - CTA clicks

## Implementation Checklist

### Phase 1: Basic Setup (Week 1)

- [x] Environment Setup

  - [x] Add NEXT_PUBLIC_CLARITY_ID to .env.local
  - [x] Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env.local
  - [x] Verify environment variables are loaded correctly

- [x] Microsoft Clarity Integration

  - [x] Add Clarity script to AnalyticsProvider
  - [x] Test Clarity script loading
  - [x] Verify Clarity recording is working
  - [x] Set up privacy settings

- [x] Analytics Utility Setup
  - [x] Create analytics/tracking.ts
  - [x] Implement basic event tracking
  - [x] Test event tracking in development

### Phase 2: Component Integration (Week 2)

- [x] Contact Form Integration

  - [x] Add form_start tracking
  - [x] Add form_complete tracking
  - [x] Add conversion tracking
  - [x] Test form analytics in development

- [x] Services Section Integration

  - [x] Add service view tracking
  - [x] Implement intersection observer
  - [x] Test service view analytics

- [x] Navigation Integration
  - [x] Add page view tracking
  - [x] Add menu interaction tracking
  - [x] Test navigation analytics

### Phase 3: Enhanced Tracking (Week 3)

- [x] Scroll Tracking

  - [x] Implement scroll depth tracking
  - [x] Add scroll to contact tracking
  - [x] Test scroll analytics

- [x] CTA Tracking

  - [x] Add CTA click tracking
  - [x] Implement external link tracking
  - [x] Test CTA analytics

- [x] User Engagement
  - [x] Add session duration tracking
  - [x] Implement bounce rate tracking
  - [x] Test engagement metrics

### Phase 4: Analytics Dashboard Setup (Week 4)

- [ ] Google Analytics Setup

  - [ ] Configure custom events
  - [ ] Set up conversion tracking
  - [ ] Create custom dimensions
  - [ ] Set up custom reports

- [ ] Microsoft Clarity Setup
  - [ ] Configure custom tags
  - [ ] Set up heatmaps
  - [ ] Configure session recording
  - [ ] Set up custom metrics

### Phase 5: Testing & Optimization (Week 5)

- [ ] Testing

  - [ ] Test all tracking events
  - [ ] Verify data accuracy
  - [ ] Check performance impact
  - [ ] Cross-browser testing

- [ ] Documentation
  - [ ] Update implementation guide
  - [ ] Document custom events
  - [ ] Create tracking guide
  - [ ] Document privacy considerations

### Phase 6: Reporting & Monitoring (Week 6)

- [ ] Reporting Setup

  - [ ] Create custom dashboards
  - [ ] Set up automated reports
  - [ ] Configure alerts
  - [ ] Test reporting system

- [ ] Monitoring
  - [ ] Set up error tracking
  - [ ] Configure performance monitoring
  - [ ] Implement data quality checks
  - [ ] Create monitoring alerts

### Ongoing Tasks

- [ ] Regular review of analytics data
- [ ] Update tracking as needed
- [ ] Monitor performance impact
- [ ] Update documentation
- [ ] Privacy compliance checks
