/**
 * Seed all live marketing routes from TypeScript seed files.
 *
 * Homepage, /services, /franchisees, /about, footer chrome.
 * Does not seed conversionVendor (vendor-agnostic — logo cloud retired).
 *
 * Run: npm run contentful:seed
 */
import { conversionSeed } from "./conversion-seed-data.mjs";
import {
  ensureStagingEnvironment,
  getManagementClient,
  localeFields,
  link,
  STAGING_ENV_ID,
  upsertEntry,
} from "./lib.mjs";

const environmentId = process.env.CONTENTFUL_ENVIRONMENT?.trim() || STAGING_ENV_ID;

const PILLAR_IDS = [
  "conversion-pillar-program-lifecycle",
  "conversion-pillar-tech-stack",
  "conversion-pillar-ecosystem",
];

const MENU_IDS = [
  "conversion-menu-revenue",
  "conversion-menu-partnerships",
  "conversion-menu-delivery",
  "conversion-menu-vendor-governance",
  "conversion-menu-loyalty",
  "conversion-menu-data",
];

const HOMEPAGE_ID = "conversion-homepage-website-2";
const SERVICES_PAGE_ID = "services-page-website-2";
const FRANCHISEE_PAGE_ID = "franchisee-landing-website-2";

const SERVICE_MODE_IDS = [
  "services-mode-advisory",
  "services-mode-fractional",
  "services-mode-project",
];

const SERVICE_CAP_IDS = [
  "services-cap-pos",
  "services-cap-kiosk",
  "services-cap-loyalty",
  "services-cap-delivery",
  "services-cap-kitchen",
  "services-cap-reporting",
  "services-cap-roadmap",
  "services-cap-vendor",
];

const FRANCHISEE_PAIN_IDS = [
  "franchisee-pain-fragmented",
  "franchisee-pain-margin",
  "franchisee-pain-lockin",
];

const FRANCHISEE_OFFER_IDS = [
  "franchisee-offer-assessment",
  "franchisee-offer-pos",
  "franchisee-offer-payments",
];

async function loadTsSeeds() {
  const [{ servicesPageCopy }, { aboutSeed, ABOUT_TITLE_ENTRY_ID }, { franchiseeCopy }] =
    await Promise.all([
      import("../../src/lib/content/services-page.ts"),
      import("../../src/lib/content/about-seed.ts"),
      import("../../src/lib/franchisees/copy.ts"),
    ]);
  return { servicesPageCopy, aboutSeed, ABOUT_TITLE_ENTRY_ID, franchiseeCopy };
}

function both(en, es) {
  return localeFields(en, es);
}

async function seedHomepage(environment) {
  const pillarLinks = [];
  for (let index = 0; index < conversionSeed.pillars.length; index += 1) {
    const pillar = conversionSeed.pillars[index];
    const entryId = PILLAR_IDS[index];
    const entry = await upsertEntry(environment, "conversionPillar", entryId, {
      title: localeFields(pillar.title),
      body: localeFields(pillar.body),
      lucideIcon: localeFields(pillar.lucideIcon),
    });
    if (entry) pillarLinks.push(link(entry.sys.id));
  }

  const menuLinks = [];
  for (let index = 0; index < conversionSeed.menuItems.length; index += 1) {
    const item = conversionSeed.menuItems[index];
    const entryId = MENU_IDS[index];
    const entry = await upsertEntry(environment, "conversionMenuItem", entryId, {
      title: localeFields(item.title),
      body: localeFields(item.body),
    });
    if (entry) menuLinks.push(link(entry.sys.id));
  }

  await upsertEntry(environment, "conversionHomepage", HOMEPAGE_ID, {
    heroHeading: localeFields(conversionSeed.hero.heading),
    heroSubheading: localeFields(conversionSeed.hero.subheading),
    heroCta: localeFields(conversionSeed.hero.ctaLabel),
    heroBrandLabel: localeFields(conversionSeed.hero.brandLabel),
    authorityEyebrow: localeFields(conversionSeed.authority.eyebrow),
    authorityHeading: localeFields(conversionSeed.authority.heading),
    authorityWinsLabel: localeFields(conversionSeed.authority.winsLabel),
    authorityBody: localeFields(conversionSeed.authority.body),
    founderLabel: localeFields(conversionSeed.authority.founderLabel),
    founderWins: localeFields(conversionSeed.authority.wins.join("\n")),
    pillarsEyebrow: localeFields(conversionSeed.pillarsSection.eyebrow),
    pillarsHeading: localeFields(conversionSeed.pillarsSection.heading),
    menuEyebrow: localeFields(conversionSeed.menuSection.eyebrow),
    menuHeading: localeFields(conversionSeed.menuSection.heading),
    pillars: localeFields(pillarLinks),
    menuItems: localeFields(menuLinks),
    contactHeading: localeFields(conversionSeed.contact.heading),
    contactSubheading: localeFields(conversionSeed.contact.subheading),
    contactResponseNote: localeFields(conversionSeed.contact.responseNote),
    contactCtaLabel: localeFields(conversionSeed.contact.ctaLabel),
    chromeCtaLabel: localeFields(conversionSeed.chrome.ctaLabel),
    navAuthority: localeFields(conversionSeed.chrome.navAuthority),
    navPillars: localeFields(conversionSeed.chrome.navPillars),
    navMenu: localeFields(conversionSeed.chrome.navMenu),
    navContact: localeFields(conversionSeed.chrome.navContact),
    footerTagline: localeFields(conversionSeed.chrome.footerTagline),
    footerGeo: localeFields(conversionSeed.chrome.footerGeo),
    footerEmail: localeFields(conversionSeed.chrome.footerEmail),
    linkedInUrl: localeFields(conversionSeed.chrome.linkedInUrl),
    instagramUrl: localeFields(conversionSeed.chrome.instagramUrl),
  });
}

