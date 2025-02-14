'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function CallToAction() {
  const router = useRouter();

  return (
    <div className="bg-primary-50 p-8 rounded-lg text-center">
      <h3 className="text-2xl font-semibold mb-4">
        Ready to Optimize Your Restaurant?
      </h3>
      <p className="text-gray-600 mb-6">
        Get started with FoodSense today and transform your restaurant operations.
      </p>
      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => router.push('/contact')}
          className="bg-primary hover:bg-primary/90"
        >
          Contact Us
        </Button>
        <Button 
          onClick={() => router.push('/services')}
          variant="outline"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
} 