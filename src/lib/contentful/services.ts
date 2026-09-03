import { fetchFirstEntryFields } from "@/lib/contentful/fetch-entry";
import {
  firstLinkedCards,
  linesFromText,
  mapTitleBody,
  pickString,
} from "@/lib/contentful/fields";
import {
  servicesPageCopy,
  type ServicesCard,
  type ServicesPageCopy,
} from "@/lib/content/services-page";

/** UI-created type is often `services`; migration `004` uses `servicesPage`. */
export const SERVICES_CONTENT_TYPES = ["services", "servicesPage"] as const;

export function mapServicesFields(
  fields: Record<string, unknown>
): ServicesPageCopy {
  const modes = firstLinkedCards(fields, ["engagementModes", "modes"], mapTitleBody);
  const capabilities = firstLinkedCards(
    fields,
    ["capabilities"],
    mapTitleBody
  );
  const notRaw = pickString(fields, ["notThisItems", "notItems"]);
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
    modes: modes.length ? (modes as ServicesCard[]) : servicesPageCopy.modes,
    capabilitiesEyebrow:
      pickString(fields, ["capabilitiesEyebrow"]) ||
      servicesPageCopy.capabilitiesEyebrow,
    capabilitiesHeading:
      pickString(fields, ["capabilitiesHeading"]) ||
      servicesPageCopy.capabilitiesHeading,
    capabilities: capabilities.length
      ? (capabilities as ServicesCard[])
      : servicesPageCopy.capabilities,
    notHeading:
      pickString(fields, ["notThisHeading", "notHeading"]) ||
      servicesPageCopy.notHeading,
    notItems: notItems.length ? notItems : servicesPageCopy.notItems,
    ctaHeading:
      pickString(fields, ["ctaHeading"]) || servicesPageCopy.ctaHeading,
    ctaBody: pickString(fields, ["ctaBody"]) || servicesPageCopy.ctaBody,
    ctaLabel: pickString(fields, ["ctaLabel"]) || servicesPageCopy.ctaLabel,
  };
}

/**
 * `/services` from Contentful. Accepts type ID `services` (Contentful UI
 * default from the name "Services") or `servicesPage` (migration `004`).
 * Linked modes/capabilities reuse `conversionMenuItem` (title + body).
 */
export async function getServicesPage(): Promise<ServicesPageCopy> {
  try {
    const fields = await fetchFirstEntryFields([...SERVICES_CONTENT_TYPES], {
      include: 2,
    });
    if (!fields) return servicesPageCopy;
    return mapServicesFields(fields);
  } catch (error) {
    console.error("Error fetching services page:", error);
    return servicesPageCopy;
  }
}
