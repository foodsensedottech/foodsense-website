# Analytics Quick Start Guide

## Setup

1. Add environment variables to `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_id
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

2. Import analytics in your component:

```typescript
import { analytics } from "@/lib/analytics/tracking";
```

## Common Usage Examples

### Track Page Views

```typescript
// In your page component
useEffect(() => {
  analytics.trackEvent("page_view", {
    page_path: window.location.pathname,
    page_title: document.title,
  });
}, []);
```

### Track Form Interactions

```typescript
// Form start
analytics.trackEvent("form_start", {
  form_id: "contact_form",
  event_category: "Form",
});

// Form complete
analytics.trackEvent("form_complete", {
  form_id: "contact_form",
  success: true,
  event_category: "Form",
});
```

### Track Service Views

```typescript
// In your services component
useEffect(() => {
  if (isInView && services) {
    services.forEach((service) => {
      analytics.trackEvent("service_view", {
        service_id: service.id,
        service_name: service.title,
      });
    });
  }
}, [isInView, services]);
```

### Track CTAs

```typescript
<Button
  onClick={() => {
    analytics.trackEvent("cta_click", {
      cta_text: "Get Started",
      cta_location: "header",
    });
  }}
>
  Get Started
</Button>
```

### Track Scroll Depth

```typescript
// Use the pre-built hook
import { useScrollTracking } from "@/hooks/use-scroll-tracking";

function YourComponent() {
  const scrollMetrics = useScrollTracking();
  // ... rest of your component
}
```

### Track User Engagement

```typescript
// Use the pre-built hook
import { useEngagementTracking } from "@/hooks/use-engagement-tracking";

function YourComponent() {
  const metrics = useEngagementTracking();
  // ... rest of your component
}
```

## Privacy Considerations

### Masking Sensitive Data

```typescript
// Add class to elements containing sensitive data
<div className="clarity-block">
  Sensitive content here
</div>

// Ignore tracking for specific elements
<div className="clarity-ignore">
  Do not track this
</div>
```

### Testing Analytics

1. Enable debug mode in your browser:

```javascript
localStorage.setItem("debug", "analytics:*");
```

2. Check the console for event logs:

```javascript
// Events will be logged like this:
Analytics Event: page_view
Parameters: { page_path: "/", page_title: "Home" }
```

## Common Hooks

### useNavigationTracking

```typescript
import { useNavigationTracking } from "@/hooks/use-navigation-tracking";

function Navigation() {
  const { trackMenuClick } = useNavigationTracking();

  return <button onClick={() => trackMenuClick("Home")}>Home</button>;
}
```

### useScrollTracking

```typescript
import { useScrollTracking } from "@/hooks/use-scroll-tracking";

function Page() {
  const scrollMetrics = useScrollTracking();

  // Metrics include:
  // - percentage: number (0-100)
  // - pixels: number
  // - timestamp: string
}
```

## Troubleshooting

### Events Not Firing

1. Check environment variables are set
2. Verify analytics provider is mounted
3. Check browser console for errors
4. Ensure component is client-side

### Missing Data

1. Check GA4 DebugView
2. Verify event parameters
3. Check privacy settings
4. Validate tracking code

### Performance Issues

1. Use throttling for scroll events
2. Lazy load analytics scripts
3. Use the `useCallback` hook for event handlers
4. Implement proper cleanup in `useEffect`

## Best Practices

1. Always cleanup event listeners

```typescript
useEffect(() => {
  // Add listeners
  const cleanup = someTracking();

  return () => {
    // Remove listeners
    cleanup();
  };
}, []);
```

2. Use type-safe event names

```typescript
// Import EventNames type
import type { EventNames } from "@/lib/analytics/tracking";

// Use typed event names
const eventName: EventNames = "page_view";
```

3. Include essential parameters

```typescript
analytics.trackEvent("event_name", {
  event_category: "Category", // Always include
  event_label: "Label", // Always include
  // ... other parameters
});
```

4. Handle errors gracefully

```typescript
try {
  analytics.trackEvent("some_event", params);
} catch (error) {
  console.error("Analytics error:", error);
  // Don't let analytics errors break the app
}
```
