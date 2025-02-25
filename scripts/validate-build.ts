import { existsSync, readFileSync } from "fs";
import { join } from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

function validateEnvVars() {
  const requiredVars = [
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_CONTENTFUL_SPACE_ID",
    "NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN",
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_SITE_NAME",
    // Add other required env vars if needed
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

function validatePublicAssets() {
  const requiredAssets = [
    "favicon.ico",
    "manifest.json",
    "robots.txt",
    "images/logo/logo.png",
    "images/logo/footer-logo.png",
  ];

  const missingAssets = requiredAssets.filter(
    (asset) => !existsSync(join(process.cwd(), "public", asset))
  );

  if (missingAssets.length > 0) {
    throw new Error(
      `Missing required public assets: ${missingAssets.join(", ")}`
    );
  }
}

// Helper function to safely get error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

try {
  validateEnvVars();
  validatePublicAssets();
  console.log("✅ Build validation passed");
  process.exit(0);
} catch (error) {
  console.error("❌ Build validation failed:", getErrorMessage(error));
  process.exit(1);
}
