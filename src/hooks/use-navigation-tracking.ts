"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "@/lib/analytics/tracking";

export function useNavigationTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    analytics.trackPageView(pathname);

    // Track navigation event
    analytics.trackEvent("page_view", {
      event_category: "Navigation",
      event_label: pathname,
      search_params: searchParams
        ? Object.fromEntries(searchParams.entries())
        : {},
      timestamp: new Date().toISOString(),
    });
  }, [pathname, searchParams]);

  return {
    trackMenuClick: (menuItem: string) => {
      analytics.trackMenuInteraction(menuItem);
    },
    trackExternalLink: (url: string, text: string) => {
      analytics.trackExternalLink(url, text);
    },
  };
}
