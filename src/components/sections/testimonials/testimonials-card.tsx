"use client";

import React from "react";
import Image from "next/image";
import type { TestimonialsCardEntry } from "@/lib/contentful/types";
import { Star } from "lucide-react";
import { cn, ensureAbsoluteUrl } from "@/lib/utils";

interface TestimonialsCardProps {
  data: TestimonialsCardEntry;
}

export function TestimonialsCard({ data }: TestimonialsCardProps) {
  const {
    testimonialQuote,
    rating,
    businessOwner,
    businessName,
    businessImage,
  } = data.fields;
  const [isLoading, setIsLoading] = React.useState(true);

  const imageUrl = businessImage?.fields?.file?.url
    ? ensureAbsoluteUrl(businessImage.fields.file.url)
    : null;

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-white/10 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-[0_0_30px_-5px] dark:hover:shadow-yellow-400/30 dark:hover:border-yellow-400/50 max-w-sm w-full">
      {/* Rating Stars */}
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={cn(
              "w-5 h-5",
              index < (rating || 0)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            )}
          />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic mb-4">
        "{testimonialQuote}"
      </p>
      <div className="flex items-center mt-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={businessImage?.fields?.title || `${businessName} logo`}
              fill
              sizes="96px"
              className={cn(
                "object-cover",
                "transition-opacity duration-300",
                isLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsLoading(false)}
              priority={true}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full" />
          )}
        </div>
        <div>
          <p className="font-semibold text-secondary dark:text-white">
            {businessOwner}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {businessName}
          </p>
        </div>
      </div>
    </div>
  );
}
