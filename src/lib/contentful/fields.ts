import client from "@/lib/contentful/client";

export function pickString(
  fields: Record<string, unknown>,
  keys: string[]
): string {
  for (const key of keys) {
    const value = fields[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return "";
}

export function pickJson<T>(
  fields: Record<string, unknown>,
  keys: string[]
): T | undefined {
  for (const key of keys) {
    const value = fields[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as T;
    }
    if (typeof value === "string" && value.trim()) {
      try {
        return JSON.parse(value) as T;
      } catch {
        continue;
      }
    }
  }
  return undefined;
}

export function linesFromText(value: string): string[] {
  return value
    .split(/\n+/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

export function assetUrl(field: unknown): string | undefined {
  if (!field || typeof field !== "object") return undefined;
  const file = (field as { fields?: { file?: { url?: string }; title?: string } })
    .fields;
  const url = file?.file?.url;
  if (!url) return undefined;
  return url.startsWith("http") ? url : `https:${url}`;
}

export function assetAlt(field: unknown, fallback: string): string {
  if (!field || typeof field !== "object") return fallback;
  const title = (field as { fields?: { title?: string } }).fields?.title;
  return title || fallback;
}

export function linkedEntries(field: unknown): Record<string, unknown>[] {
  const items = Array.isArray(field) ? field : field ? [field] : [];
  return items
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const fields = (item as { fields?: Record<string, unknown> }).fields;
      return fields || null;
    })
    .filter(Boolean) as Record<string, unknown>[];
}

export function isUnknownContentType(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const details = (error as { details?: { errors?: { name?: string }[] } })
    .details;
  return Boolean(
    details?.errors?.some((entry) => entry.name === "unknownContentType")
  );
}

/**
 * First published entry among content type IDs. Contentful cannot rename a
 * type API ID after save — the UI often creates `services` instead of
 * `servicesPage`. Skip unknown types; keep going if a type exists but is empty.
 */
export async function fetchFirstEntryFields(
  typeIds: string[],
  query: { include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; locale?: string } = {}
): Promise<Record<string, unknown> | null> {
  const include = query.include ?? 2;
  for (const content_type of typeIds) {
    try {
      const response = await client.getEntries({
        content_type,
        limit: 1,
        include,
        ...(query.locale ? { locale: query.locale } : {}),
        order: ["-sys.updatedAt"],
      });
      const item = response.items[0];
      if (item) {
        return (item.fields || {}) as Record<string, unknown>;
      }
    } catch (error) {
      if (!isUnknownContentType(error)) {
        throw error;
      }
    }
  }
  return null;
}

export function firstLinkedCards<T extends { title: string; body: string }>(
  fields: Record<string, unknown>,
  keys: string[],
  mapCard: (fields: Record<string, unknown>) => T | null
): T[] {
  for (const key of keys) {
    const cards = linkedEntries(fields[key])
      .map(mapCard)
      .filter(Boolean) as T[];
    if (cards.length) return cards;
  }
  return [];
}

/** App `en` → Contentful `en-US`; `es` stays `es`. */
export function contentfulLocale(locale: "en" | "es"): string {
  return locale === "es" ? "es" : "en-US";
}

export function mapTitleBody(
  fields: Record<string, unknown>
): { title: string; body: string } | null {
  const title = pickString(fields, ["title", "Title"]);
  const body = pickString(fields, [
    "body",
    "Body",
    "description",
    "Description",
  ]);
  if (!title || !body) return null;
  return { title, body };
}

export function pickNumber(
  fields: Record<string, unknown>,
  keys: string[]
): number | undefined {
  for (const key of keys) {
    const value = fields[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }
  return undefined;
}

export function normalizeTitleFields(fields: Record<string, unknown>) {
  return {
    heading: pickString(fields, [
      "heading",
      "Heading",
      "title",
      "Title",
      "testimonialTitle",
      "headline",
      "Headline",
    ]),
    subheading: pickString(fields, [
      "subheading",
      "Subheading",
      "description",
      "Description",
      "subtitle",
      "Subtitle",
      "testimonialSubtitle",
      "intro",
      "Intro",
    ]),
  };
}

export function normalizeCardFields(fields: Record<string, unknown>) {
  return {
    title: pickString(fields, ["title", "Title"]),
    description: pickString(fields, [
      "description",
      "Description",
      "body",
      "Body",
    ]),
    lucideIcon: pickString(fields, [
      "lucideIcon",
      "LucideIcon",
      "lucideicon",
    ]),
    sortOrder: pickNumber(fields, ["sortOrder", "SortOrder", "order", "Order"]),
  };
}

export function sortBySortOrder<T extends { fields: { sortOrder?: number } }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const aOrder = a.fields.sortOrder;
    const bOrder = b.fields.sortOrder;
    if (aOrder == null && bOrder == null) return 0;
    if (aOrder == null) return 1;
    if (bOrder == null) return -1;
    return aOrder - bOrder;
  });
}
