import React from "react";
import {
  getAboutHeading,
  getAboutCards,
  getHeroContent,
  getServicesHeading,
  getServiceCards,
  getTestimonialsHeading,
  getTestimonialCards,
  getBlogPosts,
} from "@/lib/contentful/client";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials/index";
import { Blog } from "@/components/sections/blog/index";
import { Contact } from "@/components/sections/contact";

export default async function HomePage() {
  // Add debug logs
  console.log("Fetching data...");

  const [
    aboutContent,
    aboutCards,
    heroContent,
    servicesContent,
    serviceCards,
    testimonialsContent,
    testimonialCards,
    blogPosts,
  ] = await Promise.all([
    getAboutHeading(),
    getAboutCards(),
    getHeroContent(),
    getServicesHeading(),
    getServiceCards(),
    getTestimonialsHeading(),
    getTestimonialCards(),
    getBlogPosts(),
  ]);

  // Add these debug logs
  console.log("=== DEBUG START ===");
  console.log("Testimonials Content:", testimonialsContent?.fields);
  console.log("Testimonial Cards:", testimonialCards?.length);
  console.log("=== DEBUG END ===");

  if (
    !aboutContent ||
    !heroContent ||
    !servicesContent ||
    !testimonialsContent
  ) {
    console.warn("Missing required content", {
      about: !!aboutContent,
      hero: !!heroContent,
      services: !!servicesContent,
      testimonials: !!testimonialsContent,
    });
    return null;
  }

  return (
    <main>
      <Hero data={heroContent} />
      <About data={aboutContent} cards={aboutCards} />
      <Services data={servicesContent} cards={serviceCards} />
      <Testimonials data={testimonialsContent} cards={testimonialCards} />
      <Blog posts={blogPosts} />
      <Contact />
    </main>
  );
}
