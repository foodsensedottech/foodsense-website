"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConversionHomepage } from "@/lib/content/conversion-seed";

interface Props {
  items: ConversionHomepage["menuItems"];
}

export function ConversionMenu({ items }: Props) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section
      id="menu-section"
      className="py-20 md:py-28 bg-[#13283f] text-[#f7f4ef]"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-sm tracking-[0.18em] uppercase text-amber-300/90 mb-3">
            Specialized menu
          </p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight">
            Other services
          </h2>
        </motion.div>

        <div className="max-w-3xl divide-y divide-white/15 border-y border-white/15">
          {items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.title}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className="font-display text-lg md:text-xl">
                    {item.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300",
                      open && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-white/75 leading-relaxed max-w-2xl">
                        {item.body}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
