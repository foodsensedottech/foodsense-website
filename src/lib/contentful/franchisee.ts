import client from "@/lib/contentful/client";
import {
  normalizeCardFields,
  normalizeTitleFields,
  sortBySortOrder,
} from "@/lib/contentful/fields";
import type {
  FranchiseeCardEntry,
  FranchiseeTitleEntry,
} from "@/lib/contentful/types";

export const FRANCHISEE_CONTENT_TYPES = {
  painsTitle: "franchiseePainsTitle",
  painCard: "franchiseePainCard",
  offersTitle: "franchiseeOffersTitle",
  offerCard: "franchiseeOfferCard",
} as const;

export async function getTitle(
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
    const fields = normalizeTitleFields(
      (item.fields || {}) as Record<string, unknown>
    );
    if (!fields.heading) return null;
    return {
      sys: item.sys,
      fields,
      metadata: item.metadata,
    };
  } catch (error: unknown) {
    const message =
      error && typeof error === "object" && "message" in error
        ? String((error as { message?: string }).message)
        : String(error);
    if (!message.includes("unknownContentType")) {
      console.error(`Error fetching ${contentType}:`, error);
    }
    return null;
  }
}

export async function getCards(contentType: string): Promise<FranchiseeCardEntry[]> {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      order: ["sys.createdAt"],
    });
    return sortBySortOrder(
      response.items
        .map((item) => ({
          sys: item.sys,
          fields: normalizeCardFields(
            (item.fields || {}) as Record<string, unknown>
          ),
          metadata: item.metadata,
        }))
        .filter((item) => item.fields.title)
    );
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
