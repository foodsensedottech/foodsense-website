"use client";

import * as React from "react";
import {
  Search,
  Menu,
  Twitter,
  AlertCircle,
  X,
  ChevronDown,
  Sun,
  Moon,
  Settings,
  Linkedin,
  Loader2,
  Check,
  Instagram,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

// Define the Icons object directly
export const Icons = {
  search: Search,
  menu: Menu,
  twitter: Twitter,
  alert: AlertCircle,
  x: X,
  chevronDown: ChevronDown,
  sun: Sun,
  moon: Moon,
  settings: Settings,
  linkedin: Linkedin,
  spinner: Loader2,
  check: Check,
  instagram: Instagram,
} as const;

export type IconName = keyof typeof Icons;

export interface IconProps extends Partial<LucideProps> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = Icons[name.toLowerCase() as IconName];

  if (!Component) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <Component {...props} />;
}
