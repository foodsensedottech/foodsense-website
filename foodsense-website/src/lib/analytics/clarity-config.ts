import type {
  ClarityConfig,
  ClarityTagConfig,
  ClarityTags,
} from "@/types/clarity";

// Microsoft Clarity Configuration

// Custom Tags Configuration
export const customTags: ClarityTags = {
  // Form Interaction Tags
  form_tags: {
    form_start: {
      selector: "form",
      event: "focus",
      attributes: ["id", "name", "data-form-type"],
    } as ClarityTagConfig,
    form_complete: {
      selector: "form",
      event: "submit",
      attributes: ["id", "name", "data-form-type", "data-success"],
    } as ClarityTagConfig,
  },
  // Service Interaction Tags
  service_tags: {
    service_view: {
      selector: ".service-card",
      event: "visibility",
      attributes: ["data-service-id", "data-service-name"],
    } as ClarityTagConfig,
    service_section_view: {
      selector: "#services-section",
      event: "visibility",
      attributes: ["data-section-name"],
    } as ClarityTagConfig,
  },
  // Scroll Tracking Tags
  scroll_tags: {
    scroll_depth: {
      selector: "body",
      event: "scroll",
      attributes: ["data-scroll-percentage", "data-scroll-depth-pixels"],
      breakpoints: [25, 50, 75, 100],
    } as ClarityTagConfig,
    scroll_to_contact: {
      selector: "#contact-section",
      event: "view",
    } as ClarityTagConfig,
  },
  // CTA Interaction Tags
  cta_tags: {
    cta_click: {
      selector: ".cta-button",
      event: "click",
      attributes: ["data-cta-id", "data-cta-text", "data-cta-location"],
    } as ClarityTagConfig,
    external_link_click: {
      selector: 'a[target="_blank"]',
      event: "click",
      attributes: ["href", "data-link-type"],
    } as ClarityTagConfig,
  },
};

// Heatmap Configuration
export const heatmapConfig = {
  click_tracking: {
    enabled: true,
    elements: [
      "button",
      "a",
      ".service-card",
      ".cta-button",
      "form input",
      "form select",
    ],
  },
  scroll_tracking: {
    enabled: true,
    breakpoints: [25, 50, 75, 100],
  },
};

// Session Recording Configuration
export const sessionConfig = {
  // Privacy settings
  mask_all_numbers: true,
  mask_all_emails: true,
  block_class: "clarity-block",
  ignore_class: "clarity-ignore",
  // Recording settings
  record_rage_clicks: true,
  record_scroll_depth: true,
  record_page_mutations: true,
  // Sampling rate (100%)
  sampling_rate: 100,
};

// Custom Metrics Configuration
export const customMetrics = {
  engagement_score: {
    name: "Engagement Score",
    calculation: "weightedSum",
    factors: [
      { metric: "time_on_page", weight: 0.3 },
      { metric: "scroll_depth", weight: 0.2 },
      { metric: "click_count", weight: 0.2 },
      { metric: "form_interaction", weight: 0.3 },
    ],
  },
  conversion_rate: {
    name: "Conversion Rate",
    calculation: "percentage",
    numerator: "form_complete",
    denominator: "page_view",
  },
  bounce_detection: {
    name: "Bounce Detection",
    threshold: 30, // seconds
    triggers: ["page_exit", "tab_close", "inactivity"],
  },
};

export const clarityConfig: ClarityConfig = {
  customTags,
  heatmapConfig,
  privacySettings: {
    mask_all_numbers: true,
    mask_all_emails: true,
    block_class: "clarity-block",
    ignore_class: "clarity-ignore",
  },
  sessionConfig: {
    capture_rate: 100,
    mask_text_content: true,
    record_canvas: false,
    record_network: false,
    record_scroll: true,
    record_rage_clicks: true,
    record_mutations: true,
  },
};

// Initialize Clarity with Config
export function initializeClarity() {
  if (typeof window !== "undefined" && window.clarity) {
    // Set custom tags
    Object.entries(clarityConfig.customTags).forEach(([, tags]) => {
      Object.entries(tags as Record<string, ClarityTagConfig>).forEach(
        ([name, config]) => {
          window.clarity("set", name, config);
        }
      );
    });

    // Configure heatmap settings
    window.clarity("set", "heatmap", clarityConfig.heatmapConfig);

    // Set privacy settings
    window.clarity("set", "privacy", clarityConfig.privacySettings);

    // Configure session recording
    window.clarity("set", "recording", clarityConfig.sessionConfig);
  }
}
