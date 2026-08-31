/**
 * ClickUp dropdown/label option UUIDs for Leads list custom fields.
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

/** Matches ClickUp POS System dropdown options exactly. */
export const CLICKUP_POS_SYSTEM_OPTIONS: Record<PosSystem, string> = {
  oracle: "4cca608b-528e-478b-a0d0-aea63c37ab1a",
  ncr: "04219026-77d8-4813-a811-7ef2d97ce7c7",
  par: "dc61c49d-918f-40b0-80fb-32f322462b94",
  toast: "05d7f8e2-ba52-4c54-9db5-848e0a4c4c56",
  square: "bd93cbfd-283c-4005-97bc-e6dce1dd1293",
  in_house_custom: "d871688a-82a2-4a1d-a896-cefd839f3051",
  other: "53a993de-a98f-4256-b0af-87a407e059cf",
};

export const CLICKUP_SERVICE_INTEREST_OPTIONS: Record<ServiceInterest, string> =
  {
    option_1: "4b7265f9-e7e6-47fe-8843-29101f77fb13",
    option_2: "962d9ffc-39a5-4a4d-a543-0619df035097",
    option_3: "0116c126-7034-414d-81a8-f9e65aa0b88c",
    option_4: "740a36b1-9fe9-4bcb-99fe-484e3aa0de85",
    option_5: "c41c6a14-db88-4f72-b695-2e13548c0a91",
    option_6: "9c20fa7a-d1a3-4110-b5a5-bbc5d6390d24",
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
    `ClickUp ${fieldLabel}: no option UUID for "${formValue}" — field skipped`
  );
  return null;
}

/** Maps all selected services to ClickUp labels field option UUIDs. */
export function resolveServiceInterestOptionIds(
  values: ServiceInterest[]
): string[] | null {
  const ids = values
    .map((value) => {
      const id = CLICKUP_SERVICE_INTEREST_OPTIONS[value];
      if (!id) {
        console.warn(
          `ClickUp Services Interested In: no option UUID for "${value}"`
        );
        return null;
      }
      return id;
    })
    .filter((id): id is string => id !== null);

  if (ids.length === 0) return null;
  if (ids.length !== values.length) return null;
  return ids;
}
