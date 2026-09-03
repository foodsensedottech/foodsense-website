/**
 * Apply migrations to CONTENTFUL_ENVIRONMENT (default staging).
 */
import { config } from "dotenv";
import {
  getManagementClient,
  runMigrationFile,
  STAGING_ENV_ID,
} from "./lib.mjs";

config({ path: ".env.local" });

const MIGRATIONS = [
  "001-fix-seo-metadata-page-id.js",
  "002-create-conversion-types.js",
  "003-conversion-section-headings.js",
  "004-cms-pages.js",
];

const environmentId = process.env.CONTENTFUL_ENVIRONMENT?.trim() || STAGING_ENV_ID;

const { spaceId, accessToken } = getManagementClient();

for (const file of MIGRATIONS) {
  runMigrationFile(file, spaceId, accessToken, environmentId);
}

console.log(`Migrations applied on ${environmentId}.`);
