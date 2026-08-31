"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { smoothScrollToSection } from "@/lib/utils";
import type { ConversionHomepage } from "@/lib/content/conversion-seed";

interface Props {
  data: ConversionHomepage["hero"];
  brand?: string;
}

export function ConversionHero({ data, brand = "FoodSense" }: Props) {
  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollToSection("contact-section");
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[88vh] flex items-end md:items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            alt={data.imageAlt || brand}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#253B59_0%,#1A2A40_100%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A40] via-[#1A2A40]/55 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-16 pt-28 md:py-24">
        <motion.p
          className="font-display text-[#F1C100] text-sm md:text-base tracking-[0.2em] uppercase mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {brand}
        </motion.p>
        <motion.h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl text-white max-w-4xl leading-[1.08] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          {data.heading}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white/85 max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          {data.subheading}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-md bg-[#F1C100] text-[#253B59] hover:bg-[#D4A800] font-semibold px-8"
          >
            <Link href="#contact-section" onClick={handleCta}>
              {data.ctaLabel}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
