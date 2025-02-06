"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BlogProps {
  className?: string;
}

export function Blog({ className }: BlogProps) {
  return (
    <section id="blog" className={cn("py-20", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">
            Latest Updates
          </h2>
          <p className="text-secondary/80 dark:text-white/80">
            Stay updated with our latest news and insights about the restaurant industry
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {/* LinkedIn Post Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              "bg-white dark:bg-dark/80 rounded-lg shadow-lg",
              "p-6 border border-gray-200 dark:border-gray-800"
            )}
          >
            <div className="relative overflow-hidden pb-[400px] w-full">
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:YOUR_POST_ID"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
                title="LinkedIn Post"
              ></iframe>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.linkedin.com/company/foodsensedottech/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2",
              "text-secondary dark:text-white",
              "hover:text-primary transition-colors"
            )}
          >
            Follow us on LinkedIn
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 