async function seedServices(environment, servicesPageCopy) {
  const modeLinks = [];
  for (let index = 0; index < servicesPageCopy.modes.length; index += 1) {
    const item = servicesPageCopy.modes[index];
    const entry = await upsertEntry(
      environment,
      "conversionMenuItem",
      SERVICE_MODE_IDS[index],
      {
        title: localeFields(item.title),
        body: localeFields(item.body),
      }
    );
    if (entry) modeLinks.push(link(entry.sys.id));
  }

  const capLinks = [];
  for (let index = 0; index < servicesPageCopy.capabilities.length; index += 1) {
    const item = servicesPageCopy.capabilities[index];
    const entry = await upsertEntry(
      environment,
      "conversionMenuItem",
      SERVICE_CAP_IDS[index],
      {
        title: localeFields(item.title),
        body: localeFields(item.body),
      }
    );
    if (entry) capLinks.push(link(entry.sys.id));
  }

  await upsertEntry(environment, "servicesPage", SERVICES_PAGE_ID, {
    metaTitle: localeFields(servicesPageCopy.metaTitle),
    metaDescription: localeFields(servicesPageCopy.metaDescription),
    eyebrow: localeFields(servicesPageCopy.eyebrow),
    heading: localeFields(servicesPageCopy.heading),
    intro: localeFields(servicesPageCopy.intro),
    modes: localeFields(modeLinks),
    capabilitiesEyebrow: localeFields(servicesPageCopy.capabilitiesEyebrow),
    capabilitiesHeading: localeFields(servicesPageCopy.capabilitiesHeading),
    capabilities: localeFields(capLinks),
    notHeading: localeFields(servicesPageCopy.notHeading),
    notItems: localeFields(servicesPageCopy.notItems.join("\n")),
    ctaHeading: localeFields(servicesPageCopy.ctaHeading),
    ctaBody: localeFields(servicesPageCopy.ctaBody),
    ctaLabel: localeFields(servicesPageCopy.ctaLabel),
  });
}

