"use client";

import React from "react";
import type { AboutCardFields } from "@/lib/contentful/types";
import { getCardIcon } from "@/lib/about-icons";
import { ClipboardCheck, LineChart, ListChecks, Star, Users, type LucideIcon } from "lucide-react";

type ContentfulEntry<T> = {
  sys: {
    id: string;
    [key: string]: any;
  };
  fields: T;
  [key: string]: any;
};

interface AboutCardProps {
  data: ContentfulEntry<AboutCardFields>;
}

function iconFromTitle(title: string | undefined): LucideIcon | null {
  switch (title) {
    case "Proven Results":
    case "Resultados comprobados":
      return LineChart;
    case "Vendor Assessment and Restaurant Tech Implementation":
    case "Evaluación de vendors e implementación de tecnología restaurantera":
      return ClipboardCheck;
    case "Project and Program Management":
    case "Gestión de proyectos y programas":
      return ListChecks;
    case "Intersection between Technology and Operations":
    case "Intersección entre tecnología y operaciones":
      return Users;
    default:
      return null;
  }
}

export function AboutCard({ data }: AboutCardProps) {
  const fields = data.fields;
  const Icon =
    getCardIcon(fields.lucideIcon) || iconFromTitle(fields.title) || Star;

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-white/10 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-[0_0_30px_-5px] dark:hover:shadow-yellow-400/30 dark:hover:border-yellow-400/50">
      <Icon className="w-8 h-8 mb-4 text-primary" aria-hidden="true" />
      <h3 className="text-xl font-semibold mb-2 text-secondary dark:text-white">
        {fields.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{fields.description}</p>
    </div>
  );
}
