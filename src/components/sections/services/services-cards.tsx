"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { analytics } from "@/lib/analytics/tracking";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ServicesCardsProps {
  services: Service[];
}

export function ServicesCards({ services }: ServicesCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && services) {
      analytics.trackEvent("section_view", {
        event_category: "Section",
        event_label: "services",
        section_name: "services",
      });

      services.forEach((service) => {
        analytics.trackEvent("service_view", {
          event_category: "Service",
          event_label: service.title,
          service_id: service.id,
          service_name: service.title,
        });
      });
    }
  }, [isInView, services]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((service) => (
        <Card
          key={service.id}
          className="transition-all duration-300 hover:shadow-lg"
          onClick={() => {
            analytics.trackEvent("service_view", {
              event_category: "Service",
              event_label: `${service.title}_click`,
              service_id: service.id,
              service_name: service.title,
              interaction_type: "click",
            });
          }}
        >
          <CardHeader>
            {service.icon && <div className="mb-2">{service.icon}</div>}
            <CardTitle>{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{service.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
