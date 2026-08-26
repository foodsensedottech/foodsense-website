"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ConversionHomepage } from "@/lib/content/conversion-seed";

interface Props {
  vendors: ConversionHomepage["vendors"];
}

export function ConversionVendors({ vendors }: Props) {
  return (
    <section id="partners-section" className="py-16 md:py-20 bg-[#e8eef4]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="font-display text-2xl md:text-3xl text-[#13283f]">
            Trusted Integration Partners
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor.name}
              className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              {vendor.logoUrl ? (
                <Image
                  src={vendor.logoUrl}
                  alt={vendor.name}
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span className="font-display text-lg tracking-wide text-[#13283f]/70">
                  {vendor.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
