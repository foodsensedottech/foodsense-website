/**
 * ClickUp dropdown option UUIDs for Leads list custom fields.
 * When a value is null, the API falls back to label text (short_text fields)
 * or the numeric interim map (Number of Locations while still type number).
 *
 * After updating fields in ClickUp, paste option UUIDs here — see
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

/** Interim numeric values until Number of Locations becomes a dropdown in ClickUp. */
export const LOCATION_BAND_NUMBER_FALLBACK: Record<LocationBand, number> = {
  "1-5": 3,
  "6-10": 8,
  "10-50": 30,
  "50-plus": 75,
};

export function primaryBrand(restaurantBrands: string): string {
  const first = restaurantBrands
    .split(",")
    .map((part) => part.trim())
    .find(Boolean);
  return first || restaurantBrands.trim();
}
