"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export function Logo({ variant = "header", className }: LogoProps) {
  const [isLoading, setIsLoading] = useState(true);

  const src = variant === "footer" 
    ? "/images/logo/footer-logo.png"
    : "/images/logo/logo.png";

  const dimensions = variant === "footer"
    ? { height: 194, width: 194 }
    : { height: 64, width: 155 };

  return (
    <div 
      className={className}
      style={{
        position: 'relative',
        height: `${dimensions.height}px`,
        width: `${dimensions.width}px`,
      }}
    >
      <Image
        src={src}
        alt="FoodSense Logo"
        fill
        sizes={`${dimensions.width}px`}
        className={cn(
          "object-contain",
          "transition-opacity duration-200",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        priority={true}
        quality={90}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
} 