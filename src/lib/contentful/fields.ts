export function pickString(fields: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = fields[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return "";
}

export function normalizeTitleFields(fields: Record<string, unknown>) {
  return {
    heading: pickString(fields, ["heading", "Heading", "title", "Title"]),
    subheading: pickString(fields, [
      "subheading",
      "Subheading",
      "description",
      "Description",
      "subtitle",
      "Subtitle",
    ]),
  };
}

export function normalizeCardFields(fields: Record<string, unknown>) {
  return {
    title: pickString(fields, ["title", "Title"]),
    description: pickString(fields, ["description", "Description"]),
    lucideIcon: pickString(fields, ["lucideIcon", "LucideIcon", "lucideicon"]),
  };
}
