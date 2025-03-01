// Google Analytics 4 Configuration

// Custom Events Configuration
export const customEvents = {
  // Form Events
  form_events: {
    form_start: {
      parameters: ["form_id", "event_category", "event_label"],
    },
    form_complete: {
      parameters: ["form_id", "success", "event_category", "event_label"],
    },
  },
  // Service Events
  service_events: {
    service_view: {
      parameters: [
        "service_id",
        "service_name",
        "event_category",
        "event_label",
      ],
    },
    section_view: {
      parameters: ["section_name", "event_category", "event_label"],
    },
  },
  // User Engagement Events
  engagement_events: {
    scroll_depth: {
      parameters: ["scroll_depth_percentage", "scroll_depth_pixels"],
    },
    user_engagement: {
      parameters: ["session_duration_seconds", "page_views"],
    },
    bounce: {
      parameters: ["time_on_page_seconds"],
    },
  },
  // Navigation Events
  navigation_events: {
    menu_interaction: {
      parameters: ["menu_item", "current_path", "target_path"],
    },
    page_view: {
      parameters: ["page_path", "page_title"],
    },
  },
  // CTA Events
  cta_events: {
    cta_click: {
      parameters: ["cta_text", "cta_location"],
    },
    external_link_click: {
      parameters: ["link_text", "url"],
    },
  },
};

// Conversion Events Configuration
export const conversionEvents = [
  {
    name: "form_complete",
    conditions: [{ parameter: "success", value: "true" }],
  },
  {
    name: "scroll_to_contact",
    conditions: [],
  },
  {
    name: "service_view",
    conditions: [],
  },
  {
    name: "cta_click",
    conditions: [],
  },
];

// Custom Dimensions Configuration
export const customDimensions = [
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
  {
    name: "cta_text",
    scope: "event",
    description: "Text content of the CTA button",
  },
  {
    name: "section_name",
    scope: "event",
    description: "Name of the section being viewed",
  },
  {
    name: "scroll_depth_percentage",
    scope: "event",
    description: "Percentage of page scrolled",
  },
  {
    name: "session_duration_seconds",
    scope: "event",
    description: "Duration of user session in seconds",
  },
];

// Custom Metrics Configuration
export const customMetrics = [
  {
    name: "scroll_depth_pixels",
    scope: "event",
    description: "Scroll depth in pixels",
    unit: "PIXELS",
  },
  {
    name: "time_on_page_seconds",
    scope: "event",
    description: "Time spent on page before bounce",
    unit: "SECONDS",
  },
  {
    name: "page_views",
    scope: "event",
    description: "Number of pages viewed in session",
    unit: "STANDARD",
  },
];
