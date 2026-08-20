"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { HeroCopyResolved, SiteChromeCopy } from "@/lib/copy/resolved";
import { smoothScrollToSection } from "@/lib/utils";

export function HeroContent({
  hero,
  chrome,
}: {
  hero: HeroCopyResolved;
  chrome: SiteChromeCopy;
}) {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollToSection("contact-section");
  };

  return (
    <div className="relative z-10 container mx-auto px-4 text-center">
      <p className="text-yellow-400 font-semibold tracking-wide text-sm mb-4">
        {hero.eyebrow}
      </p>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        {hero.headline}
      </h1>
      <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
        {hero.subhead}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          asChild
          size="lg"
          className="bg-yellow-400 text-[#1e3a5f] hover:bg-yellow-500 dark:bg-yellow-400 dark:text-[#1e3a5f] dark:hover:bg-yellow-500"
        >
          <Link href={hero.primaryHref} onClick={handleContactClick}>
            {hero.primaryCta}
          </Link>
        </Button>
      </div>
      <p className="mt-6 text-sm text-white/80">
        <a
          className="underline underline-offset-4"
          href={`mailto:${chrome.footerEmail}`}
        >
          {chrome.footerEmail}
        </a>
        {" · "}
        <a
          className="underline underline-offset-4"
          href={chrome.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        {" · "}
        <a
          className="underline underline-offset-4"
          href={chrome.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </p>
    </div>
  );
}
