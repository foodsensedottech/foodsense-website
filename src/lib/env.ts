export const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export function validateEnv() {
  const requiredEnvs = [
    "HUBSPOT_ACCESS_TOKEN",
    "HUBSPOT_PORTAL_ID",
  ];

  const missing = requiredEnvs.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
} 