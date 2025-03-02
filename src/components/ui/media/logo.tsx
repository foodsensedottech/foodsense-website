"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export function Logo({ variant = "header", className }: LogoProps) {
  // Use the appropriate logo based on variant
  const logoSrc =
    variant === "footer" ? "/logo/footer-logo.png" : "/logo/logo.png";

  // Set dimensions based on variant while respecting the original dimensions
  const dimensions =
    variant === "footer"
      ? { height: 194, width: 194 } // Contain the footer logo within this area
      : { height: 64, width: 155 }; // Contain the header logo within this area

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{
        height: `${dimensions.height}px`,
        width: `${dimensions.width}px`,
      }}
    >
      <Image
        src={logoSrc}
        alt="FoodSense Logo"
        fill
        sizes={`${dimensions.width}px`}
        priority={variant === "header"} // Priority load for header logo
        className="object-contain" // This ensures the logo maintains its aspect ratio
      />
    </div>
  );
}
