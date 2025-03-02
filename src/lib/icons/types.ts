import type { LucideIcon } from "lucide-react";

export type IconName =
  | "github"
  | "twitter"
  | "menu"
  | "close"
  | "chevronLeft"
  | "chevronRight"
  | "sun"
  | "moon"
  | "laptop";

export type IconMap = Record<IconName, LucideIcon>;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export type { LucideProps } from "lucide-react";
