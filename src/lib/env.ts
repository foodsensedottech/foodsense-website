export const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export function validateEnv() {
  // ClickUp is the permanent CRM. HubSpot is legacy and optional during cutover.
  if (!process.env.CLICKUP_API_TOKEN && !process.env.HUBSPOT_ACCESS_TOKEN) {
    throw new Error(
      "Missing CRM credentials: set CLICKUP_API_TOKEN (preferred) or HUBSPOT_ACCESS_TOKEN"
    );
  }
}
