import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

function validateEnvVars() {
  const requiredVars = [
    'NEXT_PUBLIC_BASE_URL',
    // Add other required env vars
  ];

  const missingVars = requiredVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

function validatePublicAssets() {
  const requiredAssets = [
    'favicon.ico',
    'manifest.json',
    'robots.txt',
    'images/logo/logo.png',
    'images/logo/footer-logo.png',
  ];

  const missingAssets = requiredAssets.filter(
    (asset) => !existsSync(join(process.cwd(), 'public', asset))
  );

  if (missingAssets.length > 0) {
    throw new Error(
      `Missing required public assets: ${missingAssets.join(', ')}`
    );
  }
}

try {
  validateEnvVars();
  validatePublicAssets();
  console.log('✅ Build validation passed');
  process.exit(0);
} catch (error) {
  console.error('❌ Build validation failed:', error.message);
  process.exit(1);
} 