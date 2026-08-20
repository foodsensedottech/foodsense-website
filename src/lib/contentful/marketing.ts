import client from "@/lib/contentful/client";
import { assetImage, pickNumber, pickString } from "@/lib/contentful/fields";
import { defaultSiteChrome } from "@/lib/copy/chrome-defaults";
import {
  SITE_EMAIL,
  aboutCopy,
  contactCopy,
  faqCopy,
  forWhomCopy,
  heroCopy,
  howWeWorkCopy,
  offeringsCopy,
  proofCopy,
  servicesCopy,
} from "@/lib/copy/site";
import type {
  AboutMarketingCopy,
  ContactCopyResolved,
  CopyCardData,
  HeroCopyResolved,
  HomeMarketingCopy,
  ServicesMarketingCopy,
  SiteChromeCopy,
} from "@/lib/copy/resolved";

const TYPES = {
  chrome: "siteChrome",
  hero: "heroFields",
  forWhom: "forWhomSection",
  forWhomCard: "forWhomCard",
  offerings: "offeringsSection",
  offeringMode: "offeringMode",
  howWeWork: "howWeWorkSection",
  howWeWorkStep: "howWeWorkStep",
  proof: "proofSection",
  proofBeat: "proofBeat",
  faq: "faqSection",
  faqItem: "faqItem",
  contact: "contactSection",
  services: "servicePage",
  serviceDomain: "serviceDomain",
  about: "aboutPage",
  aboutDifference: "aboutDifference",
} as const;

type Fields = Record<string, unknown>;

async function getSingleton(contentType: string): Promise<Fields | null> {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      limit: 1,
      include: 2,
      order: ["-sys.updatedAt"],
    });
    const fields = response.items[0]?.fields;
    return fields ? (fields as Fields) : null;
  } catch (error) {
    console.error(`Contentful ${contentType} unavailable:`, error);
    return null;
  }
}

async function getList(contentType: string): Promise<Fields[]> {
  try {
    const response = await client.getEntries({
      content_type: contentType,
      include: 2,
      limit: 40,
    });
    return response.items
      .map((item) => item.fields as Fields)
      .sort(
        (a, b) =>
          pickNumber(a, ["sortOrder", "order"], 50) -
          pickNumber(b, ["sortOrder", "order"], 50)
      );
  } catch (error) {
    console.error(`Contentful ${contentType} list unavailable:`, error);
    return [];
  }
}

function text(fields: Fields | null, keys: string[], fallback: string): string {
  return pickString(fields ?? undefined, keys, fallback);
}

function toCards(
  entries: Fields[],
  fallback: CopyCardData[],
  extraKeys: string[] = ["extra", "doNot", "stacks"]
): CopyCardData[] {
  if (!entries.length) return fallback;
  return entries
    .map((fields) => ({
      title: pickString(fields, ["title", "headline"]),
      body: pickString(fields, ["body", "description"]),
      extra: pickString(fields, extraKeys) || undefined,
      image: assetImage(fields),
    }))
    .filter((card) => card.title);
}

function defaultChrome(): SiteChromeCopy {
  return defaultSiteChrome();
}

function mapChrome(fields: Fields | null): SiteChromeCopy {
  const fallback = defaultChrome();
  if (!fields) return fallback;
  return {
    ctaLabel: text(fields, ["ctaLabel"], fallback.ctaLabel),
    navItems: [
      {
        label: text(fields, ["navOfferings"], "Offerings"),
        href: "/#franchisee-offers",
      },
      {
        label: text(fields, ["navServices"], "Services"),
        href: "/services",
      },
      { label: text(fields, ["navAbout"], "About"), href: "/about" },
      { label: text(fields, ["navContact"], "Contact"), href: "/contact" },
    ],
    footerTagline: text(fields, ["footerTagline"], fallback.footerTagline),
    footerGeo: text(fields, ["footerGeo"], fallback.footerGeo),
    footerEmail: text(fields, ["footerEmail"], fallback.footerEmail),
    linkedInUrl: text(fields, ["linkedInUrl"], fallback.linkedInUrl),
    instagramUrl: text(fields, ["instagramUrl"], fallback.instagramUrl),
    cookieHeadline: text(fields, ["cookieHeadline"], fallback.cookieHeadline),
    cookieBody: text(fields, ["cookieBody"], fallback.cookieBody),
    cookieAccept: text(fields, ["cookieAccept"], fallback.cookieAccept),
    cookieReject: text(fields, ["cookieReject"], fallback.cookieReject),
  };
}

