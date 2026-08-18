"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { FranchiseeTitleEntry } from "@/lib/contentful/types";

interface SectionHeadingProps {
  data: FranchiseeTitleEntry;
}

export function FranchiseeSectionHeading({ data }: SectionHeadingProps) {
  if (!data?.fields) {
    return null;
  }

  const { heading, subheading } = data.fields;

  return (
    <div className="container mx-auto px-4 text-center mb-12">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4 text-secondary dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {heading}
      </motion.h2>
      {subheading ? (
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subheading}
        </motion.p>
      ) : null}
    </div>
  );
}
