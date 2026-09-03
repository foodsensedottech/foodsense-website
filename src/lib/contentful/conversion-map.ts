import {
  assetAlt,
  assetUrl,
  linesFromText,
  linkedEntries,
  mapTitleBody,
  pickString,
} from "@/lib/contentful/fields";
import {
  conversionSeed,
  type ConversionHomepage,
  type ConversionMenuItem,
  type ConversionPillar,
} from "@/lib/content/conversion-seed";

function mapPillar(fields: Record<string, unknown>): ConversionPillar | null {
  const item = mapTitleBody(fields);
  if (!item) return null;
  return {
    title: item.title,
    body: item.body,
    lucideIcon: pickString(fields, ["lucideIcon", "LucideIcon"]) || "ListChecks",
  };
}

/**
 * Map a `conversionHomepage` entry's fields. Ignores retired vendor/partners
 * fields. Footer keys are optional — seed fills them if the type has no
 * footerTagline yet.
 */
export function mapConversionHomepageFields(
  fields: Record<string, unknown>
): ConversionHomepage {
  const pillars = linkedEntries(fields.pillars)
    .map(mapPillar)
    .filter(Boolean) as ConversionPillar[];
  const menuItems = linkedEntries(fields.menuItems)
    .map(mapTitleBody)
    .filter(Boolean) as ConversionMenuItem[];

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
      navContact:
        pickString(fields, ["navContact"]) || conversionSeed.chrome.navContact,
      footerTagline:
        pickString(fields, ["footerTagline"]) ||
        conversionSeed.chrome.footerTagline,
      footerGeo:
        pickString(fields, ["footerGeo"]) || conversionSeed.chrome.footerGeo,
      footerEmail:
        pickString(fields, ["footerEmail"]) || conversionSeed.chrome.footerEmail,
      linkedInUrl:
        pickString(fields, ["linkedInUrl"]) || conversionSeed.chrome.linkedInUrl,
      instagramUrl:
        pickString(fields, ["instagramUrl"]) ||
        conversionSeed.chrome.instagramUrl,
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
}