function mapHero(
  fields: Fields | null,
  backgroundImage: CmsImage | null
): HeroCopyResolved {
  return {
    eyebrow: text(fields, ["heroEyebrow", "eyebrow"], heroCopy.eyebrow),
    headline: text(
      fields,
      ["heroHeading", "heroHeadline", "headline"],
      heroCopy.headline
    ),
    subhead: text(
      fields,
      ["heroSubheading", "subhead", "subtitle"],
      heroCopy.subhead
    ),
    primaryCta: text(fields, ["heroCta", "ctaLabel"], heroCopy.primaryCta),
    primaryHref: text(fields, ["heroCtaHref"], heroCopy.primaryHref),
    backgroundImage,
  };
}

function mapContact(fields: Fields | null): ContactCopyResolved {
  return {
    headline: text(fields, ["headline", "title"], contactCopy.headline),
    body: text(fields, ["body", "subtitle"], contactCopy.body),
    modeNote: text(fields, ["modeNote"], contactCopy.modeNote),
    submitLabel: text(fields, ["submitLabel"], contactCopy.submitLabel),
    submittingLabel: text(
      fields,
      ["submittingLabel"],
      contactCopy.submittingLabel
    ),
    success: text(fields, ["successMessage", "success"], contactCopy.success),
    error: text(fields, ["errorMessage", "error"], contactCopy.error),
    locationsHelper: text(
      fields,
      ["locationsHelper"],
      contactCopy.locationsHelper
    ),
    calendarHeadline: text(
      fields,
      ["calendarHeadline"],
      "Prefer a time on the calendar"
    ),
    calendarBody: text(
      fields,
      ["calendarBody"],
      `Calendar embed is coming once the booking URL is set. Until then, use the form or email ${SITE_EMAIL}.`
    ),
  };
}

export async function getSiteChrome(): Promise<SiteChromeCopy> {
  const fields = await getSingleton(TYPES.chrome);
  return mapChrome(fields);
}

export async function getHomeMarketingCopy(): Promise<HomeMarketingCopy> {
  const [
    chromeFields,
    heroFields,
    forWhomFields,
    forWhomCards,
    offeringsFields,
    offeringModes,
    howFields,
    howSteps,
    proofFields,
    proofBeats,
    faqFields,
    faqItems,
    contactFields,
  ] = await Promise.all([
    getSingleton(TYPES.chrome),
    getSingleton(TYPES.hero),
    getSingleton(TYPES.forWhom),
    getList(TYPES.forWhomCard),
    getSingleton(TYPES.offerings),
    getList(TYPES.offeringMode),
    getSingleton(TYPES.howWeWork),
    getList(TYPES.howWeWorkStep),
    getSingleton(TYPES.proof),
    getList(TYPES.proofBeat),
    getSingleton(TYPES.faq),
    getList(TYPES.faqItem),
    getSingleton(TYPES.contact),
  ]);

  return {
    chrome: mapChrome(chromeFields),
    hero: mapHero(heroFields, assetImage(heroFields ?? undefined, ["backgroundImage", "image"])),
    forWhom: {
      headline: text(forWhomFields, ["headline"], forWhomCopy.headline),
      intro: text(forWhomFields, ["intro"], forWhomCopy.intro),
      icp: text(forWhomFields, ["primaryAudience", "icp"], forWhomCopy.icp),
      notFor: text(forWhomFields, ["notCustomer", "notFor"], forWhomCopy.notFor),
      replaceIntro: text(
        forWhomFields,
        ["replaceIntro"],
        forWhomCopy.replaceIntro
      ),
      floor: text(forWhomFields, ["floorNote", "floor"], forWhomCopy.floor),
      cards: toCards(
        forWhomCards,
        forWhomCopy.doesNotReplace.map((item) => ({
          title: item.title,
          body: item.body,
        }))
      ),
    },
    offerings: {
      headline: text(offeringsFields, ["headline"], offeringsCopy.headline),
      body: text(offeringsFields, ["body"], offeringsCopy.body),
      modes: toCards(
        offeringModes,
        offeringsCopy.modes.map((mode) => ({
          title: mode.title,
          body: mode.body,
          extra: mode.doNot,
        })),
        ["doNot", "extra"]
      ),
    },
    howWeWork: {
      headline: text(howFields, ["headline"], howWeWorkCopy.headline),
      intro: text(howFields, ["intro"], howWeWorkCopy.intro),
      close: text(howFields, ["close", "ctaLabel"], howWeWorkCopy.close),
      steps: toCards(
        howSteps,
        howWeWorkCopy.steps.map((step) => ({
          title: step.title,
          body: step.body,
        }))
      ),
    },
    proof: {
      headline: text(proofFields, ["headline"], proofCopy.headline),
      origin: text(proofFields, ["origin"], proofCopy.origin),
      villain: text(proofFields, ["villain"], proofCopy.villain),
      attribution: text(
        proofFields,
        ["attributionNote", "attribution"],
        proofCopy.attribution
      ),
      beats: toCards(
        proofBeats,
        proofCopy.beats.map((beat) => ({
          title: beat.title,
          body: beat.body,
        }))
      ),
    },
    faq: {
      headline: text(faqFields, ["headline"], faqCopy.headline),
      items: faqItems.length
        ? faqItems
            .map((fields) => ({
              question: pickString(fields, ["question", "title"]),
              answer: pickString(fields, ["answer", "body"]),
            }))
            .filter((item) => item.question)
        : faqCopy.items.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
    },
    contact: mapContact(contactFields),
  };
}

