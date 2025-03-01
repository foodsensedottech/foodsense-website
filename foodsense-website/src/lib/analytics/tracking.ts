export type EventNames =
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

export interface AnalyticsEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

// Type-safe event tracking
export function trackEvent(eventName: EventNames, params: AnalyticsEvent = {}) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, {
    ...params,
    timestamp: new Date().toISOString(),
    page_path: window.location.pathname,
  });

  // Also track in Microsoft Clarity if available
  if (window.clarity && typeof window.clarity === "function") {
    window.clarity("event", eventName, params);
  }
}

// Specific tracking functions
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

  trackFormComplete: (formId: string, success: boolean) => {
    trackEvent("form_complete", {
      event_category: "Form",
      event_label: formId,
      success,
    });
  },

  trackServiceView: (serviceName: string) => {
    trackEvent("service_view", {
      event_category: "Service",
      event_label: serviceName,
    });
  },

  trackTestimonialView: (testimonialId: string) => {
    trackEvent("testimonial_view", {
      event_category: "Testimonial",
      event_label: testimonialId,
    });
  },

  trackCTAClick: (ctaId: string, ctaText: string) => {
    trackEvent("cta_click", {
      event_category: "CTA",
      event_label: ctaId,
      cta_text: ctaText,
    });
  },

  trackExternalLink: (url: string, text: string) => {
    trackEvent("external_link_click", {
      event_category: "External Link",
      event_label: url,
      link_text: text,
    });
  },

  trackScrollToContact: () => {
    trackEvent("scroll_to_contact", {
      event_category: "User Engagement",
      event_label: "Scrolled to Contact Section",
    });
  },

  trackMenuInteraction: (menuItem: string) => {
    trackEvent("menu_interaction", {
      event_category: "Navigation",
      event_label: menuItem,
    });
  },

  // Custom conversion tracking
  trackConversion: (type: string, value?: number) => {
    trackEvent("conversion", {
      event_category: "Conversion",
      event_label: type,
      value,
    });
  },
};

// Declare global gtag and clarity functions
declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "set",
      eventName: string,
      eventParams?: any
    ) => void;
    clarity: (command: string, ...args: any[]) => void;
  }
}
