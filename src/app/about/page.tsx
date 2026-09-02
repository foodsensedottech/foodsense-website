import { Metadata } from "next";
import { BaseLayout } from "@/components/layout";
import { AboutSection } from "@/components/sections/about";
import { getAboutPage } from "@/lib/contentful/about";
import { semanticConfig } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getAboutPage();
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
  };
}

export default async function AboutPage() {
  const { heading, cards } = await getAboutPage();

  return (
    <BaseLayout>
      <article>
        <h1 className="sr-only">{heading.fields.heading}</h1>
        <section
          aria-labelledby="about-heading"
          id={semanticConfig.sections.about}
        >
          <AboutSection heading={heading} cards={cards} />
        </section>
      </article>
    </BaseLayout>
  );
}
