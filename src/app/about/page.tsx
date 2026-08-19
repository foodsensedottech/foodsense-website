import React from "react";
import { Metadata } from "next";
import { AboutSection } from "@/components/sections/about";
import { getAboutContent } from "@/lib/contentful/about";
import { semanticConfig } from "@/lib/utils";

export const revalidate = 3600; // Revalidate at most once per hour; Contentful webhooks also call /api/revalidate

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About | FoodSense",
    description:
      "Learn more about FoodSense and our mission to optimize restaurant operations",
  };
}

export default async function AboutPage() {
  const about = await getAboutContent("en");

  return (
    <article className="container mx-auto">
      <header className="page-header">
        <h1 className="sr-only">About FoodSense</h1>
      </header>

      <section
        aria-labelledby="about-heading"
        id={semanticConfig.sections.about}
      >
        <h2 id="about-heading" className="section-title">
          Our Story
        </h2>
        {about.heading && about.cards.length > 0 && (
          <AboutSection heading={about.heading} cards={about.cards} />
        )}
      </section>

      <section aria-labelledby="team-heading" className="team-section">
        <h2 id="team-heading" className="section-title">
          Our Team
        </h2>
        <div className="team-grid" role="list">
          {/* Team members */}
        </div>
      </section>

      <aside aria-labelledby="cta-heading" className="cta-section">
        <h3 id="cta-heading">Ready to Optimize Your Restaurant?</h3>
        {/* CallToAction component removed */}
      </aside>
    </article>
  );
}
