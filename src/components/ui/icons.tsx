import {
  Computer,
  Rocket,
  Star,
  LineChart,
  ChefHat,
  TrendingUp,
  Users,
  Settings,
  type LucideProps,
  type LucideIcon,
} from "lucide-react";

// Define available icons
export const ABOUT_ICONS = {
  Computer,
  Rocket,
  Star,
  LineChart,
  ChefHat,
  TrendingUp,
  Users,
  Settings,
} as const;

export type IconName =
  | "Computer"
  | "Rocket"
  | "Star"
  | "LineChart"
  | "ChefHat"
  | "TrendingUp"
  | "Users"
  | "Settings";

// Get icon component by name
export function getIcon(name: IconName): LucideIcon {
  return ABOUT_ICONS[name];
}

// Legacy Icon component
export function Icon({ name, ...props }: LucideProps & { name: IconName }) {
  switch (name) {
    case "Computer":
      return <Computer {...props} />;
    case "Rocket":
      return <Rocket {...props} />;
    case "Star":
      return <Star {...props} />;
    case "LineChart":
      return <LineChart {...props} />;
    case "ChefHat":
      return <ChefHat {...props} />;
    case "TrendingUp":
      return <TrendingUp {...props} />;
    case "Users":
      return <Users {...props} />;
    case "Settings":
      return <Settings {...props} />;
    default:
      return <Star {...props} />;
  }
}
