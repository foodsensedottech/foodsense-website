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

function asEntry<T extends { [key: string]: any }>(
  id: string,
  fields: T
): { sys: { id: string }; fields: T } {
  return { sys: { id }, fields };
}

function fallbackPains(locale: FranchiseeLocale): {
  heading: FranchiseeTitleEntry;
  cards: FranchiseeCardEntry[];
} {
  const copy = getFranchiseeCopy(locale);
  const icons = ["Layers", "Percent", "ShieldAlert"];
  return {
    heading: asEntry("fallback-pains-title", {
      heading: copy.painHeading,
      subheading: copy.painIntro,
    } satisfies FranchiseeTitleFields),
    cards: copy.pains.map((pain, index) =>
      asEntry(`fallback-pain-${index}`, {
        title: pain.title,
        description: pain.body,
        lucideIcon: icons[index],
      } satisfies FranchiseeCardFields)
    ),
  };
}

function fallbackOffers(locale: FranchiseeLocale): {
  heading: FranchiseeTitleEntry;
  cards: FranchiseeCardEntry[];
} {
  const copy = getFranchiseeCopy(locale);
  const icons = ["ClipboardCheck", "Store", "Wallet"];
  return {
    heading: asEntry("fallback-offers-title", {
      heading: copy.offersHeading,
      subheading: copy.offersIntro,
    } satisfies FranchiseeTitleFields),
    cards: copy.offers.map((offer, index) =>
      asEntry(`fallback-offer-${index}`, {
        title: offer.title,
        description: offer.body,
        lucideIcon: icons[index],
      } satisfies FranchiseeCardFields)
    ),
  };
}

async function getTitle(
  contentType: string
): Promise<FranchiseeTitleEntry | null> {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      limit: 1,
      order: ["-sys.updatedAt"],
    });
    const item = response.items[0];
    if (!item) return null;
    return {
      sys: item.sys,
      fields: item.fields as FranchiseeTitleFields,
      metadata: item.metadata,
    };
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return null;
  }
}

async function getCards(
  contentType: string
): Promise<FranchiseeCardEntry[] | null> {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      order: ["sys.createdAt", "-sys.updatedAt"],
    });
    if (!response.items.length) return null;
    return response.items.map((item) => ({
      sys: item.sys,
      fields: item.fields as FranchiseeCardFields,
      metadata: item.metadata,
    }));
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return null;
  }
}

export async function getFranchiseePains(locale: FranchiseeLocale = "en") {
  const fallback = fallbackPains(locale);
  const [heading, cards] = await Promise.all([
    getTitle(FRANCHISEE_CONTENT_TYPES.painsTitle),
    getCards(FRANCHISEE_CONTENT_TYPES.painCard),
  ]);
  return {
    heading: heading ?? fallback.heading,
    cards: cards?.length ? cards : fallback.cards,
    fromCms: Boolean(heading && cards?.length),
  };
}

export async function getFranchiseeOffers(locale: FranchiseeLocale = "en") {
  const fallback = fallbackOffers(locale);
  const [heading, cards] = await Promise.all([
    getTitle(FRANCHISEE_CONTENT_TYPES.offersTitle),
    getCards(FRANCHISEE_CONTENT_TYPES.offerCard),
  ]);
  return {
    heading: heading ?? fallback.heading,
    cards: cards?.length ? cards : fallback.cards,
    fromCms: Boolean(heading && cards?.length),
  };
}
