import {
  getAboutCards as fetchAboutCards,
  getAboutHeading as fetchAboutHeading,
} from "@/lib/contentful/client";
import { pickString } from "@/lib/contentful/fields";
import { aboutSeed, type AboutPageCopy } from "@/lib/content/about-seed";
import type { AboutCardFields, AboutTitleFields } from "@/lib/contentful/types";

type ContentfulEntry<T> = {
  sys: { id: string; [key: string]: unknown };
  fields: T;
  metadata?: unknown;
};

function seedHeading(): ContentfulEntry<AboutTitleFields> {
  return {
    sys: { id: "about-seed-heading" },
    fields: {
      heading: aboutSeed.heading,
      subheading: aboutSeed.subheading,
    },
  };
}

function seedCards(): ContentfulEntry<AboutCardFields>[] {
  return aboutSeed.cards.map((card) => ({
    sys: { id: card.id },
    fields: {
      title: card.title,
      description: card.description,
      lucideIcon: card.lucideIcon,
    },
  }));
}

export async function getAboutPage(): Promise<{
  copy: AboutPageCopy;
  heading: ContentfulEntry<AboutTitleFields>;
  cards: ContentfulEntry<AboutCardFields>[];
}> {
  const [cmsHeading, cmsCards] = await Promise.all([
    fetchAboutHeading(),
    fetchAboutCards(),
  ]);

  const headingFields = cmsHeading?.fields as AboutTitleFields | undefined;
  const headingText = headingFields
    ? pickString(headingFields as unknown as Record<string, unknown>, [
        "heading",
        "Heading",
        "title",
        "Title",
      ])
    : "";
  const subheadingText = headingFields
    ? pickString(headingFields as unknown as Record<string, unknown>, [
        "subheading",
        "Subheading",
        "description",
        "Description",
      ])
    : "";

  const heading: ContentfulEntry<AboutTitleFields> =
    cmsHeading && headingText
      ? {
          sys: cmsHeading.sys,
          fields: {
            heading: headingText,
            subheading: subheadingText || aboutSeed.subheading,
          },
          metadata: cmsHeading.metadata,
        }
      : seedHeading();

  const liveCards = (cmsCards || [])
    .map((item) => {
      const fields = item.fields as unknown as Record<string, unknown>;
      const title = pickString(fields, ["title", "Title"]);
      const description = pickString(fields, [
        "description",
        "Description",
        "body",
        "Body",
      ]);
      if (!title || !description) return null;
      return {
        sys: item.sys,
        fields: {
          title,
          description,
          lucideIcon:
            pickString(fields, ["lucideIcon", "LucideIcon"]) || "ListChecks",
        },
        metadata: item.metadata,
      } as ContentfulEntry<AboutCardFields>;
    })
    .filter(Boolean) as ContentfulEntry<AboutCardFields>[];

  const cards = liveCards.length ? liveCards : seedCards();

  return {
    copy: {
      ...aboutSeed,
      heading: heading.fields.heading,
      subheading: heading.fields.subheading,
    },
    heading,
    cards,
  };
}
