"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { smoothScrollToSection } from "@/lib/utils";

interface HeroContentProps {
  title: string;
  subtitle: string;
}

export function HeroContent({ title, subtitle }: HeroContentProps) {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollToSection("contact-section");
  };

  return (
    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link href="/#contact-section" onClick={handleContactClick}>
          <Button
            size="lg"
            className="bg-yellow-400 text-[#1e3a5f] hover:bg-yellow-500 dark:bg-yellow-400 dark:text-[#1e3a5f] dark:hover:bg-yellow-500"
          >
            Unlock Growth Now 🚀
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
