/**
 * Phase 1 Contentful — staging environment, migrations, seed.
 *
 * Requires CONTENTFUL_MANAGEMENT_TOKEN (CMA), not the delivery API token.
 */
import { config } from "dotenv";
import {
  ensureStagingEnvironment,
  getManagementClient,
  runMigrationFile,
  STAGING_ENV_ID,
} from "./lib.mjs";

config({ path: ".env.local" });

const MIGRATIONS = [
  "001-fix-seo-metadata-page-id.js",
  "002-create-conversion-types.js",
];

async function verifyDelivery() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT || STAGING_ENV_ID;
  if (!spaceId || !token) return;

  const url = new URL(
    `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries`
  );
  url.searchParams.set("access_token", token);
  url.searchParams.set("content_type", "conversionHomepage");
  url.searchParams.set("limit", "1");

  const response = await fetch(url);
  if (!response.ok) {
    console.warn(`Delivery API check failed: ${response.status}`);
    return;
  }
  const json = await response.json();
  const item = json.items?.[0];
  if (item) {
    console.log(`\nVerified conversionHomepage via delivery API (${environmentId}). Entry: ${item.sys.id}`);
  } else {
    console.warn(`No conversionHomepage entry found on ${environmentId} via delivery API yet.`);
  }
}

async function main() {
  const { client, spaceId, accessToken } = getManagementClient();
  await ensureStagingEnvironment(client, spaceId);

  for (const file of MIGRATIONS) {
    runMigrationFile(file, spaceId, accessToken, STAGING_ENV_ID);
  }

  console.log("\nMigrations applied on staging. Running seed…");
  process.env.CONTENTFUL_ENVIRONMENT = STAGING_ENV_ID;
  const { spawnSync } = await import("node:child_process");
  const seed = spawnSync("node", ["scripts/contentful/seed-conversion-homepage.mjs"], {
    stdio: "inherit",
    cwd: process.cwd(),
  });
  if (seed.status !== 0) {
    process.exit(seed.status ?? 1);
  }

  await verifyDelivery();

  console.log("\nPhase 1 complete on staging.");
  console.log("Next: set CONTENTFUL_ENVIRONMENT=staging on Website 2.0 Preview and verify homepage CMS copy.");
  console.log("After sign-off: run migrations on master (see docs/engineering/contentful-phase1.md).");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
