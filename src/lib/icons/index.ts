import {
  Computer,
  Rocket,
  Star,
  LineChart,
  ChefHat,
  TrendingUp,
  Users,
  Settings,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

// Define icon map with explicit typing
const iconMap = {
  Computer,
  Rocket,
  Star,
  LineChart,
  ChefHat,
  TrendingUp,
  Users,
  Settings,
} as const;

// Create a type for valid icon names
type IconName = keyof typeof iconMap;

// Export the getIcon function with proper typing
export function getIcon(name: string | undefined): LucideIcon {
  const cleanName = name?.replace("#", "").trim() || "";
  return (iconMap[cleanName as IconName] || Star) as LucideIcon;
}

// Export types and constants
export type { IconName, LucideProps };
export { iconMap };
