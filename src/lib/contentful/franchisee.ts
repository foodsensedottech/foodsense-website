import client from "@/lib/contentful/client";
import type {
  FranchiseeCardEntry,
  FranchiseeCardFields,
  FranchiseeTitleEntry,
  FranchiseeTitleFields,
} from "@/lib/contentful/types";

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
    const fields = normalizeTitleFields(
      (item.fields || {}) as Record<string, unknown>
    );
    if (!fields.heading) return null;
    return {
      sys: item.sys,
      fields,
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
    return response.items
      .map((item) => ({
        sys: item.sys,
        fields: normalizeCardFields(
          (item.fields || {}) as Record<string, unknown>
        ),
        metadata: item.metadata,
      }))
      .filter((item) => item.fields.title);
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
