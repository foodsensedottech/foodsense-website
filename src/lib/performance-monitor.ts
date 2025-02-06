export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Monitor Core Web Vitals
  const vitals = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Report to analytics
      console.log(`[Performance] ${entry.name}: ${entry.value}`);
    });
  });

  vitals.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
}; 