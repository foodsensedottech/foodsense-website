import React from 'react';
import { getAboutHeading, getAboutCards } from '@/lib/contentful/client';
import { About } from '@/components/sections/about';
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";

export default async function HomePage() {
  const [aboutContent, aboutCards] = await Promise.all([
    getAboutHeading(),
    getAboutCards()
  ]);
  
  if (!aboutContent) return null;

  return (
    <main>
      <div>
        <h1>Hello World</h1>
      </div>
      <Hero />
      <About data={aboutContent} cards={aboutCards} />
      <Services />
      <Testimonials />
      <Blog />
      <Contact />
    </main>
  );
}