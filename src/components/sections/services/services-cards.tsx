"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { analytics } from "@/lib/analytics/tracking";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ServicesCardEntry } from "@/lib/contentful/types";
import { cn, ensureAbsoluteUrl } from "@/lib/utils";

interface ServicesCardsProps {
  data: ServicesCardEntry[];
}

export function ServicesCards({ data }: ServicesCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && data) {
      analytics.trackEvent("section_view", {
        event_category: "Section",
        event_label: "services",
        section_name: "services",
      });
    }
  }, [isInView, data]);

  if (!data) return null;

  return (
    <div ref={ref} className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((service) => {
          const imageUrl = service.fields.servicesThumbnail?.fields?.file?.url;

          return (
            <Card
              key={service.sys.id}
              className="rounded-lg bg-white dark:bg-white/10 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0"
              onClick={() => {
                analytics.trackEvent("service_click", {
                  event_category: "Service",
                  event_label: service.fields.servicesTitle,
                  service_id: service.sys.id,
                  service_name: service.fields.servicesTitle,
                });
              }}
            >
              <CardHeader className="space-y-4">
                {imageUrl && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={ensureAbsoluteUrl(imageUrl)}
                      alt={
                        service.fields.servicesThumbnail?.fields?.title ||
                        service.fields.servicesTitle
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={true}
                    />
                  </div>
                )}
                <CardTitle className="text-xl">
                  {service.fields.servicesTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.fields.servicesDescription}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
