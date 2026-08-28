/**
 * Seed conversion homepage entries from conversion-seed.ts values.
 */
import { createRequire } from "node:module";
import { register } from "ts-node";
import {
  ensureStagingEnvironment,
  getManagementClient,
  STAGING_ENV_ID,
} from "./lib.mjs";

register({ transpileOnly: true, compilerOptions: { module: "CommonJS" } });
const require = createRequire(import.meta.url);
const { conversionSeed } = require("../../src/lib/content/conversion-seed.ts");

const environmentId = process.env.CONTENTFUL_ENVIRONMENT?.trim() || STAGING_ENV_ID;

const PILLAR_IDS = [
  "conversion-pillar-program-lifecycle",
  "conversion-pillar-tech-stack",
  "conversion-pillar-ecosystem",
];

const MENU_IDS = [
  "conversion-menu-revenue",
  "conversion-menu-partnerships",
];

const VENDOR_IDS = [
  "conversion-vendor-oracle",
  "conversion-vendor-ncr",
  "conversion-vendor-toast",
  "conversion-vendor-deliverect",
  "conversion-vendor-tillster",
  "conversion-vendor-grubbrr",
  "conversion-vendor-hme",
  "conversion-vendor-r365",
];

const HOMEPAGE_ID = "conversion-homepage-website-2";

async function upsertEntry(environment, contentType, entryId, fields) {
  try {
    const entry = await environment.getEntry(entryId);
    entry.fields = fields;
    const updated = await entry.update();
    const published = await updated.publish();
    console.log(`  updated + published ${contentType} (${entryId})`);
    return published;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("NotFound") && !message.includes("404")) {
      throw error;
    }
  }

  const created = await environment.createEntryWithId(contentType, entryId, { fields });
  const published = await created.publish();
  console.log(`  created + published ${contentType} (${entryId})`);
  return published;
}

function localeFields(value) {
  return { "en-US": value };
}

async function main() {
  const { client, spaceId } = getManagementClient();
  const space = await client.getSpace(spaceId);

  if (environmentId === STAGING_ENV_ID) {
    await ensureStagingEnvironment(client, spaceId);
  }

  const environment = await space.getEnvironment(environmentId);
  console.log(`Seeding conversion content on "${environmentId}"…`);

  const pillarLinks = [];
  for (let index = 0; index < conversionSeed.pillars.length; index += 1) {
    const pillar = conversionSeed.pillars[index];
    const entryId = PILLAR_IDS[index];
    const entry = await upsertEntry(environment, "conversionPillar", entryId, {
      title: localeFields(pillar.title),
      body: localeFields(pillar.body),
      lucideIcon: localeFields(pillar.lucideIcon),
    });
    pillarLinks.push({
      sys: { type: "Link", linkType: "Entry", id: entry.sys.id },
    });
  }

  const menuLinks = [];
  for (let index = 0; index < conversionSeed.menuItems.length; index += 1) {
    const item = conversionSeed.menuItems[index];
    const entryId = MENU_IDS[index];
    const entry = await upsertEntry(environment, "conversionMenuItem", entryId, {
      title: localeFields(item.title),
      body: localeFields(item.body),
    });
    menuLinks.push({
      sys: { type: "Link", linkType: "Entry", id: entry.sys.id },
    });
  }

  const vendorLinks = [];
  for (let index = 0; index < conversionSeed.vendors.length; index += 1) {
    const vendor = conversionSeed.vendors[index];
    const entryId = VENDOR_IDS[index];
    const entry = await upsertEntry(environment, "conversionVendor", entryId, {
      name: localeFields(vendor.name),
    });
    vendorLinks.push({
      sys: { type: "Link", linkType: "Entry", id: entry.sys.id },
    });
  }

  await upsertEntry(environment, "conversionHomepage", HOMEPAGE_ID, {
    heroHeading: localeFields(conversionSeed.hero.heading),
    heroSubheading: localeFields(conversionSeed.hero.subheading),
    heroCta: localeFields(conversionSeed.hero.ctaLabel),
    authorityBody: localeFields(conversionSeed.authority.body),
    founderLabel: localeFields(conversionSeed.authority.founderLabel),
    founderWins: localeFields(conversionSeed.authority.wins.join("\n")),
    pillars: localeFields(pillarLinks),
    menuItems: localeFields(menuLinks),
    vendors: localeFields(vendorLinks),
    contactHeading: localeFields(conversionSeed.contact.heading),
    contactSubheading: localeFields(conversionSeed.contact.subheading),
    contactResponseNote: localeFields(conversionSeed.contact.responseNote),
    contactCtaLabel: localeFields(conversionSeed.contact.ctaLabel),
    chromeCtaLabel: localeFields(conversionSeed.chrome.ctaLabel),
    navAuthority: localeFields(conversionSeed.chrome.navAuthority),
    navPillars: localeFields(conversionSeed.chrome.navPillars),
    navMenu: localeFields(conversionSeed.chrome.navMenu),
    navPartners: localeFields(conversionSeed.chrome.navPartners),
    navContact: localeFields(conversionSeed.chrome.navContact),
  });

  console.log("\nSeed complete.");
  console.log(`Set CONTENTFUL_ENVIRONMENT=${environmentId} on Preview to read this content.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
