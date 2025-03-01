# FoodSense Analytics Setup Documentation

## Overview

This document provides detailed information about the analytics implementation for the FoodSense website. The setup includes:

- Google Analytics 4 (GA4) for quantitative analytics
- Microsoft Clarity for qualitative analytics
- Custom event tracking
- Dashboard configuration
- Privacy considerations

## Table of Contents

1. [Event Tracking](#event-tracking)
2. [Google Analytics Configuration](#google-analytics-configuration)
3. [Microsoft Clarity Configuration](#microsoft-clarity-configuration)
4. [Dashboard Setup](#dashboard-setup)
5. [Privacy and Security](#privacy-and-security)
6. [Testing and Validation](#testing-and-validation)
7. [Creating Analytics Events](#creating-analytics-events)

## Event Tracking

### Core Events

```typescript
// Available event types
type EventNames =
  | "page_view"
  | "scroll_to_contact"
  | "form_start"
  | "form_complete"
  | "service_view"
  | "testimonial_view"
  | "menu_interaction"
  | "cta_click"
  | "external_link_click"
  | "conversion"
  | "scroll_depth"
  | "section_view"
  | "user_engagement"
  | "bounce";
```

### Form Events

- **form_start**: Triggered when user starts interacting with a form
- **form_complete**: Triggered on form submission (success/failure tracked)
  ```typescript
  analytics.trackEvent("form_start", {
    event_category: "Form",
    event_label: "contact_form",
    form_id: "contact_form",
  });
  ```

### Service Events

- **service_view**: Tracks when services are viewed
- **section_view**: Tracks visibility of major page sections
  ```typescript
  analytics.trackEvent("service_view", {
    event_category: "Service",
    event_label: service.title,
    service_id: service.id,
    service_name: service.title,
  });
  ```

### Engagement Events

- **scroll_depth**: Tracks how far users scroll (25%, 50%, 75%, 100%)
- **user_engagement**: Tracks session duration and page views
- **bounce**: Tracks early exits (< 30 seconds)

### Navigation Events

- **page_view**: Tracks page loads and navigation
- **menu_interaction**: Tracks menu item clicks
  ```typescript
  analytics.trackEvent("menu_interaction", {
    event_category: "Navigation",
    event_label: item.label,
    menu_item: item.label,
    current_path: pathname,
    target_path: item.href,
  });
  ```

### CTA Events

- **cta_click**: Tracks call-to-action button clicks
- **external_link_click**: Tracks outbound link clicks

## Google Analytics Configuration

### Custom Dimensions

```typescript
customDimensions = [
  {
    name: "service_name",
    scope: "event",
    description: "Name of the service being viewed",
  },
  {
    name: "form_id",
    scope: "event",
    description: "Identifier for the form being interacted with",
  },
  // ... other dimensions
];
```

### Custom Metrics

```typescript
customMetrics = [
  {
    name: "scroll_depth_pixels",
    scope: "event",
    description: "Scroll depth in pixels",
    unit: "PIXELS",
  },
  // ... other metrics
];
```

### Conversion Events

```typescript
conversionEvents = [
  {
    name: "form_complete",
    conditions: [{ parameter: "success", value: "true" }],
  },
  // ... other conversions
];
```

## Microsoft Clarity Configuration

### Custom Tags

```typescript
customTags = {
  form_tags: {
    form_start: {
      selector: "form",
      event: "focus",
      attributes: ["id", "name"],
    },
  },
  // ... other tags
};
```

### Heatmap Settings

```typescript
heatmapConfig = {
  click_tracking: {
    enabled: true,
    elements: ["button", "a", ".service-card", ".cta", "form input"],
  },
  scroll_tracking: {
    enabled: true,
    breakpoints: [25, 50, 75, 100],
  },
};
```

### Privacy Settings

```typescript
sessionConfig = {
  mask_all_numbers: true,
  mask_all_emails: true,
  block_class: "clarity-block",
  ignore_class: "clarity-ignore",
};
```

## Dashboard Setup

### Available Reports

1. **User Engagement Overview**

   - Average Session Duration
   - Bounce Rate
   - Average Scroll Depth

2. **Conversion Funnel Analysis**

   - Page View → Service View → Form Start → Form Complete

3. **Service Performance Metrics**

   - Views per service
   - Click-through rates
   - Engagement metrics

4. **User Journey Analysis**

   - Path analysis
   - Drop-off points
   - Conversion paths

5. **CTA Performance Analysis**
   - Click counts
   - Conversion rates
   - Location effectiveness

### Alert Configuration

```typescript
alertConfig = {
  bounce_rate: {
    threshold: 70,
    condition: "above",
    timeframe: "daily",
  },
  conversion_drop: {
    threshold: -20,
    condition: "change_below",
    timeframe: "weekly",
  },
};
```

## Privacy and Security

### Data Collection

- PII is automatically masked
- Email addresses are hashed
- Numbers are obscured in recordings
- Custom class-based exclusions available

### Cookie Compliance

- Respects user consent preferences
- Implements cookie banner choices
- Follows GDPR guidelines

### Data Retention

- GA4: 14 months
- Clarity: 30 days for recordings
- Custom retention policies configurable

## Testing and Validation

### Event Testing

1. Use browser console to verify events:

   ```javascript
   analytics.trackEvent("test_event", {
     event_category: "Test",
     event_label: "Test Label",
   });
   ```

2. Verify in GA4 DebugView:
   - Enable debug mode
   - Check real-time event stream
   - Validate parameters

### Dashboard Validation

1. Check data freshness (5-minute delay)
2. Verify metric calculations
3. Test alert thresholds

### Common Issues

- Event not firing: Check selectors and event bindings
- Missing data: Verify tracking code installation
- Incorrect metrics: Check parameter mapping

## Creating Analytics Events

### Step 1: Define the Event Type

1. Add the new event name to the `EventNames` type in `src/lib/analytics/tracking.ts`:

```typescript
type EventNames =
  | "page_view"
  | "your_new_event"  // Add your new event here
  | ... // existing events;
```

2. Choose an appropriate event category:
   - Form Events: User interactions with forms
   - Service Events: Service-related interactions
   - Navigation Events: Page navigation and menu interactions
   - Engagement Events: User engagement metrics
   - CTA Events: Call-to-action interactions

### Step 2: Configure Event Parameters

1. Define the event parameters in `ga-config.ts`:

```typescript
export const customEvents = {
  your_event_category: {
    your_new_event: {
      parameters: ["parameter1", "parameter2", "event_category", "event_label"],
    },
  },
};
```

2. Add corresponding custom dimensions if needed:

```typescript
export const customDimensions = [
  {
    name: "your_parameter",
    scope: "event",
    description: "Description of your parameter",
  },
];
```

### Step 3: Implement Event Tracking

1. Create a tracking function in `analytics.ts`:

```typescript
export const analytics = {
  // ... existing functions

  trackYourEvent: (params: {
    parameter1: string;
    parameter2: string;
    // ... other parameters
  }) => {
    trackEvent("your_new_event", {
      event_category: "Your Category",
      event_label: params.parameter1,
      ...params,
    });
  },
};
```

2. Add TypeScript types for the parameters:

```typescript
interface YourEventParams {
  parameter1: string;
  parameter2: string;
  [key: string]: unknown;
}
```

### Step 4: Add Microsoft Clarity Tags (if needed)

1. Configure custom tags in `clarity-config.ts`:

```typescript
export const customTags = {
  your_event_tags: {
    your_new_event: {
      selector: ".your-element",
      event: "click", // or other event type
      attributes: ["data-attribute1", "data-attribute2"],
    },
  },
};
```

### Step 5: Implement in Components

1. Basic Implementation:

```typescript
function YourComponent() {
  const handleEvent = () => {
    analytics.trackYourEvent({
      parameter1: "value1",
      parameter2: "value2",
    });
  };

  return <button onClick={handleEvent}>Trigger Event</button>;
}
```

2. With React Hook (if needed):

```typescript
function useYourEventTracking() {
  const trackEvent = useCallback((params: YourEventParams) => {
    analytics.trackYourEvent(params);
  }, []);

  return { trackEvent };
}
```

### Step 6: Add to Dashboard Configuration

1. Add to custom reports in `dashboard-config.ts`:

```typescript
export const customReports = {
  your_event_report: {
    title: "Your Event Analysis",
    metrics: [
      {
        name: "Your Metric",
        event: "your_new_event",
        parameter: "parameter1",
        aggregation: "count",
      },
    ],
    visualization: "your_chart_type",
  },
};
```

### Step 7: Testing the Event

1. Test in Development:

```typescript
// In browser console
analytics.trackYourEvent({
  parameter1: "test_value",
  parameter2: "test_value",
});
```

2. Verify in GA4 DebugView:

   - Enable debug mode
   - Trigger the event
   - Check parameters and values

3. Test in Clarity:
   - Check custom tags are firing
   - Verify attributes are captured
   - Validate in session recordings

### Step 8: Documentation

1. Add event documentation:

```typescript
/**
 * Tracks your custom event
 * @param {YourEventParams} params - Event parameters
 * @param {string} params.parameter1 - Description of parameter1
 * @param {string} params.parameter2 - Description of parameter2
 * @example
 * analytics.trackYourEvent({
 *   parameter1: "value1",
 *   parameter2: "value2"
 * });
 */
```

2. Update the events catalog in your documentation

### Example: Creating a Feature Usage Event

```typescript
// 1. Add to EventNames
type EventNames = | "feature_usage" | ... ;

// 2. Configure in ga-config.ts
export const customEvents = {
  feature_events: {
    feature_usage: {
      parameters: ["feature_name", "action_type", "duration"]
    }
  }
};

// 3. Add tracking function
export const analytics = {
  trackFeatureUsage: (params: {
    feature_name: string;
    action_type: "start" | "complete";
    duration?: number;
  }) => {
    trackEvent("feature_usage", {
      event_category: "Feature",
      event_label: params.feature_name,
      ...params
    });
  }
};

// 4. Implement in component
function FeatureComponent() {
  const handleFeatureStart = () => {
    analytics.trackFeatureUsage({
      feature_name: "cool_feature",
      action_type: "start"
    });
  };

  return <button onClick={handleFeatureStart}>Use Feature</button>;
}
```

## Implementation Checklist

- [ ] Configure GA4 property
- [ ] Set up Microsoft Clarity project
- [ ] Add tracking code to environment variables
- [ ] Configure custom dimensions and metrics
- [ ] Set up conversion events
- [ ] Configure custom tags
- [ ] Create dashboards
- [ ] Set up alerts
- [ ] Test all event tracking
- [ ] Validate privacy settings
- [ ] Document any custom implementations

## Google Analytics Event Setup Guide

### Step 1: Access GA4 Event Configuration

1. Log into Google Analytics
2. Select your property
3. Navigate to: Configure > Events
4. Click "Create Event"

### Step 2: Configure Event in GA4

1. **Create Custom Event**

   ```plaintext
   Path: Configure > Events > Create Event > Create
   ```

   - Click "Create" button
   - Name your event (use same name as in code)
   - Add event description

2. **Set Matching Conditions**

   ```plaintext
   Example for form_complete event:
   - Custom event name: form_complete
   - Matching conditions:
     - event_name = form_complete
     - success = true
   ```

3. **Configure Parameters**
   ```plaintext
   Path: Configure > Custom Definitions > Create Custom Dimensions
   ```
   - Click "Create Custom Dimensions"
   - Add each parameter:
     - Scope: Event
     - User-property: No
     - Description: Clear description of the parameter

### Step 3: Event Parameter Configuration

1. **Required Parameters** (Always include these)

   ```typescript
   {
     event_category: string;  // e.g., "Form", "Navigation"
     event_label: string;     // Specific identifier
     event_value?: number;    // Optional numeric value
   }
   ```

2. **Custom Parameters** (Based on event type)
   ```typescript
   // Example: Form Event
   {
     form_id: string;
     form_name: string;
     success: boolean;
   }
   ```

### Step 4: Set Up Event Tracking in GA4

1. **Standard Events**

   - Use predefined GA4 events when possible
   - Examples: page_view, scroll, click

2. **Custom Events**

   ```plaintext
   Path: Configure > Events > Create Event
   Fields:
   - Event name: [your_event_name]
   - Conditions: Add matching conditions
   - Parameter Configuration: Add custom parameters
   ```

3. **Event Parameters**
   ```plaintext
   Path: Configure > Custom Definitions
   Steps:
   1. Click "Create Custom Dimensions"
   2. Select scope (usually "Event")
   3. Enter parameter name
   4. Add description
   ```

### Step 5: Configure Event Conversions

1. **Mark Events as Conversions**

   ```plaintext
   Path: Configure > Events > Mark as Conversion
   ```

   - Find your event
   - Toggle "Mark as conversion"

2. **Set Up Goals**
   ```plaintext
   Common conversion events:
   - form_complete (success=true)
   - purchase
   - signup
   ```

### Step 6: Debug and Validate

1. **Enable Debug Mode**

   ```plaintext
   Methods:
   1. Use Google Analytics Debugger extension
   2. Add ?debug_mode=1 to your URL
   3. Use GA4 DebugView
   ```

2. **DebugView Testing**
   ```plaintext
   Path: Configure > DebugView
   Steps:
   1. Enable debug mode
   2. Trigger events on your site
   3. Watch real-time event stream
   4. Verify parameters
   ```

### Step 7: Create Reports

1. **Exploration Reports**

   ```plaintext
   Path: Explore > Create New Exploration
   Steps:
   1. Select report type
   2. Add dimensions and metrics
   3. Configure visualization
   ```

2. **Custom Report Configuration**
   ```plaintext
   Example report structure:
   - Dimensions: event_name, event_category
   - Metrics: event_count, users
   - Filters: specific event_names
   ```

### Example: Setting Up Form Submission Event

1. **In GA4 Interface**

   ```plaintext
   1. Create Event:
      Name: form_complete
      Conditions:
        - event_name equals form_complete
        - success equals true

   2. Create Custom Dimensions:
      - form_id (Event scope)
      - form_name (Event scope)
      - success (Event scope)

   3. Mark as Conversion:
      Toggle conversion for form_complete
   ```

2. **Verify Implementation**
   ```typescript
   // Test event in console
   analytics.trackEvent("form_complete", {
     event_category: "Form",
     event_label: "contact_form",
     form_id: "contact_form",
     success: true,
   });
   ```

### Common GA4 Event Properties

```typescript
interface GA4EventProperties {
  // Required Properties
  event_category: string; // General category
  event_label: string; // Specific identifier

  // Optional Properties
  event_value?: number; // Numeric value
  non_interaction?: boolean; // Whether event is user-initiated

  // Custom Properties
  [key: string]: any; // Additional parameters
}
```

### Best Practices

1. **Naming Conventions**

   ```plaintext
   - Use snake_case for event names
   - Keep names consistent between code and GA4
   - Use descriptive but concise names
   ```

2. **Parameter Usage**

   ```plaintext
   - Limit to 25 custom dimensions per property
   - Use semantic parameter names
   - Document all custom parameters
   ```

3. **Validation Checklist**
   - [ ] Event appears in DebugView
   - [ ] All parameters are received
   - [ ] Values are correctly formatted
   - [ ] Conversion tracking works
   - [ ] Reports show data correctly
