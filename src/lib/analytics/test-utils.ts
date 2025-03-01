export function verifyAnalyticsSetup(): {
  isGALoaded: boolean;
  isClarityLoaded: boolean;
  errors: string[];
} {
  const result = {
    isGALoaded: false,
    isClarityLoaded: false,
    errors: [] as string[],
  };

  // Only run in browser environment
  if (typeof window === "undefined") {
    result.errors.push("Cannot verify analytics in server-side environment");
    return result;
  }

  // Check Google Analytics
  if (typeof window.gtag === "function") {
    result.isGALoaded = true;
  } else {
    result.errors.push("Google Analytics (gtag) not loaded properly");
  }

  // Check Microsoft Clarity
  if (typeof window.clarity === "function") {
    result.isClarityLoaded = true;
  } else {
    result.errors.push("Microsoft Clarity not loaded properly");
  }

  // Verify environment variables
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    result.errors.push("GA_MEASUREMENT_ID not configured");
  }
  if (!process.env.NEXT_PUBLIC_CLARITY_ID) {
    result.errors.push("CLARITY_ID not configured");
  }

  return result;
}

export function logAnalyticsEvent(
  eventName: string,
  params?: Record<string, any>
): void {
  console.group(`Analytics Event: ${eventName}`);
  console.log("Parameters:", params);
  console.log("Page Path:", window.location.pathname);
  console.log("Timestamp:", new Date().toISOString());
  console.groupEnd();
}
