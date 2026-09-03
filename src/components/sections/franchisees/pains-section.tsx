"use client";

import React from "react";

interface PainsSectionProps {
  heading: string;
  intro: string;
  cards: Array<{ title: string; body: string }>;
}

export function FranchiseePainsSection({
  heading,
  intro,
  cards,
}: PainsSectionProps) {
  return (
    <section id="franchisee-pains" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#253B59] mb-4 max-w-2xl leading-tight">
          {heading}
        </h2>
        <p className="text-[#253B59]/75 leading-relaxed max-w-3xl mb-12">
          {intro}
        </p>
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {cards.map((card) => (
            <article
              key={card.title}
              className="border-t border-[#253B59]/15 pt-6"
            >
              <h3 className="text-xl font-semibold text-[#253B59] mb-3">
                {card.title}
              </h3>
              <p className="text-[#253B59]/75 leading-relaxed">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
