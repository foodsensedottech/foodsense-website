import { Suspense } from "react";
import { HeroSection } from "./hero";
import { AboutSection } from "./about/about-section";
import { ServicesSection } from "./services";
import { TestimonialsSection } from "./testimonials";
import { ContactSection } from "./contact";
import {
  getHeroContent,
  getAboutContent,
  getServicesContent,
  getTestimonialsContent,
} from "@/lib/contentful/client";
import { SectionLoading } from "@/components/ui/layout/section-loading";

export async function HomeContent() {
  try {
    const [heroContent, aboutContent, servicesContent, testimonialsContent] =
      await Promise.all([
        getHeroContent(),
        getAboutContent(),
        getServicesContent(),
        getTestimonialsContent(),
      ]);

    if (
      !heroContent ||
      !aboutContent?.heading ||
      !servicesContent?.heading ||
      !testimonialsContent?.heading
    ) {
      return <SectionLoading />;
    }

    return (
      <>
        <Suspense fallback={<SectionLoading />}>
          <HeroSection data={heroContent} />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <AboutSection
            heading={aboutContent.heading}
            cards={aboutContent.cards || []}
          />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <ServicesSection
            heading={servicesContent.heading}
            cards={servicesContent.cards || []}
          />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <TestimonialsSection
            heading={testimonialsContent.heading}
            cards={testimonialsContent.cards || []}
          />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <ContactSection />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error("Error loading content:", error);
    return <SectionLoading />;
  }
}
