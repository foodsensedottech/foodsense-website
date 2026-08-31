/**
 * Refresh About page CMS copy to Brand OS voice.
 * Run: CONTENTFUL_ENVIRONMENT=master node scripts/contentful/update-about-copy.mjs
 */
import {
  getManagementClient,
  STAGING_ENV_ID,
} from "./lib.mjs";

const environmentId =
  process.env.CONTENTFUL_ENVIRONMENT?.trim() || STAGING_ENV_ID;

const ABOUT_TITLE_ID = "5tTay5jmvkeJCPx27jw2Dk";

const ABOUT_CARDS = [
  {
    id: "3bYkWJrCQf7JNbTgmJvYAW",
    title: "Operator-first, not deck-first",
    description:
      "We've been in the store at 6am during cutover. We review payloads, sit in integration tests, and hold vendors accountable — then leave your teams able to run the stack.",
    lucideIcon: "Computer",
  },
  {
    id: "42voWpqVNwVz30lYAC5Z3j",
    title: "Built for 10+ unit operators",
    description:
      "We write for multi-unit QSR and franchise groups that need stack standardization — not single-unit independents, and not strategy PDFs with no execution path.",
    lucideIcon: "TrendingUp",
  },
  {
    id: "ut5Pk0Znki7QJRqqZAU7d",
    title: "LATAM, Caribbean, and US",
    description:
      "Multi-market is normal here. Bilingual delivery across regulatory, vendor, and franchise maturity differences — without a one-size playbook.",
    lucideIcon: "Globe",
  },
  {
    id: "8KX0fVS0xR93B3Alft7Ib",
    title: "Test, prove, scale",
    description:
      "Advisory names the gap. Fractional or Project carries the work. We phase everything: pilot first, prove the KPI, then scale — never big-bang.",
    lucideIcon: "ListChecks",
  },
];

function localeFields(value) {
  return { "en-US": value };
}

async function updateAndPublish(entry, fields) {
  entry.fields = { ...entry.fields, ...fields };
  const updated = await entry.update();
  return updated.publish();
}

async function main() {
  const { client, spaceId } = getManagementClient();
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);
  console.log(`Updating About copy on "${environmentId}"…`);

  const title = await environment.getEntry(ABOUT_TITLE_ID);
  await updateAndPublish(title, {
    heading: localeFields("About FoodSense"),
    subheading: localeFields(
      "A boutique consultancy at the intersection of restaurant operations and technology. We help 10+ unit growth-stage brands and multi-unit franchisees build, integrate, and scale the stack that runs every shift."
    ),
  });
  console.log("  updated aboutUsTitleSubtitle");

  for (const card of ABOUT_CARDS) {
    const entry = await environment.getEntry(card.id);
    await updateAndPublish(entry, {
      title: localeFields(card.title),
      description: localeFields(card.description),
      lucideIcon: localeFields(card.lucideIcon),
    });
    console.log(`  updated aboutUsCard (${card.id}) — ${card.title}`);
  }

  console.log("\nAbout copy update complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
