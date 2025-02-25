"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { AboutTitleFields } from "@/lib/contentful/types";

// Define the ContentfulEntry type here to match the one in client.ts
type ContentfulEntry<T> = {
  sys: {
    id: string;
    [key: string]: any;
  };
  fields: T;
  [key: string]: any;
};

interface AboutHeadingProps {
  data: ContentfulEntry<AboutTitleFields>;
}

export function AboutHeading({ data }: AboutHeadingProps) {
  console.log("About Heading Data:", JSON.stringify(data, null, 2));

  if (!data?.fields) {
    return null;
  }

  console.log("About Heading Fields:", JSON.stringify(data.fields, null, 2));

  const { heading, subheading } = data.fields;

  return (
    <div className="container mx-auto px-4 text-center mb-12">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {heading}
      </motion.h2>
      {subheading && (
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
}
