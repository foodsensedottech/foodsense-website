'use client';

import { useEffect } from 'react';
import { initScrollTracking } from '@/lib/analytics';

export function ScrollTrackingProvider() {
  useEffect(() => {
    initScrollTracking();
  }, []);

  return null;
} 