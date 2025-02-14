import React from 'react';
import { Metadata } from 'next';
import { About } from "@/components/sections/about";
import { generatePageMetadata } from '@/lib/utils/seo';
import { getAboutHeading, getPageSEO } from '@/lib/contentful/client';
import { semanticConfig } from '@/lib/utils/semantic-structure';
import { CallToAction } from '@/components/sections/call-to-action';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About | FoodSense',
    description: 'Learn more about FoodSense and our mission to optimize restaurant operations',
  };
}

export default function AboutPage() {
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
        <About />
      </section>

      <section 
        aria-labelledby="team-heading"
        className="team-section"
      >
        <h2 id="team-heading" className="section-title">
          Our Team
        </h2>
        <div className="team-grid" role="list">
          {/* Team members */}
        </div>
      </section>

      <aside 
        aria-labelledby="cta-heading"
        className="cta-section"
      >
        <h3 id="cta-heading">Ready to Optimize Your Restaurant?</h3>
        <CallToAction />
      </aside>
    </article>
  );
} 