/**
 * Review and delete unused Contentful types (Phase 1 cleanup).
 *
 * Usage:
 *   node scripts/contentful/delete-unused-types.mjs           # review only
 *   node scripts/contentful/delete-unused-types.mjs --apply     # delete on CONTENTFUL_ENVIRONMENT (default master)
 *   node scripts/contentful/delete-unused-types.mjs --apply --all  # delete on master + staging
 */
import { config } from "dotenv";
import { getManagementClient, sleep, STAGING_ENV_ID } from "./lib.mjs";

config({ path: ".env.local" });

/** Types actively used by Website 2.0 or deferred franchisee routes. */
const TYPES_TO_KEEP = new Set([
  "conversionHomepage",
  "conversionPillar",
  "conversionMenuItem",
  "aboutUsTitleSubtitle",
  "aboutUsCard",
  "servicesPage",
  "franchiseeLandingPage",
  "seoMetadata",
]);

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const runAll = args.includes("--all");

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
    console.log(`  deleted content type ${contentTypeId}`);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("NotFound") || message.includes("404")) {
      console.log(`  content type ${contentTypeId} already absent`);
      return false;
    }
    throw error;
  }
}

async function reviewEnvironment(environment, environmentId) {
  const types = await environment.getContentTypes({ limit: 100 });
  const rows = [];

  for (const ct of types.items.sort((a, b) =>
    a.sys.id.localeCompare(b.sys.id)
  )) {
    const entries = await environment.getEntries({
      content_type: ct.sys.id,
      limit: 0,
    });
    const keep = TYPES_TO_KEEP.has(ct.sys.id);
    rows.push({
      id: ct.sys.id,
      name: ct.name,
      entries: entries.total,
      keep,
    });
  }

  const toDelete = rows.filter((row) => !row.keep);
  const toKeep = rows.filter((row) => row.keep);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Environment: ${environmentId} (${types.total} content types)`);
  console.log(`${"=".repeat(60)}`);

  console.log(`\nKEEP (${toKeep.length}):`);
  for (const row of toKeep) {
    console.log(`  ✓ ${row.id} — ${row.entries} entries — ${row.name}`);
  }

  console.log(`\nREMOVE (${toDelete.length}):`);
  if (!toDelete.length) {
    console.log("  (none — model is clean)");
  } else {
    for (const row of toDelete) {
      console.log(
        `  ✗ ${row.id} — ${row.entries} entries — ${row.name}`
      );
    }
  }

  return toDelete.map((row) => row.id);
}

async function applyDeletions(environment, environmentId, typesToDelete) {
  if (!typesToDelete.length) {
    console.log(`\nNo deletions needed on ${environmentId}.`);
    return;
  }

  console.log(`\nApplying ${typesToDelete.length} deletion(s) on ${environmentId}…`);

  for (const contentTypeId of typesToDelete) {
    console.log(`\n→ ${contentTypeId}`);
    const entriesRemoved = await deleteAllEntries(environment, contentTypeId);
    if (entriesRemoved === 0) {
      console.log("  (no entries)");
    }
    await deleteContentType(environment, contentTypeId);
    await sleep(300);
  }

  const remaining = await environment.getContentTypes({ limit: 0 });
  console.log(
    `\nDone. Content types remaining on ${environmentId}: ${remaining.total}`
  );
}

async function processEnvironment(client, spaceId, environmentId) {
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);
  const typesToDelete = await reviewEnvironment(environment, environmentId);

  if (apply) {
    await applyDeletions(environment, environmentId, typesToDelete);
  }

  return typesToDelete.length;
}

async function main() {
  const { client, spaceId } = getManagementClient();
  const environments = runAll
    ? ["master", STAGING_ENV_ID]
    : [process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master"];

  if (!apply) {
    console.log("Review mode — pass --apply to delete listed types.");
    if (!runAll) {
      console.log(
        `Target: ${environments[0]} (use --all for master + staging)`
      );
    }
  }

  let totalPending = 0;
  for (const environmentId of environments) {
    totalPending += await processEnvironment(client, spaceId, environmentId);
  }

  if (!apply && totalPending > 0) {
    console.log(
      `\n${totalPending} type(s) marked for removal. Re-run with --apply to delete.`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
