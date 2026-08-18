import type { LucideIcon, LucideProps } from "lucide-react";
import { Star } from "lucide-react";

// Import all icon-related exports
export * from "./common-icons";
export * from "./ui-icons";
export * from "./about-icons";
export * from "./types";

// Re-export the getIcon function with proper typing
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

export function getIcon(name: string | undefined): LucideIcon {
  if (!name) return Star;
  const exportName = toLucideExportName(name);

  try {
    const icons = require("lucide-react") as Record<string, unknown>;
    const icon = icons[exportName];
    if (typeof icon === "function") {
      return icon as LucideIcon;
    }
    return Star;
  } catch {
    return Star;
  }
}

// Export types
export type { LucideIcon, LucideProps };
