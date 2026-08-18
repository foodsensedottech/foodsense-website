"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";
import { getFranchiseeCopy } from "@/lib/franchisees/copy";

interface MaturityCtaProps {
  locale?: FranchiseeLocale;
}

export function FranchiseeMaturityCta({ locale = "en" }: MaturityCtaProps) {
  const copy = getFranchiseeCopy(locale);

  return (
    <section id="tech-maturity" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-secondary dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {copy.assessmentHeading}
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {copy.assessmentIntro}
        </motion.p>
        <Button asChild size="lg">
          <Link href="/contact">{copy.heroPrimaryCta}</Link>
        </Button>
      </div>
    </section>
  );
}