export async function getServicesMarketingCopy(): Promise<ServicesMarketingCopy> {
  const [chrome, page, domains] = await Promise.all([
    getSiteChrome(),
    getSingleton(TYPES.services),
    getList(TYPES.serviceDomain),
  ]);

  return {
    chrome,
    headline: text(page, ["headline"], servicesCopy.headline),
    body: text(page, ["body"], servicesCopy.body),
    modesRecapHeadline: text(
      page,
      ["modesRecapHeadline"],
      servicesCopy.modesRecapHeadline
    ),
    modesRecapBody: text(
      page,
      ["modesRecapBody"],
      servicesCopy.modesRecapBody
    ),
    modeLine: text(page, ["modeLine"], servicesCopy.modeLine),
    closeHeadline: text(page, ["closeHeadline"], servicesCopy.closeHeadline),
    closeBody: text(page, ["closeBody"], servicesCopy.closeBody),
    domains: toCards(
      domains,
      servicesCopy.domains.map((domain) => ({
        title: domain.title,
        body: domain.body,
        extra: domain.stacks ?? undefined,
      })),
      ["stacks", "stacksLine", "extra"]
    ),
  };
}

export async function getAboutMarketingCopy(): Promise<AboutMarketingCopy> {
  const [chrome, page, differences, beats] = await Promise.all([
    getSiteChrome(),
    getSingleton(TYPES.about),
    getList(TYPES.aboutDifference),
    getList(TYPES.proofBeat),
  ]);

  return {
    chrome,
    headline: text(page, ["headline"], aboutCopy.headline),
    body: text(page, ["body"], aboutCopy.body),
    conferenceLine: text(page, ["conferenceLine"], aboutCopy.conferenceLine),
    originHeadline: text(page, ["originHeadline"], aboutCopy.originHeadline),
    originBody: text(page, ["originBody"], aboutCopy.originBody),
    resumeHeadline: text(page, ["resumeHeadline"], aboutCopy.resumeHeadline),
    resumeDisclaimer: text(
      page,
      ["resumeDisclaimer"],
      aboutCopy.resumeDisclaimer
    ),
    differenceHeadline: text(
      page,
      ["differenceHeadline"],
      aboutCopy.differenceHeadline
    ),
    beats: toCards(
      beats,
      proofCopy.beats.map((beat) => ({
        title: beat.title,
        body: beat.body,
      }))
    ),
    differences: toCards(
      differences,
      aboutCopy.differences.map((item) => ({
        title: item.title,
        body: item.body,
      }))
    ),
  };
}

export async function getContactMarketingCopy(): Promise<{
  chrome: SiteChromeCopy;
  contact: ContactCopyResolved;
}> {
  const [chrome, contact] = await Promise.all([
    getSiteChrome(),
    getSingleton(TYPES.contact),
  ]);
  return { chrome, contact: mapContact(contact) };
}
