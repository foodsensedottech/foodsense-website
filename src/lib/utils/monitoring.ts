import type { NextWebVitalsMetric } from 'next/app';

interface WebVitalsReport {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType?: string;
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
};

// Add type for metric names
type MetricName = 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB';

// Get rating based on metric value
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  if (!Object.keys(THRESHOLDS).includes(name as MetricName)) return 'needs-improvement';
  
  const threshold = THRESHOLDS[name as MetricName];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// Format metric for reporting
function formatWebVital(metric: NextWebVitalsMetric): WebVitalsReport {
  return {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    navigationType: metric.navigationType,
  };
}

// Report to analytics
async function reportWebVital(metric: WebVitalsReport) {
  // You can send this to your analytics service
  // Example: Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'web_vital', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
}

// Export main function to be used in _app.tsx
export function reportWebVitals(metric: NextWebVitalsMetric) {
  const formattedMetric = formatWebVital(metric);
  reportWebVital(formattedMetric);
}

// SEO Score calculation
export async function calculateSEOScore(url: string): Promise<number> {
  try {
    // Add base URL if relative path
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    
    const response = await fetch(`/api/seo-check?url=${encodeURIComponent(fullUrl)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.score || 0;
  } catch (error) {
    console.error('Error calculating SEO score:', error);
    return 0;
  }
}

// Add to existing interfaces
interface SearchTermMetrics {
  term: string;
  impressions: number;
  clicks: number;
  position: number;
}

// Add new function
export async function trackSearchTerms(metrics: SearchTermMetrics) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Search Term Metrics:', metrics);
  }

  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search_term_tracking', {
      search_term: metrics.term,
      impressions: metrics.impressions,
      clicks: metrics.clicks,
      position: metrics.position,
    });
  }
} 