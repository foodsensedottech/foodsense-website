"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="h-[calc(100vh-4rem)] max-h-[1080px] min-h-[700px] relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg.jpg"
          alt="Restaurant interior"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={95}
        />
        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-secondary-500/40" />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/90 via-secondary-500/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary-500/40" />
      </div>

      <div className="container mx-auto px-4 h-full flex items-center justify-start">
        <div className="max-w-4xl space-y-4">
          {/* Main Heading with Split Animation */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.165, 0.84, 0.44, 1]
              }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1]"
            >
              Elevate Your
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.1,
                ease: [0.165, 0.84, 0.44, 1]
              }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1]"
            >
              Restaurant With
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                ease: [0.165, 0.84, 0.44, 1]
              }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] pb-2"
            >
              Digital Solutions
            </motion.div>
          </div>

          {/* Subtitle with Fade Animation */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.6,
              ease: "easeOut"
            }}
            className="text-xl text-white/90 max-w-2xl pt-6"
          >
            Unlock your restaurant&apos;s full potential with our AI-powered platform that drives growth, efficiency, and customer satisfaction.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.8,
              ease: "easeOut"
            }}
            className="flex flex-col sm:flex-row gap-4 pt-8"
          >
            <Link
              href="#contact"
              className={cn(
                "px-8 py-3 rounded-lg",
                "bg-primary-500 text-secondary-500",
                "text-lg font-medium",
                "hover:bg-primary-400",
                "transition-colors"
              )}
            >
              Let&apos;s Get Cooking!
            </Link>
            <Link
              href="#services"
              className={cn(
                "px-8 py-3 rounded-lg",
                "bg-secondary-500/10 text-white",
                "text-lg font-medium",
                "hover:bg-secondary-400/20",
                "transition-colors backdrop-blur-sm"
              )}
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 