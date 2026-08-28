/**
 * Delete unused Contentful types (Phase 1 prep). See docs/website-2.0/contentful.md retire list.
 */
import { config } from "dotenv";
import contentfulManagement from "contentful-management";
import { getManagementClient, sleep } from "./lib.mjs";

config({ path: ".env.local" });

const { createClient } = contentfulManagement;

/** Not fetched by any live Website 2.0 route. */
const TYPES_TO_DELETE = [
  "faqSection",
  "faqItem",
  "forWhomSection",
  "forWhomCard",
  "offeringsSection",
  "offeringMode",
  "proofSection",
  "proofBeat",
  "howWeWorkSection",
  "howWeWorkStep",
  "siteChrome",
];

const environmentId = process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master";

async function deleteAllEntries(environment, contentTypeId) {
  let skip = 0;
  let total = 0;
  while (true) {
    const page = await environment.getEntries({
      content_type: contentTypeId,
      limit: 100,
      skip,
    });
    if (!page.items.length) break;
    for (const entry of page.items) {
      try {
        if (entry.isPublished()) {
          await entry.unpublish();
        }
        await entry.delete();
        total += 1;
        console.log(`  deleted entry ${entry.sys.id} (${contentTypeId})`);
      } catch (error) {
        console.warn(`  entry ${entry.sys.id} delete failed:`, error.message);
      }
    }
    skip += page.items.length;
    if (skip >= page.total) break;
  }
  return total;
}

async function deleteContentType(environment, contentTypeId) {
  try {
    const ct = await environment.getContentType(contentTypeId);
    if (ct.isPublished()) {
      await ct.unpublish();
    }
    await ct.delete();
    console.log(`deleted content type ${contentTypeId}`);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("NotFound") || message.includes("404")) {
      console.log(`content type ${contentTypeId} already absent`);
      return false;
    }
    throw error;
  }
}

async function main() {
  const { client, spaceId } = getManagementClient();
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  console.log(`Removing ${TYPES_TO_DELETE.length} unused types on "${environmentId}"…`);

  for (const contentTypeId of TYPES_TO_DELETE) {
    console.log(`\n→ ${contentTypeId}`);
    const entriesRemoved = await deleteAllEntries(environment, contentTypeId);
    if (entriesRemoved === 0) {
      console.log("  (no entries)");
    }
    await deleteContentType(environment, contentTypeId);
    await sleep(300);
  }

  const remaining = await environment.getContentTypes({ limit: 0 });
  console.log(`\nDone. Content types remaining on ${environmentId}: ${remaining.total}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
