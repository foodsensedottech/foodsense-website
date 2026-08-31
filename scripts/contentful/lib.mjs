import { config } from "dotenv";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { createClient } = require("contentful-management");

config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "..", "..");
export const MIGRATIONS_DIR = path.join(ROOT, "contentful", "migrations");
export const STAGING_ENV_ID = "staging";

export function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}. Add it to .env.local (Contentful → Settings → API keys → Content management tokens).`);
  }
  return value;
}

export function getManagementClient() {
  const spaceId = requireEnv("CONTENTFUL_SPACE_ID");
  const accessToken = requireEnv("CONTENTFUL_MANAGEMENT_TOKEN");
  // Newer contentful-management defaults to plain client (no getSpace).
  const client = createClient({ accessToken }, { type: "legacy" });
  return { client, spaceId, accessToken };
}

export async function ensureStagingEnvironment(client, spaceId) {
  const space = await client.getSpace(spaceId);
  try {
    const env = await space.getEnvironment(STAGING_ENV_ID);
    console.log(`Environment "${STAGING_ENV_ID}" already exists.`);
    return env;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("NotFound") && !message.includes("404")) {
      throw error;
    }
  }

  console.log(`Creating environment "${STAGING_ENV_ID}" from master…`);
  const env = await space.createEnvironmentWithId(STAGING_ENV_ID, {
    name: "Website 2.0 Staging",
  }, "master");

  console.log("Waiting for staging environment to process…");
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const status = await space.getEnvironment(STAGING_ENV_ID);
    const state = status.sys?.status?.sys?.id ?? status.sys?.status;
    if (state === "ready") {
      console.log(`Environment "${STAGING_ENV_ID}" is ready.`);
      return status;
    }
    await sleep(5000);
  }

  throw new Error(`Environment "${STAGING_ENV_ID}" did not become ready within 5 minutes.`);
}

export function runMigrationFile(fileName, spaceId, accessToken, environmentId) {
  const filePath = path.join(MIGRATIONS_DIR, fileName);
  console.log(`\n→ Migration ${fileName} on ${environmentId}`);
  const migrationBin = path.join(
    ROOT,
    "node_modules",
    "contentful-migration",
    "bin",
    "contentful-migration"
  );
  const result = spawnSync(
    "node",
    [
      migrationBin,
      filePath,
      "-s",
      spaceId,
      "-a",
      accessToken,
      "-e",
      environmentId,
      "-y",
    ],
    { cwd: ROOT, encoding: "utf8", stdio: "pipe" }
  );

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) {
    throw new Error(
      `Migration ${fileName} failed (exit ${result.status}). Check output above.`
    );
  }
  if (
    result.stdout &&
    !result.stdout.includes("Migration successful") &&
    !result.stdout.includes("🎉")
  ) {
    throw new Error(
      `Migration ${fileName} did not report success. Check output above.`
    );
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
