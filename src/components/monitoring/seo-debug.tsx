'use client';

import React from 'react';
import type { SEOEntry } from '@/types/contentful/seo';
import type { SEOResponse } from '@/app/api/seo/route';

const PAGES = ['home', 'about', 'services', 'contact'] as const;
type PageId = typeof PAGES[number];

interface SEOStatus {
  metatitle: boolean;
  metadescription: boolean;
  keywords: boolean;
  ogImage: boolean;
  structuredData: boolean;
}

export function SEODebug() {
  const [seoData, setSeoData] = React.useState<Record<PageId, SEOEntry | null>>({} as Record<PageId, SEOEntry | null>);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchAllSEO() {
      const results = await Promise.all(
        PAGES.map(async (pageId) => {
          const res = await fetch(`/api/seo?pageId=${pageId}`);
          const response: SEOResponse = await res.json();
          return [pageId, response.data];
        })
      );

      setSeoData(Object.fromEntries(results));
      setLoading(false);
    }

    fetchAllSEO();
  }, []);

  if (loading) return <div>Loading SEO data...</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">SEO Implementation Status</h2>
      <div className="grid gap-4">
        {PAGES.map((pageId) => {
          const data = seoData[pageId]?.fields;
          const status: SEOStatus = {
            metatitle: Boolean(data?.metatitle),
            metadescription: Boolean(data?.metadescription),
            keywords: Boolean(data?.keywords),
            ogImage: Boolean(data?.ogImage),
            structuredData: Boolean(data?.structuredData),
          };

          return (
            <div key={pageId} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2 capitalize">{pageId} Page</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(status).map(([key, implemented]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-600 capitalize">{key}</span>
                    <span className={implemented ? "text-green-600" : "text-red-600"}>
                      {implemented ? "✓" : "✗"}
                    </span>
                  </div>
                ))}
              </div>
              {data && (
                <details className="mt-2">
                  <summary className="text-sm text-gray-500 cursor-pointer">
                    View Details
                  </summary>
                  <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 