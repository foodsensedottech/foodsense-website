import { z } from "zod";

export const LOCATION_BANDS = [
  { label: "1–5", value: "1-5" },
  { label: "6–10", value: "6-10" },
  { label: "10–50", value: "10-50" },
  { label: "50+", value: "50-plus" },
] as const;

export const POS_SYSTEMS = [
  { label: "Oracle", value: "oracle" },
  { label: "NCR", value: "ncr" },
  { label: "PAR", value: "par" },
  { label: "Toast", value: "toast" },
  { label: "Square", value: "square" },
  { label: "In-House (Custom)", value: "in_house_custom" },
  { label: "Other", value: "other" },
] as const;

export const RESTAURANT_TYPES = [
  { label: "Dine In", value: "dine_in" },
  { label: "Fast Casual", value: "fast_casual" },
  { label: "Quick Service", value: "quick_service" },
  { label: "Ghost Kitchen", value: "ghost_kitchen" },
  { label: "Food Truck", value: "food_truck" },
  { label: "Other", value: "other" },
] as const;

/** Placeholder labels until final service copy is approved. */
export const SERVICE_INTERESTS = [
  { label: "Option 1", value: "option_1" },
  { label: "Option 2", value: "option_2" },
  { label: "Option 3", value: "option_3" },
  { label: "Option 4", value: "option_4" },
  { label: "Option 5", value: "option_5" },
  { label: "Option 6", value: "option_6" },
] as const;

export type LocationBand = (typeof LOCATION_BANDS)[number]["value"];
export type PosSystem = (typeof POS_SYSTEMS)[number]["value"];
export type RestaurantType = (typeof RESTAURANT_TYPES)[number]["value"];
export type ServiceInterest = (typeof SERVICE_INTERESTS)[number]["value"];

export const locationBandSchema = z.enum(["1-5", "6-10", "10-50", "50-plus"]);

export const posSystemSchema = z.enum([
  "oracle",
  "ncr",
  "par",
  "toast",
  "square",
  "in_house_custom",
  "other",
]);

export const restaurantTypeSchema = z.enum([
  "dine_in",
  "fast_casual",
  "quick_service",
  "ghost_kitchen",
  "food_truck",
  "other",
]);

export const serviceInterestsSchema = z.array(
  z.enum([
    "option_1",
    "option_2",
    "option_3",
    "option_4",
    "option_5",
    "option_6",
  ])
);

/** @deprecated Legacy HubSpot-era constants — do not use on Website 2.0 forms. */
export const DELIVERY_PARTNERS = [] as const;

/** @deprecated Use SERVICE_INTERESTS */
export const SERVICES = SERVICE_INTERESTS;

export const deliveryPartnersSchema = z.array(z.never());
export const servicesSchema = serviceInterestsSchema;
