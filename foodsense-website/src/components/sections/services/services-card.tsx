"use client";

import React from "react";
import Image from "next/image";
import type { ServicesCardEntry } from "@/lib/contentful/types";
import { cn, ensureAbsoluteUrl } from "@/lib/utils";

interface ServicesCardProps {
  data: ServicesCardEntry;
}

export function ServicesCard({ data }: ServicesCardProps) {
  const { servicesTitle, servicesDescription, servicesThumbnail } = data.fields;
  const [isLoading, setIsLoading] = React.useState(true);

  if (!servicesThumbnail?.fields?.file?.url) {
    return (
      <div className="p-6 rounded-lg bg-white dark:bg-white/10 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-[0_0_30px_-5px] dark:hover:shadow-yellow-400/30 dark:hover:border-yellow-400/50 max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-white">
          {servicesTitle}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {servicesDescription}
        </p>
      </div>
    );
  }

  const imageUrl = ensureAbsoluteUrl(servicesThumbnail.fields.file.url);

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-white/10 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-[0_0_30px_-5px] dark:hover:shadow-yellow-400/30 dark:hover:border-yellow-400/50 max-w-sm w-full">
      <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={servicesThumbnail.fields.title || "Service thumbnail"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover",
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-white">
        {servicesTitle}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{servicesDescription}</p>
    </div>
  );
}
