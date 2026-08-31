"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ConversionHomepage } from "@/lib/content/conversion-seed";

interface Props {
  data: ConversionHomepage["authority"];
}

export function ConversionAuthority({ data }: Props) {
  return (
    <section
      id="authority-section"
      className="py-20 md:py-28 bg-brand-warm-gray text-brand-navy"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-sm tracking-[0.18em] uppercase text-[#D4A800] mb-3">
            {data.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-5 leading-tight">
            {data.heading}
          </h2>
          <p className="text-lg text-[#253B59]/80 leading-relaxed">{data.body}</p>
        </motion.div>

        <div className="grid md:grid-cols-[minmax(0,280px)_1fr] gap-10 md:gap-14 items-start">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="aspect-[4/5] relative overflow-hidden bg-[#253B59]">
              {data.founderImageUrl ? (
                <Image
                  src={data.founderImageUrl}
                  alt={data.founderImageAlt || data.founderLabel}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              ) : (
                <div className="absolute inset-0 flex items-end p-6 bg-[linear-gradient(160deg,#253B59_0%,#3A5A80_50%,#253B59_100%)]">
                  <p className="font-display text-white text-2xl">
                    {data.founderLabel}
                  </p>
                </div>
              )}
            </div>
            {data.founderImageUrl ? (
              <p className="mt-4 font-display text-xl">{data.founderLabel}</p>
            ) : null}
          </motion.div>

          <motion.ul
            className="space-y-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <li className="font-display text-sm tracking-[0.18em] uppercase text-[#D4A800]">
              {data.winsLabel}
            </li>
            {data.wins.map((win) => (
              <li
                key={win}
                className="border-l-2 border-[#F1C100] pl-5 text-base md:text-lg leading-relaxed text-[#253B59]/90"
              >
                {win}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