async function seedFranchisees(environment, franchiseeCopy) {
  const en = franchiseeCopy.en;
  const es = franchiseeCopy.es;

  const painLinks = [];
  for (let index = 0; index < en.pains.length; index += 1) {
    const entry = await upsertEntry(
      environment,
      "conversionMenuItem",
      FRANCHISEE_PAIN_IDS[index],
      {
        title: both(en.pains[index].title, es.pains[index].title),
        body: both(en.pains[index].body, es.pains[index].body),
      }
    );
    if (entry) painLinks.push(link(entry.sys.id));
  }

  const offerLinks = [];
  for (let index = 0; index < en.offers.length; index += 1) {
    const entry = await upsertEntry(
      environment,
      "conversionMenuItem",
      FRANCHISEE_OFFER_IDS[index],
      {
        title: both(en.offers[index].title, es.offers[index].title),
        body: both(en.offers[index].body, es.offers[index].body),
      }
    );
    if (entry) offerLinks.push(link(entry.sys.id));
  }

  await upsertEntry(environment, "franchiseeLandingPage", FRANCHISEE_PAGE_ID, {
    metaTitle: both(en.metaTitle, es.metaTitle),
    metaDescription: both(en.metaDescription, es.metaDescription),
    htmlLang: both(en.htmlLang, es.htmlLang),
    navLabel: both(en.navLabel, es.navLabel),
    otherLocaleLabel: both(en.otherLocaleLabel, es.otherLocaleLabel),
    otherLocaleHref: both(en.otherLocaleHref, es.otherLocaleHref),
    heroEyebrow: both(en.heroEyebrow, es.heroEyebrow),
    heroHeadline: both(en.heroHeadline, es.heroHeadline),
    heroSubheadline: both(en.heroSubheadline, es.heroSubheadline),
    heroPrimaryCta: both(en.heroPrimaryCta, es.heroPrimaryCta),
    heroSecondaryCta: both(en.heroSecondaryCta, es.heroSecondaryCta),
    trustMetric: both(en.trustMetric, es.trustMetric),
    painHeading: both(en.painHeading, es.painHeading),
    painIntro: both(en.painIntro, es.painIntro),
    pains: localeFields(painLinks),
    offersHeading: both(en.offersHeading, es.offersHeading),
    offersIntro: both(en.offersIntro, es.offersIntro),
    offers: localeFields(offerLinks),
    assessmentHeading: both(en.assessmentHeading, es.assessmentHeading),
    assessmentIntro: both(en.assessmentIntro, es.assessmentIntro),
    assessmentCta: both(en.assessmentCta, es.assessmentCta),
    questions: both(en.questions, es.questions),
    captureHeading: both(en.capture.heading, es.capture.heading),
    captureIntro: both(en.capture.intro, es.capture.intro),
    captureName: both(en.capture.name, es.capture.name),
    captureEmail: both(en.capture.email, es.capture.email),
    captureCompany: both(en.capture.company, es.capture.company),
    captureSubmit: both(en.capture.submit, es.capture.submit),
    captureSubmitting: both(en.capture.submitting, es.capture.submitting),
    captureError: both(en.capture.error, es.capture.error),
    resultsHeading: both(en.results.heading, es.results.heading),
    resultOptimized: both(en.results.bands.optimized, es.results.bands.optimized),
    resultScaling: both(en.results.bands.scaling, es.results.bands.scaling),
    resultFragmented: both(
      en.results.bands.fragmented,
      es.results.bands.fragmented
    ),
    resultsNextCta: both(en.results.nextCta, es.results.nextCta),
    resultsRestart: both(en.results.restart, es.results.restart),
    nextLabel: both(en.next, es.next),
    backLabel: both(en.back, es.back),
  });
}

async function seedAbout(environment, aboutSeed, titleId) {
  await upsertEntry(environment, "aboutUsTitleSubtitle", titleId, {
    heading: localeFields(aboutSeed.heading),
    subheading: localeFields(aboutSeed.subheading),
  });

  for (const card of aboutSeed.cards) {
    await upsertEntry(environment, "aboutUsCard", card.id, {
      title: localeFields(card.title),
      description: localeFields(card.description),
      lucideIcon: localeFields(card.lucideIcon),
    });
  }
}

async function main() {
  const { client, spaceId } = getManagementClient();
  const space = await client.getSpace(spaceId);

  if (environmentId === STAGING_ENV_ID) {
    await ensureStagingEnvironment(client, spaceId);
  }

  const environment = await space.getEnvironment(environmentId);
  console.log(`Seeding website content on "${environmentId}"…`);

  const { servicesPageCopy, aboutSeed, ABOUT_TITLE_ENTRY_ID, franchiseeCopy } =
    await loadTsSeeds();

  console.log("\nHomepage");
  await seedHomepage(environment);

  console.log("\nServices");
  await seedServices(environment, servicesPageCopy);

  console.log("\nFranchisees");
  await seedFranchisees(environment, franchiseeCopy);

  console.log("\nAbout");
  await seedAbout(environment, aboutSeed, ABOUT_TITLE_ENTRY_ID);

  console.log("\nSeed complete. Vendor logo entries are not written.");
  console.log(
    `Set CONTENTFUL_ENVIRONMENT=${environmentId} on Preview to read this content.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
