import type { LucideIcon } from "lucide-react";
import {
  Star,
  Computer,
  Rocket,
  LineChart,
  ChefHat,
  TrendingUp,
  Users,
  Settings,
} from "lucide-react";

// Define the exact icon names we use for about cards
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

export type IconName = keyof typeof ABOUT_ICONS;

export const getIcon = (name: IconName): LucideIcon => {
  return ABOUT_ICONS[name];
}; 