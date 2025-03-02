import {
  Sun,
  Moon,
  Laptop,
  Menu,
  X as Close,
  ChevronLeft,
  ChevronRight,
  Github,
  Twitter,
} from "lucide-react";
import type { IconMap } from "./types";

export const iconMap: IconMap = {
  sun: Sun,
  moon: Moon,
  laptop: Laptop,
  menu: Menu,
  close: Close,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  github: Github,
  twitter: Twitter,
};

export const ThemeIcons = {
  light: Sun,
  dark: Moon,
  system: Laptop,
};

export type ThemeIcon = keyof typeof ThemeIcons;
