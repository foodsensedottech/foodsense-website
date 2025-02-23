import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { logger } from "./logger";
import type { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const zIndex = {
  background: 0,
  overlay: 10,
  content: 20,
  contentTop: 30,
  navigation: 50,
} as const;

export const semanticConfig = {
  landmarks: {
    header: "site-header",
    nav: "site-navigation",
    main: "main-content",
    footer: "site-footer",
  },
  sections: {
    hero: "hero-section",
    about: "about-section",
    services: "services-section",
    contact: "contact-section",
  },
  headingLevels: {
    siteName: 1,
    pageTitle: 1,
    sectionTitle: 2,
    subsectionTitle: 3,
    cardTitle: 3,
    listTitle: 4,
  },
} as const;

// Define strict types for logging
interface LogContext {
  component?: string;
  action?: string;
  severity?: "info" | "warn" | "error" | "critical";
  metadata?: Record<string, unknown>;
}

type LogLevel = "info" | "warn" | "error";

interface LogDetails extends LogContext {
  timestamp?: string;
}

interface Logger {
  info(message: string, details?: LogDetails): void;
  warn(message: string, details?: LogDetails): void;
  error(message: string | Error, details?: LogDetails): void;
  log(level: LogLevel, message: string, details?: LogDetails): void;
  debug(message: string, context?: LogContext): void;
}

export const logger: Logger = {
  info(message: string, details?: LogDetails) {
    this.log("info", message, details);
  },

  warn(message: string, details?: LogDetails) {
    const metadata = {
      timestamp: new Date().toISOString(),
      component: details?.component || "Unknown",
      ...details?.metadata,
    };

    if (process.env.NODE_ENV === "production") {
      // Send warning to logging service
      return;
    }
    console.warn(`[WARN] ${details?.component}: ${message}`, metadata);
  },

  error(message: string | Error, details?: LogDetails) {
    const errorMessage = message instanceof Error ? message.message : message;
    const errorMetadata = {
      timestamp: new Date().toISOString(),
      component: details?.component || "Unknown",
      action: details?.action || "unknown_action",
      ...details?.metadata,
    };

    if (process.env.NODE_ENV === "production") {
      // Integration with error tracking service
      return;
    }
    console.error(`[ERROR] ${details?.component}: ${errorMessage}`, {
      error: message,
      ...errorMetadata,
    });
  },

  log(level: LogLevel, message: string, details?: LogDetails) {
    const logData = {
      timestamp: new Date().toISOString(),
      component: details?.component || "Unknown",
      ...details,
    };

    if (process.env.NODE_ENV === "production") {
      return;
    }
    console[level](`[${level.toUpperCase()}] ${message}`, logData);
  },

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[DEBUG] ${context?.component || "App"}: ${message}`, {
        timestamp: new Date().toISOString(),
        ...context,
      });
    }
  },
};

export function formatPhoneNumber(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");

  // Format as (555) 555-4444
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
      6,
      10
    )}`;
  }
}

export function parsePhoneNumber(value: string): string {
  // Handle common phone number formats:
  // (555) 555-1234
  // 555-555-1234
  // 5555551234
  // +1 555 555 1234
  // 1-555-555-1234
  return value
    .replace(/\+1[\s-]?/, "") // Remove +1 prefix
    .replace(/^1[\s-]?/, "") // Remove leading 1
    .replace(/[^\d]/g, ""); // Remove all non-digits
}

export type ErrorSeverity = "info" | "warn" | "error" | "critical";

interface ErrorContext {
  component?: string;
  action?: string;
  [key: string]: unknown;
}

interface ErrorDetails {
  message: string;
  severity?: ErrorSeverity;
  context?: ErrorContext;
}

// Export directly as a const
export const errorHandler = {
  handleError({ message, severity = "error", context = {} }: ErrorDetails) {
    logger.error(message, {
      severity,
      component: context.component || "Unknown",
      action: context.action || "unknown_action",
      metadata: context,
    });
  },

  monitorAsync: async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      errorHandler.handleError({
        message: error instanceof Error ? error.message : "Unknown error",
        severity: "error",
        context: {
          component: "AsyncMonitor",
          action: "execute",
        },
      });
      throw error;
    }
  },
};

// Export a single function for simpler use cases
export const handleError = errorHandler.handleError;

interface PageMetadata {
  title: string;
  description: string;
  path?: string;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
}: PageMetadata): Metadata {
  const url = process.env.NEXT_PUBLIC_BASE_URL || "https://foodsense.tech";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${url}${path}`,
      siteName: "FoodSense",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
