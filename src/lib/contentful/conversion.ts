import client from "@/lib/contentful/client";
import { mapConversionHomepageFields } from "@/lib/contentful/conversion-map";
import { isUnknownContentType } from "@/lib/contentful/fields";
import {
  conversionSeed,
  type ConversionHomepage,
} from "@/lib/content/conversion-seed";

export { mapConversionHomepageFields } from "@/lib/contentful/conversion-map";

/**
 * Lean CMS: one `conversionHomepage` entry (+ linked pillars/menu).
 * Vendor logo cloud is retired (vendor-agnostic). Falls back to seed if
 * the type is missing or unpublished.
 */
export async function getConversionHomepage(): Promise<ConversionHomepage> {
  try {
    const response = await client.getEntries({
      content_type: "conversionHomepage",
      limit: 1,
      include: 2,
      order: ["-sys.updatedAt"],
    });
    const item = response.items[0];
    if (!item) return conversionSeed;

    return mapConversionHomepageFields(
      (item.fields || {}) as Record<string, unknown>
    );
  } catch (error) {
    if (!isUnknownContentType(error)) {
      console.error("Error fetching conversionHomepage:", error);
    }
    return conversionSeed;
  }
}
