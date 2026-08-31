export const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export function validateEnv() {
  if (!process.env.CLICKUP_API_TOKEN) {
    throw new Error("Missing CRM credentials: set CLICKUP_API_TOKEN");
  }
}
