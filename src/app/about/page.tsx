import { Metadata } from "next";
import { BaseLayout } from "@/components/layout";
import { AboutSection } from "@/components/sections/about";
import { getAboutHeading, getAboutCards } from "@/lib/contentful/client";
import { semanticConfig } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About",
    description:
      "A boutique restaurant-technology consultancy for 10+ unit QSR and franchise operators across Latin America, the Caribbean, and the US.",
  };
}

export default async function AboutPage() {
  const heading = await getAboutHeading();
  const cards = await getAboutCards();

  return (
    <BaseLayout>
      <article>
        <h1 className="sr-only">About FoodSense</h1>
        <section
          aria-labelledby="about-heading"
          id={semanticConfig.sections.about}
        >
          {heading && cards ? (
            <AboutSection heading={heading} cards={cards} />
          ) : (
            <div className="container mx-auto px-4 py-20 max-w-3xl">
              <h2
                id="about-heading"
                className="text-3xl md:text-4xl font-bold text-[#253B59] mb-4"
              >
                About FoodSense
              </h2>
              <p className="text-lg text-[#253B59]/80 leading-relaxed">
                A boutique consultancy at the intersection of restaurant
                operations and technology. We help 10+ unit growth-stage brands
                and multi-unit franchisees build, integrate, and scale the stack
                that runs every shift.
              </p>
            </div>
          )}
        </section>
      </article>
    </BaseLayout>
  );
}
