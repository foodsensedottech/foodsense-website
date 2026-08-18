import { getAboutCards, getAboutHeading } from "@/lib/contentful/client";
import type {
  AboutCardFields,
  AboutTitleFields,
  ContentfulEntry,
} from "@/lib/contentful/types";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";
import { getFranchiseeCopy } from "@/lib/franchisees/copy";

const ENGLISH_ABOUT_CARD_TITLES = new Set([
  "Proven Results",
  "Optimization and Profits",
  "Customer Reviews & Sentiment",
  "Expertise in Restaurant Tech",
]);

function asEntry<T extends { [key: string]: unknown }>(
  id: string,
  fields: T
): ContentfulEntry<T> {
  return { sys: { id }, fields };
}

function spanishAboutFallback(): {
  heading: ContentfulEntry<AboutTitleFields>;
  cards: ContentfulEntry<AboutCardFields>[];
} {
  const copy = getFranchiseeCopy("es");
  return {
    heading: asEntry("es-about-title", {
      heading: copy.aboutHeading,
      subheading: copy.aboutIntro,
    }),
    cards: copy.aboutCards.map((card, index) =>
      asEntry(`es-about-${index}`, {
        title: card.title,
        description: card.body,
        lucideIcon: card.lucideIcon,
      })
    ),
  };
}

function looksEnglishAbout(
  heading: ContentfulEntry<AboutTitleFields> | null,
  cards: ContentfulEntry<AboutCardFields>[] | null
) {
  const englishHeading = getFranchiseeCopy("en").aboutHeading;
  if (!heading || !cards?.length) return true;
  if (heading.fields.heading === englishHeading) return true;
  return cards.some((card) => ENGLISH_ABOUT_CARD_TITLES.has(card.fields.title));
}

export async function getAboutContent(locale: FranchiseeLocale = "en") {
  const [heading, cards] = await Promise.all([
    getAboutHeading(locale),
    getAboutCards(locale),
  ]);

  if (locale === "es" && looksEnglishAbout(heading, cards)) {
    return spanishAboutFallback();
  }

  return { heading, cards: cards ?? [] };
}
