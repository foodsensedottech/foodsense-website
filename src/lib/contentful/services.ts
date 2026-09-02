import client from "@/lib/contentful/client";
import {
  isUnknownContentType,
  linesFromText,
  linkedEntries,
  mapTitleBody,
  pickString,
} from "@/lib/contentful/fields";
import {
  servicesPageCopy,
  type ServicesCard,
  type ServicesPageCopy,
} from "@/lib/content/services-page";

/**
 * `/services` from `servicesPage`. Linked modes/capabilities reuse
 * `conversionMenuItem` (title + body) so we do not add a card type.
 */
export async function getServicesPage(): Promise<ServicesPageCopy> {
  try {
    const response = await client.getEntries({
      content_type: "servicesPage",
      limit: 1,
      include: 2,
      order: ["-sys.updatedAt"],
    });
    const item = response.items[0];
    if (!item) return servicesPageCopy;

    const fields = (item.fields || {}) as Record<string, unknown>;
    const modes = linkedEntries(fields.modes)
      .map(mapTitleBody)
      .filter(Boolean) as ServicesCard[];
    const capabilities = linkedEntries(fields.capabilities)
      .map(mapTitleBody)
      .filter(Boolean) as ServicesCard[];
    const notRaw = pickString(fields, ["notItems"]);
    const notItems = notRaw ? linesFromText(notRaw) : servicesPageCopy.notItems;

    return {
      metaTitle:
        pickString(fields, ["metaTitle"]) || servicesPageCopy.metaTitle,
      metaDescription:
        pickString(fields, ["metaDescription"]) ||
        servicesPageCopy.metaDescription,
      eyebrow: pickString(fields, ["eyebrow"]) || servicesPageCopy.eyebrow,
      heading: pickString(fields, ["heading"]) || servicesPageCopy.heading,
      intro: pickString(fields, ["intro"]) || servicesPageCopy.intro,
      modes: modes.length ? modes : servicesPageCopy.modes,
      capabilitiesEyebrow:
        pickString(fields, ["capabilitiesEyebrow"]) ||
        servicesPageCopy.capabilitiesEyebrow,
      capabilitiesHeading:
        pickString(fields, ["capabilitiesHeading"]) ||
        servicesPageCopy.capabilitiesHeading,
      capabilities: capabilities.length
        ? capabilities
        : servicesPageCopy.capabilities,
      notHeading:
        pickString(fields, ["notHeading"]) || servicesPageCopy.notHeading,
      notItems: notItems.length ? notItems : servicesPageCopy.notItems,
      ctaHeading:
        pickString(fields, ["ctaHeading"]) || servicesPageCopy.ctaHeading,
      ctaBody: pickString(fields, ["ctaBody"]) || servicesPageCopy.ctaBody,
      ctaLabel: pickString(fields, ["ctaLabel"]) || servicesPageCopy.ctaLabel,
    };
  } catch (error) {
    if (!isUnknownContentType(error)) {
      console.error("Error fetching servicesPage:", error);
    }
    return servicesPageCopy;
  }
}
