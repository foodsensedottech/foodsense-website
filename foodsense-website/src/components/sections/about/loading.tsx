"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cardStyles } from "@/styles/card-styles";

export function AboutLoading() {
  return (
    <section className="py-16 bg-white dark:bg-secondary-dark/95 transition-colors">
      <div className="container mx-auto px-4">
        {/* Header Loading */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>

        {/* Cards Loading */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full justify-items-center">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`${cardStyles.base} w-full max-w-sm p-6 animate-pulse`}
              >
                {/* Icon Loading */}
                <Skeleton className="h-8 w-8 rounded-full mb-4" />

                {/* Title Loading */}
                <Skeleton className="h-6 w-3/4 mb-4" />

                {/* Description Loading */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 