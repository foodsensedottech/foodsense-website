'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function NotFoundMessage() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  return (
    <p className="text-lg text-gray-600 mb-8">
      {from 
        ? `The page "${from}" could not be found.`
        : "The page you're looking for doesn't exist."}
    </p>
  );
}

export function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Suspense fallback={<p className="text-lg text-gray-600 mb-8">Loading...</p>}>
        <NotFoundMessage />
      </Suspense>
      <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
        Return Home
      </Link>
    </div>
  );
} 