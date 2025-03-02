import {
  Users,
  Target,
  Heart,
  Sparkles,
  Lightbulb,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AboutIcon {
  icon: LucideIcon;
  label: string;
  description: string;
}

export const aboutIcons: AboutIcon[] = [
  {
    icon: Users,
    label: "Team",
    description: "Our dedicated team of experts",
  },
  {
    icon: Target,
    label: "Mission",
    description: "Our core mission and values",
  },
  {
    icon: Heart,
    label: "Passion",
    description: "What drives us forward",
  },
  {
    icon: Sparkles,
    label: "Innovation",
    description: "Leading with innovation",
  },
  {
    icon: Lightbulb,
    label: "Solutions",
    description: "Smart solutions for your needs",
  },
  {
    icon: Rocket,
    label: "Growth",
    description: "Growing together with our clients",
  },
];
