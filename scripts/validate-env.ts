#!/usr/bin/env node

const requiredEnvVars = [
  // App
  "NEXT_PUBLIC_APP_URL",

  // Content Management
  "CONTENTFUL_SPACE_ID",
  "CONTENTFUL_ACCESS_TOKEN",
  "CONTENTFUL_PREVIEW_ACCESS_TOKEN",

  // Contact Form
  "HUBSPOT_PORTAL_ID",
  "HUBSPOT_ACCESS_TOKEN",
];

function validateEnv() {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    missingVars.forEach((envVar) => {
      console.error(`   - ${envVar}`);
    });
    process.exit(1);
  }

  console.log("✅ All required environment variables are set");
}

validateEnv();
