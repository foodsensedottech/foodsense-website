/**
 * ClickUp dropdown/label option UUIDs for Leads list custom fields.
 * Paste option UUIDs after creating fields in ClickUp — see
 * docs/engineering/clickup-field-alignment.md
 */
import type {
  LocationBand,
  PosSystem,
  RestaurantType,
  ServiceInterest,
} from "@/lib/constants/form-fields";

export const CLICKUP_LOCATION_BAND_OPTIONS: Record<
  LocationBand,
  string | null
> = {
  "1-5": null,
  "6-10": null,
  "10-50": null,
  "50-plus": null,
};

export const CLICKUP_RESTAURANT_TYPE_OPTIONS: Record<
  RestaurantType,
  string | null
> = {
  dine_in: null,
  fast_casual: null,
  quick_service: null,
  ghost_kitchen: null,
  food_truck: null,
  other: null,
};

export const CLICKUP_POS_SYSTEM_OPTIONS: Record<PosSystem, string | null> = {
  toast: null,
  clover: null,
  square: null,
  lightspeed: null,
  spoton: null,
  qupos: null,
  aloha: null,
  xenial: null,
  par: null,
  ncr: null,
  oracle: null,
  other: null,
};

export const CLICKUP_SERVICE_INTEREST_OPTIONS: Record<
  ServiceInterest,
  string | null
> = {
  option_1: null,
  option_2: null,
  option_3: null,
  option_4: null,
  option_5: null,
  option_6: null,
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
    `ClickUp ${fieldLabel}: no option UUID for "${formValue}" — field skipped until field-options.ts is updated`
  );
  return null;
}

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
