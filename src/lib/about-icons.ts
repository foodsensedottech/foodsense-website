import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ChefHat,
  ClipboardCheck,
  Computer,
  Globe,
  Layers,
  LineChart,
  Percent,
  Rocket,
  Settings,
  ShieldAlert,
  Star,
  Store,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

export const ABOUT_ICONS = {
  Star,
  Computer,
  Rocket,
  LineChart,
  ChefHat,
  TrendingUp,
  Users,
  Settings,
} as const;

export const CARD_ICONS = {
  ...ABOUT_ICONS,
  Layers,
  Percent,
  ShieldAlert,
  ClipboardCheck,
  Store,
  Wallet,
  Globe,
  BarChart3,
} as const;

export type AboutIconName = keyof typeof ABOUT_ICONS;
export type CardIconName = keyof typeof CARD_ICONS;

export const getAboutIcon = (name: AboutIconName): LucideIcon => {
  return ABOUT_ICONS[name];
};

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

export function getCardIcon(name: string | undefined): LucideIcon | null {
  if (!name) return null;
  const exportName = toLucideExportName(name) as CardIconName;
  return CARD_ICONS[exportName] ?? null;
}
