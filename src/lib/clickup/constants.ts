/** FoodSense CRM → Leads. List ID is not a secret. */
export const CLICKUP_LEADS_LIST_ID = "901328239583";

/**
 * Stable Leads custom fields (keep as-is).
 * Dropdown/labels fields below use env vars because ClickUp cannot change field
 * types — create new fields in the UI and paste IDs into env (or constants).
 */
export const CLICKUP_FIELDS = {
  email: "b950a0d8-08de-41ad-beb1-f4c5197cbba3",
  phone: "8efc4847-ebc0-4d9c-a1b9-7fbfe387399f",
  company: "2117e392-e716-4fa3-95b4-9b6c4c1ef77a",
  brands: "ca2b5438-e0f7-4965-86e7-805f9c066be5",
  /** Dropdown: 1–5, 6–10, 10–50, 50+ */
  locations: process.env.CLICKUP_FIELD_LOCATIONS ?? "",
  /** Dropdown: Dine In … Other */
  restaurantType: process.env.CLICKUP_FIELD_RESTAURANT_TYPE ?? "",
  /** Dropdown: Toast … Other */
  posSystem: process.env.CLICKUP_FIELD_POS_SYSTEM ?? "",
  /** Labels (multi): Option 1 … Option 6 */
  serviceInterests: process.env.CLICKUP_FIELD_SERVICE_INTERESTS ?? "",
  growthPipeline: "777f440f-fe21-41ac-98d4-afa3760b8b87",
  project: "b8734eca-e728-415d-9e9a-096baf15e4d1",
} as const;

/** Project dropdown → Website */
export const CLICKUP_PROJECT_WEBSITE = "f52ad055-0eee-4d74-a389-6d15e4aa3ee8";

export const CLICKUP_API_BASE = "https://api.clickup.com/api/v2";

export function isClickUpFieldConfigured(fieldId: string): boolean {
  return fieldId.trim().length > 0;
}
