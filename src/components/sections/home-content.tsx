"use client";

import { motion } from "framer-motion";

export function HomeContent() {
  return (
    <div className="container mx-auto py-10">
      <motion.section 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to FoodSense
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          We help you grow your restaurant.
        </motion.p>
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a 
            href="/contact" 
            className="bg-yellow-400 text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Get Started
          </a>
          <a 
            href="/about" 
            className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400/10 transition-colors"
          >
            Learn More
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
} 