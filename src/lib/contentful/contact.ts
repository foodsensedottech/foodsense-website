import client from "@/lib/contentful/client";
import { getTitle } from "@/lib/contentful/franchisee";
import { normalizeTitleFields, pickString } from "@/lib/contentful/fields";
import type { ContactSectionCopy, FranchiseeTitleEntry } from "@/lib/contentful/types";

const CONTACT_TITLE_TYPES = [
  "contactTitleAndSubtitle",
  "contactUsTitleSubtitle",
  "contactTitleSubtitle",
];

/**
 * Contact heading from a dedicated contact title type.
 * Falls back to `testimonialsTitleAndSubtitle` only when that entry's title
 * looks like contact copy (avoids showing leftover testimonial headlines).
 */
export async function getContactHeading(): Promise<FranchiseeTitleEntry | null> {
  for (const contentType of CONTACT_TITLE_TYPES) {
    const heading = await getTitle(contentType);
    if (heading) return heading;
  }
  return getReusableContactHeading();
}

async function getReusableContactHeading(): Promise<FranchiseeTitleEntry | null> {
  try {
    const response = await client.getEntries({
      content_type: "testimonialsTitleAndSubtitle",
      limit: 1,
      order: ["-sys.updatedAt"],
    });
    const item = response.items[0];
    if (!item) return null;
    const raw = (item.fields || {}) as Record<string, unknown>;
    const fields = normalizeTitleFields(raw);
    if (!fields.heading) return null;
    if (!looksLikeContactHeading(fields.heading)) return null;
    return {
      sys: item.sys,
      fields,
      metadata: item.metadata,
    };
  } catch (error) {
    console.error("Error fetching reusable contact heading:", error);
    return null;
  }
}

function looksLikeContactHeading(heading: string): boolean {
  const lower = heading.toLowerCase();
  if (lower.includes("testimonial") || lower.includes("clients are saying")) {
    return false;
  }
  return (
    lower.includes("contact") ||
    lower.includes("get in touch") ||
    lower.includes("talk to") ||
    lower.includes("reach out")
  );
}

export async function getContactSectionCopy(): Promise<ContactSectionCopy | null> {
  const heading = await getContactHeading();

  // Optional form chrome from the reused testimonials/contact entry
  let formChrome: Partial<ContactSectionCopy> = {};
  try {
    const response = await client.getEntries({
      content_type: "testimonialsTitleAndSubtitle",
      limit: 1,
      order: ["-sys.updatedAt"],
    });
    const raw = (response.items[0]?.fields || {}) as Record<string, unknown>;
    formChrome = {
      submitLabel: pickString(raw, ["submitLabel", "SubmitLabel"]) || undefined,
      submittingLabel:
        pickString(raw, ["submittingLabel", "SubmittingLabel"]) || undefined,
      successMessage:
        pickString(raw, ["successMessage", "SuccessMessage"]) || undefined,
      errorMessage: pickString(raw, ["errorMessage", "ErrorMessage"]) || undefined,
    };
  } catch {
    // optional
  }

  if (!heading) {
    const hasChrome = Object.values(formChrome).some(Boolean);
    return hasChrome ? { heading: "", ...formChrome } : null;
  }

  return {
    heading: heading.fields.heading,
    subheading: heading.fields.subheading,
    ...formChrome,
  };
}
