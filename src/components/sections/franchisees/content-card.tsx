"use client";

import React from "react";
import type { FranchiseeCardEntry } from "@/lib/contentful/types";
import {
  ClipboardCheck,
  Layers,
  Percent,
  ShieldAlert,
  Star,
  Store,
  Wallet,
} from "lucide-react";

const ICONS = {
  Layers,
  Percent,
  ShieldAlert,
  ClipboardCheck,
  Store,
  Wallet,
  Star,
} as const;

interface ContentCardProps {
  data: FranchiseeCardEntry;
}

export function FranchiseeContentCard({ data }: ContentCardProps) {
  const fields = data.fields;
  const iconName = (fields.lucideIcon || "Star") as keyof typeof ICONS;
  const Icon = ICONS[iconName] || Star;

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
