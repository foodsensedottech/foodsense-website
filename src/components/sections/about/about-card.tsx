"use client";

import React from "react";
import type { AboutCardFields } from "@/lib/contentful/types";
import { LucideIcons } from "@/lib/icons";
import { Computer, LineChart, Rocket, Star, type LucideIcon } from "lucide-react";

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

function toLucideExportName(name: string): string {
  const cleaned = name.replace("#", "").trim();
  if (!cleaned) return "";
  if (/[-_\s]/.test(cleaned)) {
    return cleaned
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function iconFromCms(name: string | undefined): LucideIcon | null {
  if (!name) return null;
  const exportName = toLucideExportName(name);
  const icon = (LucideIcons as Record<string, unknown>)[exportName];
  return typeof icon === "function" ? (icon as LucideIcon) : null;
}

function iconFromTitle(title: string | undefined): LucideIcon | null {
  switch (title) {
    case "Proven Results":
      return LineChart;
    case "Optimization and Profits":
      return Rocket;
    case "Customer Reviews & Sentiment":
      return Star;
    case "Expertise in Restaurant Tech":
      return Computer;
    default:
      return null;
  }
}

export function AboutCard({ data }: AboutCardProps) {
  const fields = data.fields;
  const Icon =
    iconFromCms(fields.lucideIcon) || iconFromTitle(fields.title) || Star;

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
