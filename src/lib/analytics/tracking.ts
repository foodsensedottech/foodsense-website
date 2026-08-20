import { type } from "os";

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
  | "conversion";

interface AnalyticsEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

// Type definitions for analytics functions
interface Analytics {
  trackEvent: (eventName: string, eventData?: AnalyticsEvent) => void;
  trackPageView: (path: string) => void;
  trackMenuInteraction: (menuItem: string) => void;
  trackCTAClick: (buttonId: string, buttonText: string) => void;
}

// Analytics implementation
export const analytics: Analytics = {
  trackEvent: (eventName: string, eventData?: AnalyticsEvent) => {
    try {
      if (typeof window !== "undefined") {
        // Google Analytics
        if (typeof window.gtag === "function") {
          window.gtag("event", eventName, eventData);
        }
        // Microsoft Clarity
        if (typeof window.clarity === "function") {
          window.clarity("event", eventName, eventData);
        }
      }
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  },

  trackPageView: (path: string) => {
    try {
      if (typeof window !== "undefined") {
        // Google Analytics
        if (typeof window.gtag === "function") {
          window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
            page_path: path,
          });
        }
        // Microsoft Clarity
        if (typeof window.clarity === "function") {
          window.clarity("pageView", { path });
        }
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  },

  trackMenuInteraction: (menuItem: string) => {
    analytics.trackEvent("menu_click", {
      event_category: "Navigation",
      event_label: menuItem,
      menu_item: menuItem,
    });
  },

  trackCTAClick: (buttonId: string, buttonText: string) => {
    analytics.trackEvent("cta_click", {
      event_category: "CTA",
      event_label: buttonText,
      button_id: buttonId,
      button_text: buttonText,
    });
  },
};

// Type definitions for window object
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer?: any[];
    clarity: {
      (command: string, ...args: any[]): void;
      q?: any[];
    };
  }
}

// Specific tracking functions
export const analyticsFunctions = {
  trackFormStart: (formId: string) => {
    analytics.trackEvent("form_start", {
      event_category: "Form",
      event_label: formId,
    });
  },

  trackFormComplete: (formId: string, success: boolean) => {
    analytics.trackEvent("form_complete", {
      event_category: "Form",
      event_label: formId,
      success,
    });
  },

  trackServiceView: (serviceName: string) => {
    analytics.trackEvent("service_view", {
      event_category: "Service",
      event_label: serviceName,
    });
  },

  trackTestimonialView: (testimonialId: string) => {
    analytics.trackEvent("testimonial_view", {
      event_category: "Testimonial",
      event_label: testimonialId,
    });
  },

  trackExternalLink: (url: string, text: string) => {
    analytics.trackEvent("external_link_click", {
      event_category: "External Link",
      event_label: url,
      link_text: text,
    });
  },

  trackScrollToContact: () => {
    analytics.trackEvent("scroll_to_contact", {
      event_category: "User Engagement",
      event_label: "Scrolled to Contact Section",
    });
  },
};
