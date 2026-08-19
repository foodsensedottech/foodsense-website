import type {
  AboutCardFields,
  AboutTitleFields,
  ContentfulEntry,
} from "@/lib/contentful/types";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";
import { getFranchiseeCopy } from "@/lib/franchisees/copy";

function asEntry<T extends { [key: string]: unknown }>(
  id: string,
  fields: T
): ContentfulEntry<T> {
  return { sys: { id }, fields };
}

export async function getAboutContent(locale: FranchiseeLocale = "en") {
  const copy = getFranchiseeCopy(locale);
  return {
    heading: asEntry(`${locale}-about-title`, {
      heading: copy.aboutHeading,
      subheading: copy.aboutIntro,
    } satisfies AboutTitleFields),
    cards: copy.aboutCards.map(
      (card, index) =>
        asEntry(`${locale}-about-${index}`, {
          title: card.title,
          description: card.body,
          lucideIcon: card.lucideIcon,
        } satisfies AboutCardFields)
    ),
  };
}
