'use client';

import React, { useEffect, useState } from 'react';
import { calculateSEOScore } from '@/lib/utils/monitoring';

interface SEOMetrics {
  url: string;
  score: number;
  lastChecked: string;
}

const MONITORED_PAGES = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/services', name: 'Services' },
  { path: '/blog', name: 'Blog' },
  { path: '/contact', name: 'Contact' },
];

export function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAllPages() {
      const baseUrl = window.location.origin;
      const results = await Promise.all(
        MONITORED_PAGES.map(async (page) => {
          const url = `${baseUrl}${page.path}`;
          const score = await calculateSEOScore(url);
          return {
            url: page.path,
            score,
            lastChecked: new Date().toISOString(),
          };
        })
      );
      setMetrics(results);
      setIsLoading(false);
    }

    checkAllPages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <p>Loading SEO metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((pageMetric) => (
          <div
            key={pageMetric.url}
            className="p-4 bg-white rounded-lg shadow"
          >
            <h3 className="font-semibold mb-2">
              {MONITORED_PAGES.find(p => p.path === pageMetric.url)?.name || pageMetric.url}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Score</span>
                <span className={`font-bold ${
                  pageMetric.score >= 80 ? 'text-green-600' :
                  pageMetric.score >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {pageMetric.score}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Path</span>
                <span className="text-sm">{pageMetric.url}</span>
              </div>
              <div className="text-xs text-gray-500">
                Last checked: {new Date(pageMetric.lastChecked).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Overall Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Average Score</p>
            <p className="text-2xl font-bold">
              {Math.round(
                metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length
              )}%
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Pages Monitored</p>
            <p className="text-2xl font-bold">{metrics.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 