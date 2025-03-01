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
} from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define icon map
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

// Create a type for valid icon names
type IconName = keyof typeof Icons;

interface IconButtonProps extends ButtonProps {
  icon: IconName;
  label: string;
}

export function IconButton({
  icon,
  label,
  className,
  ...props
}: IconButtonProps) {
  const IconComponent = Icons[icon];

  return (
    <Button className={cn("gap-2", className)} {...props}>
      <IconComponent className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </Button>
  );
}
