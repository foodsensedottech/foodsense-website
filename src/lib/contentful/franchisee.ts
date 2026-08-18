import client from "@/lib/contentful/client";
import type {
  FranchiseeCardEntry,
  FranchiseeCardFields,
  FranchiseeTitleEntry,
  FranchiseeTitleFields,
} from "@/lib/contentful/types";

/**
 * Homepage card sections use the same field shape as About Us:
 * - Title types: heading, subheading (same as aboutUsTitleSubtitle)
 * - Card types: title, description, lucideIcon (same as aboutUsCard)
 *
 * Create these content types in Contentful by duplicating the About Us types.
 * See docs/contentful-homepage-cards.md.
 */
export const FRANCHISEE_CONTENT_TYPES = {
  painsTitle: "franchiseePainsTitle",
  painCard: "franchiseePainCard",
  offersTitle: "franchiseeOffersTitle",
  offerCard: "franchiseeOfferCard",
} as const;

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

async function getCards(contentType: string): Promise<FranchiseeCardEntry[]> {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      order: ["sys.createdAt"],
    });
    return response.items.map((item) => ({
      sys: item.sys,
      fields: item.fields as FranchiseeCardFields,
      metadata: item.metadata,
    }));
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
}

export async function getFranchiseePains() {
  const [heading, cards] = await Promise.all([
    getTitle(FRANCHISEE_CONTENT_TYPES.painsTitle),
    getCards(FRANCHISEE_CONTENT_TYPES.painCard),
  ]);
  return { heading, cards };
}

export async function getFranchiseeOffers() {
  const [heading, cards] = await Promise.all([
    getTitle(FRANCHISEE_CONTENT_TYPES.offersTitle),
    getCards(FRANCHISEE_CONTENT_TYPES.offerCard),
  ]);
  return { heading, cards };
}
