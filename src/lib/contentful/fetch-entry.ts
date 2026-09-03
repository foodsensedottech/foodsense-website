import client from "@/lib/contentful/client";
import { isUnknownContentType } from "@/lib/contentful/fields";

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
