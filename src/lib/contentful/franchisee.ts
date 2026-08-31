import client from "@/lib/contentful/client";
import {
  getFranchiseeCopy,
  type FranchiseeLocale,
} from "@/lib/franchisees/copy";
import type {
  FranchiseeCardEntry,
  FranchiseeCardFields,
  FranchiseeTitleEntry,
  FranchiseeTitleFields,
} from "@/lib/contentful/types";

/**
 * Content types that exist on Contentful master after Phase 1 cleanup.
 * `franchiseeOffersTitle` was deleted — do not query it (Contentful 400).
 */
export const FRANCHISEE_CONTENT_TYPES = {
  painsTitle: "franchiseePainsTitle",
  painCard: "franchiseePainCard",
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
    lucideIcon: pickString(fields, ["lucideIcon", "LucideIcon", "lucideicon"]),
  };
}

function isUnknownContentType(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const details = (error as { details?: { errors?: { name?: string }[] } })
    .details;
  return Boolean(
    details?.errors?.some((entry) => entry.name === "unknownContentType")
  );
}

function staticTitle(
  heading: string,
  subheading: string
): FranchiseeTitleEntry {
  return {
    sys: { id: "static-franchisee-title" },
    fields: { heading, subheading },
    metadata: { tags: [] },
  } as FranchiseeTitleEntry;
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
    if (isUnknownContentType(error)) {
      console.warn(
        `Contentful content type "${contentType}" is not on this environment — skipping`
      );
      return null;
    }
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
    if (isUnknownContentType(error)) {
      console.warn(
        `Contentful content type "${contentType}" is not on this environment — skipping`
      );
      return [];
    }
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
}

export async function getFranchiseePains(locale: FranchiseeLocale = "en") {
  const copy = getFranchiseeCopy(locale);
  const [heading, cards] = await Promise.all([
    getTitle(FRANCHISEE_CONTENT_TYPES.painsTitle),
    getCards(FRANCHISEE_CONTENT_TYPES.painCard),
  ]);

  return {
    heading:
      heading ??
      (cards.length > 0
        ? staticTitle(copy.painHeading, copy.painIntro)
        : null),
    cards,
  };
}

export async function getFranchiseeOffers(locale: FranchiseeLocale = "en") {
  const copy = getFranchiseeCopy(locale);
  // Title type was retired from master; cards may still exist.
  const cards = await getCards(FRANCHISEE_CONTENT_TYPES.offerCard);

  return {
    heading:
      cards.length > 0
        ? staticTitle(copy.offersHeading, copy.offersIntro)
        : null,
    cards,
  };
}
