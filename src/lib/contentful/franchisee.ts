import client from "@/lib/contentful/client";
import type {
  FranchiseeCardEntry,
  FranchiseeCardFields,
  FranchiseeTitleEntry,
  FranchiseeTitleFields,
} from "@/lib/contentful/types";
import type { FranchiseeLocale } from "@/lib/franchisees/copy";
import { getFranchiseeCopy } from "@/lib/franchisees/copy";

export const FRANCHISEE_CONTENT_TYPES = {
  painsTitle: "franchiseePainsTitle",
  painCard: "franchiseePainCard",
  offersTitle: "franchiseeOffersTitle",
  offerCard: "franchiseeOfferCard",
} as const;

function pickString(fields: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = fields[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return "";
}

function normalizeTitleFields(
  fields: Record<string, unknown>
): FranchiseeTitleFields {
  return {
    heading: pickString(fields, ["heading", "Heading", "title", "Title"]),
    subheading: pickString(fields, [
      "subheading",
      "Subheading",
      "description",
      "Description",
    ]),
  };
}

function normalizeCardFields(
  fields: Record<string, unknown>
): FranchiseeCardFields {
  return {
    title: pickString(fields, ["title", "Title"]),
    description: pickString(fields, ["description", "Description"]),
    lucideIcon: pickString(fields, [
      "lucideIcon",
      "LucideIcon",
      "lucideicon",
    ]),
  };
}

function asEntry<T extends { [key: string]: unknown }>(
  id: string,
  fields: T
): { sys: { id: string }; fields: T } {
  return { sys: { id }, fields };
}

function spanishPainsFallback(): {
  heading: FranchiseeTitleEntry;
  cards: FranchiseeCardEntry[];
} {
  const copy = getFranchiseeCopy("es");
  const icons = ["Layers", "Percent", "ShieldAlert", "LineChart"];
  return {
    heading: asEntry("es-pains-title", {
      heading: copy.painHeading,
      subheading: copy.painIntro,
    }),
    cards: copy.pains.map((pain, index) =>
      asEntry(`es-pain-${index}`, {
        title: pain.title,
        description: pain.body,
        lucideIcon: icons[index] || "Star",
      })
    ),
  };
}

function spanishOffersFallback(): {
  heading: FranchiseeTitleEntry;
  cards: FranchiseeCardEntry[];
} {
  const copy = getFranchiseeCopy("es");
  const icons = ["ClipboardCheck", "Store", "Wallet", "Globe"];
  return {
    heading: asEntry("es-offers-title", {
      heading: copy.offersHeading,
      subheading: copy.offersIntro,
    }),
    cards: copy.offers.map((offer, index) =>
      asEntry(`es-offer-${index}`, {
        title: offer.title,
        description: offer.body,
        lucideIcon: icons[index] || "Star",
      })
    ),
  };
}

function contentfulLocale(locale?: FranchiseeLocale) {
  return locale === "es" ? "es" : undefined;
}

async function getTitle(
  contentType: string,
  locale?: FranchiseeLocale
): Promise<FranchiseeTitleEntry | null> {
  const fetchTitle = async (cfLocale?: string) => {
    const response = await client.getEntries({
      content_type: contentType,
      limit: 1,
      order: ["-sys.updatedAt"],
      ...(cfLocale ? { locale: cfLocale } : {}),
    });
    const item = response.items[0];
    if (!item) return null;
    const fields = normalizeTitleFields(
      (item.fields || {}) as Record<string, unknown>
    );
    if (!fields.heading) return null;
    return {
      sys: item.sys,
      fields,
      metadata: item.metadata,
    };
  };

  try {
    const localized = await fetchTitle(contentfulLocale(locale));
    if (localized) return localized;
    if (locale === "es") return fetchTitle();
    return null;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    if (locale === "es") {
      try {
        return await fetchTitle();
      } catch {
        return null;
      }
    }
    return null;
  }
}

async function getCards(
  contentType: string,
  locale?: FranchiseeLocale
): Promise<FranchiseeCardEntry[]> {
  const fetchCards = async (cfLocale?: string) => {
    const response = await client.getEntries({
      content_type: contentType,
      order: ["sys.createdAt"],
      ...(cfLocale ? { locale: cfLocale } : {}),
    });
    return response.items
      .map((item) => ({
        sys: item.sys,
        fields: normalizeCardFields(
          (item.fields || {}) as Record<string, unknown>
        ),
        metadata: item.metadata,
      }))
      .filter((item) => item.fields.title);
  };

  try {
    const localized = await fetchCards(contentfulLocale(locale));
    if (localized.length) return localized;
    if (locale === "es") return fetchCards();
    return [];
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    if (locale === "es") {
      try {
        return await fetchCards();
      } catch {
        return [];
      }
    }
    return [];
  }
}

export async function getFranchiseePains(locale: FranchiseeLocale = "en") {
  const [heading, cards] = await Promise.all([
    getTitle(FRANCHISEE_CONTENT_TYPES.painsTitle, locale),
    getCards(FRANCHISEE_CONTENT_TYPES.painCard, locale),
  ]);

  if (locale === "es") {
    const englishHeading = getFranchiseeCopy("en").painHeading;
    const cmsIsEnglish =
      !heading ||
      !cards.length ||
      heading.fields.heading === englishHeading;
    if (cmsIsEnglish) {
      return spanishPainsFallback();
    }
  }

  return { heading, cards };
}

export async function getFranchiseeOffers(locale: FranchiseeLocale = "en") {
  const copy = getFranchiseeCopy(locale);
  const [heading, cards] = await Promise.all([
    getTitle(FRANCHISEE_CONTENT_TYPES.offersTitle, locale),
    getCards(FRANCHISEE_CONTENT_TYPES.offerCard, locale),
  ]);

  if (locale === "es") {
    const englishHeading = getFranchiseeCopy("en").offersHeading;
    const cmsIsEnglish =
      !heading ||
      !cards.length ||
      heading.fields.heading === englishHeading;
    if (cmsIsEnglish) {
      return spanishOffersFallback();
    }
  }

  if (cards.length && !heading) {
    return {
      heading: asEntry(`${locale}-offers-title-fallback`, {
        heading: copy.offersHeading,
        subheading: copy.offersIntro,
      }),
      cards,
    };
  }

  return { heading, cards };
}
