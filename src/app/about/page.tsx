import React from "react";
import { Metadata } from "next";
import { AboutSection } from "@/components/sections/about";
import { getAboutContent } from "@/lib/contentful/about";
import { semanticConfig } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About | FoodSense",
  };
}

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <article className="container mx-auto">
      <section
        aria-labelledby="about-heading"
        id={semanticConfig.sections.about}
      >
        {about.heading && about.cards.length > 0 ? (
          <AboutSection heading={about.heading} cards={about.cards} />
        ) : null}
      </section>
    </article>
  );
}
