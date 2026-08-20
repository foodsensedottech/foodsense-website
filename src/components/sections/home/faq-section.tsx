"use client";

import { useState } from "react";
import type { HomeMarketingCopy } from "@/lib/copy/resolved";

export function FaqSection({ copy }: { copy: HomeMarketingCopy["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{copy.headline}</h2>
        <div className="space-y-3">
          {copy.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question} className="border border-border rounded-lg">
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 font-medium flex justify-between gap-4"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                {open ? (
                  <p className="px-4 pb-4 text-sm text-muted-foreground">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
