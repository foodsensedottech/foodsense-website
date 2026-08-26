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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,#2f5378_0%,transparent_50%),radial-gradient(ellipse_at_80%_0%,#1e3a5f_0%,#0f2138_55%,#0a1624_100%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1624] via-[#0a1624]/70 to-[#0a1624]/35" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-16 pt-28 md:py-24">
        <motion.p
          className="font-display text-amber-300 text-sm md:text-base tracking-[0.2em] uppercase mb-5"
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
            className="rounded-md bg-amber-400 text-[#13283f] hover:bg-amber-300 font-semibold px-8"
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
