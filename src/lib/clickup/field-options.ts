/**
 * ClickUp dropdown option UUIDs for Leads list custom fields.
 * Synced from ClickUp list 901328239583 — see docs/engineering/clickup-field-alignment.md
 */
import type {
  LocationBand,
  PosSystem,
  RestaurantType,
  ServiceInterest,
} from "@/lib/constants/form-fields";

export const CLICKUP_LOCATION_BAND_OPTIONS: Record<LocationBand, string> = {
  "1-5": "7d78d997-6043-4f3c-9836-7df9ba79160c",
  "6-10": "a87a876d-4f6c-432e-bdd0-8615a5f62f31",
  "10-50": "563ab0da-e636-4e18-9209-546a44f76749",
  "50-plus": "e9f8277d-74f5-4cb5-94d8-e47a04bbb483",
};

export const CLICKUP_RESTAURANT_TYPE_OPTIONS: Record<RestaurantType, string> = {
  dine_in: "2b4398b3-3967-4b7b-97ac-136ee0ced979",
  fast_casual: "4b338cd5-9ea9-4040-9680-f6142d3231ea",
  quick_service: "a4994edf-0e60-4c8d-82c3-4151eb76cb63",
  ghost_kitchen: "b1652256-6aee-46ae-b641-74ff75a2fbfa",
  food_truck: "711d06f6-01d5-42ec-bf90-301bed0dbfdd",
  other: "f94d7a4e-0eec-438d-a865-c77b3be4ab1b",
};

/**
 * ClickUp POS options today: Oracle, NCR, PAR, Toast, Square, In-House (Custom), Other.
 * Form also lists Clover, LightSpeed, SpotOn, QuPOS, Aloha, Xenial — add those in ClickUp
 * and paste option UUIDs here when available.
 */
export const CLICKUP_POS_SYSTEM_OPTIONS: Record<
  PosSystem,
  string | null
> = {
  toast: "05d7f8e2-ba52-4c54-9db5-848e0a4c4c56",
  square: "bd93cbfd-283c-4005-97bc-e6dce1dd1293",
  par: "dc61c49d-918f-40b0-80fb-32f322462b94",
  ncr: "04219026-77d8-4813-a811-7ef2d97ce7c7",
  oracle: "4cca608b-528e-478b-a0d0-aea63c37ab1a",
  other: "53a993de-a98f-4256-b0af-87a407e059cf",
  clover: null,
  lightspeed: null,
  spoton: null,
  qupos: null,
  aloha: null,
  xenial: null,
};

export const CLICKUP_SERVICE_INTEREST_OPTIONS: Record<ServiceInterest, string> =
  {
    option_1: "9d2f2153-702c-40f5-aafe-cf12938affe5",
    option_2: "e8afcde5-187c-42b0-91be-8a3310316cfb",
    option_3: "dac65a85-f0ac-41cb-af1b-1ff5d99eac1d",
    option_4: "cf1736c2-3fb4-472f-bf4c-44d194ea1cf6",
    option_5: "babcb65f-e850-417f-acc4-e6e118618a1a",
    option_6: "475431d7-91af-49ad-a3e0-62f9bab028e6",
  };

export function primaryBrand(restaurantBrands: string): string {
  const first = restaurantBrands
    .split(",")
    .map((part) => part.trim())
    .find(Boolean);
  return first || restaurantBrands.trim();
}

export function resolveOptionId(
  optionId: string | null | undefined,
  fieldLabel: string,
  formValue: string
): string | null {
  if (optionId) return optionId;
  console.warn(
    `ClickUp ${fieldLabel}: no option UUID for "${formValue}" — field skipped until ClickUp options match the form`
  );
  return null;
}

/**
 * ClickUp "Services Interested in" is a single-select dropdown; the form allows
 * multiple checkboxes. Maps the first selected service to the field; all selections
 * remain in the task description.
 */
export function resolveServiceInterestForClickUp(
  values: ServiceInterest[]
): string | null {
  for (const value of values) {
    const id = CLICKUP_SERVICE_INTEREST_OPTIONS[value];
    if (id) return id;
  }
  if (values.length > 0) {
    console.warn(
      "ClickUp Services Interested In: no option UUID for selections — field skipped"
    );
  }
  return null;
}
