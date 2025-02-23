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

const Icons = {
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

type IconName = keyof typeof Icons;

interface IconProps extends Partial<LucideProps> {
  name: IconName;
}

function Icon({ name, ...props }: IconProps) {
  const Component = Icons[name.toLowerCase() as IconName];

  if (!Component) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <Component {...props} />;
}

export { Icon, Icons };
export type { IconName, IconProps };
