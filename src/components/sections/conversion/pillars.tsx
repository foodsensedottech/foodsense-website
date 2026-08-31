"use client";

import { motion } from "framer-motion";
import { getCardIcon } from "@/lib/about-icons";
import { ListChecks } from "lucide-react";
import type { ConversionHomepage } from "@/lib/content/conversion-seed";

interface Props {
  section: ConversionHomepage["pillarsSection"];
  pillars: ConversionHomepage["pillars"];
}

export function ConversionPillars({ section, pillars }: Props) {
  return (
    <section id="pillars-section" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {section.eyebrow ? (
            <p className="font-display text-sm tracking-[0.18em] uppercase text-[#D4A800] mb-3">
              {section.eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-3xl md:text-4xl text-[#253B59] leading-tight">
            {section.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = getCardIcon(pillar.lucideIcon) || ListChecks;
            return (
              <motion.article
                key={pillar.title}
                className="border-t border-[#253B59]/15 pt-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Icon
                  className="h-8 w-8 text-[#253B59] mb-5"
                  aria-hidden="true"
                />
                <h3 className="font-display text-xl text-[#253B59] mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-[#253B59]/75 leading-relaxed">{pillar.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
