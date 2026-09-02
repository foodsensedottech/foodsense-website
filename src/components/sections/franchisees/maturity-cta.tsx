"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MaturityCtaProps {
  heading: string;
  intro: string;
  ctaLabel: string;
  ctaHref?: string;
}

export function FranchiseeMaturityCta({
  heading,
  intro,
  ctaLabel,
  ctaHref = "/contact",
}: MaturityCtaProps) {
  return (
    <section id="tech-maturity" className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-[#253B59]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {heading}
        </motion.h2>
        <motion.p
          className="text-lg text-[#253B59]/75 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {intro}
        </motion.p>
        <Button asChild size="lg">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
