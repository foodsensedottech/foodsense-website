import type { LucideIcon, LucideProps } from "lucide-react";
import { Star } from "lucide-react";

// Import all icon-related exports
export * from "./common-icons";
export * from "./ui-icons";
export * from "./about-icons";
export * from "./types";

// Re-export the getIcon function with proper typing
export function getIcon(name: string | undefined): LucideIcon {
  if (!name) return Star;
  const cleanName = name.replace("#", "").trim();

  // Import the icon dynamically from lucide-react
  try {
    const icon = require(`lucide-react`)[cleanName];
    return icon || Star;
  } catch {
    return Star;
  }
}

// Export types
export type { LucideIcon, LucideProps };
