'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Services page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Something went wrong loading the services page.</p>
          <button
            onClick={reset}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Try again
          </button>
        </CardContent>
      </Card>
    </div>
  );
} 