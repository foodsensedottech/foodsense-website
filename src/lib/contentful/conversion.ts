import client from "@/lib/contentful/client";
import { pickString } from "@/lib/contentful/fields";
import {
  conversionSeed,
  type ConversionHomepage,
  type ConversionMenuItem,
  type ConversionPillar,
  type ConversionVendor,
} from "@/lib/content/conversion-seed";

function assetUrl(field: unknown): string | undefined {
  if (!field || typeof field !== "object") return undefined;
  const file = (field as { fields?: { file?: { url?: string }; title?: string } })
    .fields;
  const url = file?.file?.url;
  if (!url) return undefined;
  return url.startsWith("http") ? url : `https:${url}`;
}

function assetAlt(field: unknown, fallback: string): string {
  if (!field || typeof field !== "object") return fallback;
  const title = (field as { fields?: { title?: string } }).fields?.title;
  return title || fallback;
}

function linesFromText(value: string): string[] {
  return value
    .split(/\n+/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function mapPillar(fields: Record<string, unknown>): ConversionPillar | null {
  const title = pickString(fields, ["title", "Title"]);
  const body = pickString(fields, ["body", "Body", "description", "Description"]);
  if (!title || !body) return null;
  return {
    title,
    body,
    lucideIcon: pickString(fields, ["lucideIcon", "LucideIcon"]) || "ListChecks",
  };
}

function mapMenuItem(fields: Record<string, unknown>): ConversionMenuItem | null {
  const title = pickString(fields, ["title", "Title"]);
  const body = pickString(fields, ["body", "Body", "description", "Description"]);
  if (!title || !body) return null;
  return { title, body };
}

function mapVendor(fields: Record<string, unknown>): ConversionVendor | null {
  const name = pickString(fields, ["name", "Name", "title", "Title"]);
  if (!name) return null;
  return {
    name,
    logoUrl: assetUrl(fields.logo || fields.Logo || fields.image),
  };
}

function linkedEntries(field: unknown): Record<string, unknown>[] {
  if (!Array.isArray(field)) return [];
  return field
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const fields = (item as { fields?: Record<string, unknown> }).fields;
      return fields || null;
    })
    .filter(Boolean) as Record<string, unknown>[];
}

/**
 * Lean CMS: one `conversionHomepage` entry (+ optional linked pillars/menu/vendors).
 * Falls back to seed so Preview stays usable before Contentful is filled.
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

    const fields = (item.fields || {}) as Record<string, unknown>;
    const pillars = linkedEntries(fields.pillars)
      .map(mapPillar)
      .filter(Boolean) as ConversionPillar[];
    const menuItems = linkedEntries(fields.menuItems)
      .map(mapMenuItem)
      .filter(Boolean) as ConversionMenuItem[];
    const vendors = linkedEntries(fields.vendors)
      .map(mapVendor)
      .filter(Boolean) as ConversionVendor[];

    const winsRaw = pickString(fields, ["founderWins", "wins", "FounderWins"]);
    const wins = winsRaw ? linesFromText(winsRaw) : conversionSeed.authority.wins;

    return {
      chrome: {
        ctaLabel:
          pickString(fields, ["chromeCtaLabel", "ctaLabel"]) ||
          conversionSeed.chrome.ctaLabel,
        navAuthority:
          pickString(fields, ["navAuthority"]) || conversionSeed.chrome.navAuthority,
        navPillars:
          pickString(fields, ["navPillars"]) || conversionSeed.chrome.navPillars,
        navMenu: pickString(fields, ["navMenu"]) || conversionSeed.chrome.navMenu,
        navPartners:
          pickString(fields, ["navPartners"]) || conversionSeed.chrome.navPartners,
        navContact:
          pickString(fields, ["navContact"]) || conversionSeed.chrome.navContact,
        footerTagline:
          pickString(fields, ["footerTagline"]) ||
          conversionSeed.chrome.footerTagline,
      },
      hero: {
        brandLabel:
          pickString(fields, ["heroBrandLabel", "brandLabel"]) ||
          conversionSeed.hero.brandLabel,
        heading:
          pickString(fields, ["heroHeading", "heading"]) ||
          conversionSeed.hero.heading,
        subheading:
          pickString(fields, ["heroSubheading", "subheading"]) ||
          conversionSeed.hero.subheading,
        ctaLabel:
          pickString(fields, ["heroCta", "ctaLabel"]) ||
          conversionSeed.hero.ctaLabel,
        imageUrl:
          assetUrl(fields.heroImage || fields.backgroundImage) ||
          conversionSeed.hero.imageUrl,
        imageAlt: assetAlt(
          fields.heroImage || fields.backgroundImage,
          "FoodSense"
        ),
      },
      authority: {
        eyebrow:
          pickString(fields, ["authorityEyebrow"]) ||
          conversionSeed.authority.eyebrow,
        heading:
          pickString(fields, ["authorityHeading"]) ||
          conversionSeed.authority.heading,
        winsLabel:
          pickString(fields, ["authorityWinsLabel"]) ||
          conversionSeed.authority.winsLabel,
        body:
          pickString(fields, ["authorityBody", "aboutBody"]) ||
          conversionSeed.authority.body,
        founderLabel:
          pickString(fields, ["founderLabel", "founderName"]) ||
          conversionSeed.authority.founderLabel,
        wins: wins.length ? wins : conversionSeed.authority.wins,
        founderImageUrl: assetUrl(fields.founderImage),
        founderImageAlt: assetAlt(
          fields.founderImage,
          pickString(fields, ["founderLabel", "founderName"]) || "Founder"
        ),
      },
      pillarsSection: {
        eyebrow:
          pickString(fields, ["pillarsEyebrow"]) ||
          conversionSeed.pillarsSection.eyebrow,
        heading:
          pickString(fields, ["pillarsHeading"]) ||
          conversionSeed.pillarsSection.heading,
      },
      pillars: pillars.length ? pillars : conversionSeed.pillars,
      menuSection: {
        eyebrow:
          pickString(fields, ["menuEyebrow"]) || conversionSeed.menuSection.eyebrow,
        heading:
          pickString(fields, ["menuHeading"]) || conversionSeed.menuSection.heading,
      },
      menuItems: menuItems.length ? menuItems : conversionSeed.menuItems,
      partnersSection: {
        eyebrow:
          pickString(fields, ["partnersEyebrow"]) ||
          conversionSeed.partnersSection.eyebrow,
        heading:
          pickString(fields, ["partnersHeading"]) ||
          conversionSeed.partnersSection.heading,
      },
      vendors: vendors.length ? vendors : conversionSeed.vendors,
      contact: {
        heading:
          pickString(fields, ["contactHeading"]) ||
          conversionSeed.contact.heading,
        subheading:
          pickString(fields, ["contactSubheading"]) ||
          conversionSeed.contact.subheading,
        responseNote:
          pickString(fields, ["contactResponseNote", "responseNote"]) ||
          conversionSeed.contact.responseNote,
        ctaLabel:
          pickString(fields, ["contactCtaLabel"]) ||
          conversionSeed.contact.ctaLabel,
      },
    };
  } catch {
    // Type may not exist yet in Contentful
    return conversionSeed;
  }
}
