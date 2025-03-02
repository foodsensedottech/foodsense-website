import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility for handling errors
export function handleError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Utility for smooth scrolling to sections
export function smoothScrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// Utility for ensuring absolute URLs
export function ensureAbsoluteUrl(url: string): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `https:${url}`;
}

// Semantic configuration for sections
export const semanticConfig = {
  sections: {
    hero: "hero-section",
    about: "about-section",
    services: "services-section",
    testimonials: "testimonials-section",
    contact: "contact-section",
  },
  about: {
    heading: "About Us",
    description: "Learn more about our mission and values",
  },
  services: {
    heading: "Our Services",
    description: "Explore our range of services",
  },
  testimonials: {
    heading: "Testimonials",
    description: "What our clients say about us",
  },
  contact: {
    heading: "Contact Us",
    description: "Get in touch with our team",
  },
};

// Z-index utility
export const zIndex = {
  modal: 50,
  overlay: 40,
  dropdown: 30,
  header: 20,
  content: 10,
  contentTop: 15,
  base: 1,
};

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      inThrottle = true;
      lastResult = func.apply(this, args);
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function formatPhoneNumber(value: string): string {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, "");

  // Format the number as (XXX) XXX-XXXX
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  } else {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
      6,
      10
    )}`;
  }
}
