"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  imageUrl?: string;
  imageAlt: string;
}

export function HeroBackground({ imageUrl, imageAlt }: HeroBackgroundProps) {
  // Convert protocol-relative URL to HTTPS
  const absoluteImageUrl = imageUrl?.startsWith("//")
    ? `https:${imageUrl}`
    : imageUrl;

  if (!absoluteImageUrl) {
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
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>
    </div>
  );
}
