"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn, ensureAbsoluteUrl } from "@/lib/utils";

interface HeroBackgroundProps {
  imageUrl?: string;
  imageAlt: string;
}

export function HeroBackground({ imageUrl, imageAlt }: HeroBackgroundProps) {
  // Debug logging
  console.log("HeroBackground Props:", { imageUrl, imageAlt });

  // Ensure we have an absolute URL with HTTPS
  const absoluteImageUrl = imageUrl ? ensureAbsoluteUrl(imageUrl) : undefined;
  console.log("Processed Image URL:", absoluteImageUrl);

  if (!absoluteImageUrl) {
    console.warn("No image URL available, showing fallback");
    return (
      <div className="absolute inset-0 z-0 bg-gray-900">
        <div className="absolute inset-0 bg-black/50" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={absoluteImageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>
    </div>
  );
}
