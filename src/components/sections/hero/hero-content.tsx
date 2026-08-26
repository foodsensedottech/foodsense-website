"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { smoothScrollToSection } from "@/lib/utils";

interface HeroContentProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function HeroContent({
  title,
  subtitle,
  eyebrow,
  ctaLabel,
  ctaHref,
}: HeroContentProps) {
  const href = ctaHref?.trim() || "#contact-section";
  const isHash = href.startsWith("#");

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHash) return;
    e.preventDefault();
    smoothScrollToSection(href.replace("#", ""));
  };

  return (
    <div className="relative z-10 container mx-auto px-4 text-center">
      {eyebrow ? (
        <motion.p
          className="text-yellow-400 font-semibold tracking-wide uppercase text-sm mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      {subtitle ? (
        <motion.p
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
      {ctaLabel ? (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-yellow-400 text-[#1e3a5f] hover:bg-yellow-500 dark:bg-yellow-400 dark:text-[#1e3a5f] dark:hover:bg-yellow-500"
          >
            <Link href={href} onClick={handleContactClick}>
              {ctaLabel}
            </Link>
          </Button>
        </motion.div>
      ) : null}
    </div>
  );
}
