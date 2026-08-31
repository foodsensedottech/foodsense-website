export const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

/**
 * Soft check for agent/layout boot. Do not throw during `next build` —
 * missing CLICKUP_API_TOKEN should fail contact submissions (503), not the
 * whole site deploy. API routes enforce the token at request time.
 */
export function validateEnv() {
  if (!process.env.CLICKUP_API_TOKEN) {
    console.warn(
      "CLICKUP_API_TOKEN is not set — contact form will return 503 until configured"
    );
  }
}
