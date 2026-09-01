/** FoodSense CRM → Leads. List ID is not a secret. */
export const CLICKUP_LEADS_LIST_ID = "901328239583";

/** Stable + recreated dropdown fields on Leads list. Env vars override defaults. */
export const CLICKUP_FIELDS = {
  email: "b950a0d8-08de-41ad-beb1-f4c5197cbba3",
  phone: "8efc4847-ebc0-4d9c-a1b9-7fbfe387399f",
  company: "2117e392-e716-4fa3-95b4-9b6c4c1ef77a",
  brands: "ca2b5438-e0f7-4965-86e7-805f9c066be5",
  /** Dropdown: 1–5, 6–10, 10–50, 50+ */
  locations:
    process.env.CLICKUP_FIELD_LOCATIONS ??
    "f4c1099e-1ad3-49a9-ad48-4ae2a99f8afe",
  /** Dropdown: Dine In … Other */
  restaurantType:
    process.env.CLICKUP_FIELD_RESTAURANT_TYPE ??
    "35c3b88c-51a3-4400-a749-dce2d2f55160",
  /** Dropdown: Toast … Other (see field-options for ClickUp/form parity) */
  posSystem:
    process.env.CLICKUP_FIELD_POS_SYSTEM ??
    "6fd69de1-c6ca-4a6a-ab8a-ceeb2b06243b",
  /** Labels (multi): POS, kiosk, loyalty, delivery, data, vendor governance */
  serviceInterests:
    process.env.CLICKUP_FIELD_SERVICE_INTERESTS ??
    "5a0d0fa1-107d-4f41-83de-6c7b127c1fd8",
  growthPipeline: "777f440f-fe21-41ac-98d4-afa3760b8b87",
  project: "b8734eca-e728-415d-9e9a-096baf15e4d1",
} as const;

/** Project dropdown → Website */
export const CLICKUP_PROJECT_WEBSITE = "f52ad055-0eee-4d74-a389-6d15e4aa3ee8";

export const CLICKUP_API_BASE = "https://api.clickup.com/api/v2";

export function isClickUpFieldConfigured(fieldId: string): boolean {
  return fieldId.trim().length > 0;
}
