"use client";

import { useEffect, useState } from "react";
import { analytics, analyticsFunctions } from "@/lib/analytics/tracking";
import { throttle } from "@/lib/utils";

interface ScrollDepthMetrics {
  percentage: number;
  pixels: number;
  timestamp: string;
}

export function useScrollTracking() {
  const [maxScroll, setMaxScroll] = useState<ScrollDepthMetrics>({
    percentage: 0,
    pixels: 0,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculateScrollDepth = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollPixels = Math.max(
        0,
        Math.min(scrollTop + windowHeight, documentHeight)
      );
      const scrollPercentage = Math.round(
        (scrollPixels / documentHeight) * 100
      );

      return {
        percentage: scrollPercentage,
        pixels: scrollPixels,
        timestamp: new Date().toISOString(),
      };
    };

    // Track scroll depth changes
    const handleScroll = throttle(() => {
      const metrics = calculateScrollDepth();

      // Only track if we've scrolled further than before
      if (metrics.percentage > maxScroll.percentage) {
        setMaxScroll(metrics);

        // Track every 25% increment
        if (metrics.percentage % 25 === 0) {
          analytics.trackEvent("scroll_depth", {
            event_category: "User Engagement",
            event_label: `Scrolled to ${metrics.percentage}%`,
            scroll_depth_percentage: metrics.percentage,
            scroll_depth_pixels: metrics.pixels,
          });
        }
      }
    }, 500);

    // Track when user reaches specific sections
    const observeSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              analytics.trackEvent("section_view", {
                event_category: "User Engagement",
                event_label: `Viewed ${sectionId}`,
                section_id: sectionId,
              });

              if (sectionId === "contact-section") {
                analyticsFunctions.trackScrollToContact();
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(section);
      return () => observer.disconnect();
    };

    // Set up section observers
    const sections = [
      "about-section",
      "services-section",
      "testimonials-section",
      "contact-section",
    ];
    const cleanupFns = sections.map(observeSection);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanupFns.forEach((cleanup) => cleanup?.());
    };
  }, [maxScroll]);

  return maxScroll;
}
