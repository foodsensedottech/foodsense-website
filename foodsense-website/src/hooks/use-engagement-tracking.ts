"use client";

import { useEffect, useState } from "react";
import { analytics, trackEvent } from "@/lib/analytics/tracking";

interface EngagementMetrics {
  sessionDuration: number;
  pageViews: number;
  scrollDepth: number;
}

export function useEngagementTracking() {
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    sessionDuration: 0,
    pageViews: 1,
    scrollDepth: 0,
  });

  useEffect(() => {
    let duration = 0;
    const interval = setInterval(() => {
      duration++;
      setMetrics((prev) => ({
        ...prev,
        sessionDuration: duration,
      }));

      // Track engagement every 5 minutes
      if (duration % 300 === 0) {
        trackEvent("user_engagement", {
          event_category: "User Engagement",
          event_label: "Session Duration",
          session_duration_seconds: duration,
          page_views: metrics.pageViews,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [metrics.pageViews]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const scrollPercentage = Math.round(
        (scrollTop / (scrollHeight - clientHeight)) * 100
      );

      setMetrics((prev) => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercentage),
      }));

      // Track scroll depth at certain thresholds
      if (scrollPercentage % 25 === 0) {
        trackEvent("scroll_depth", {
          event_category: "User Engagement",
          event_label: "Scroll Depth",
          scroll_depth_percentage: scrollPercentage,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return metrics;
}
