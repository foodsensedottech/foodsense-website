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
