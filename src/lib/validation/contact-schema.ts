import { isPossiblePhoneNumber } from "libphonenumber-js";
import { z } from "zod";
import {
  locationBandSchema,
  posSystemSchema,
  restaurantTypeSchema,
  serviceInterestsSchema,
} from "@/lib/constants/form-fields";

const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      NAME_REGEX,
      "Name can only contain letters, spaces, hyphens and apostrophes"
    )
    .refine((name) => name.trim().split(/\s+/).length >= 2, {
      message: "Please enter both first and last name",
    })
    .transform((str) => str.trim()),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email is required")
    .max(100, "Email must be less than 100 characters")
    .transform((str) => str.toLowerCase().trim()),

  phone: z
    .string()
    .min(8, "Enter a phone number we can reach.")
    .refine(
      (value) => isPossiblePhoneNumber(value),
      "Enter a valid phone number."
    ),

  /** Comma-separated brand names, e.g. "Brand A, Brand B". */
  restaurantBrands: z
    .string()
    .min(2, "Enter at least one restaurant brand")
    .max(500, "Brand list is too long")
    .transform((str) => str.trim()),

  locationBand: locationBandSchema,

  restaurantType: restaurantTypeSchema,

  posSystem: posSystemSchema,

  serviceInterests: serviceInterestsSchema.min(
    1,
    "Select at least one service"
  ),

  notes: z
    .string()
    .max(1000, "Notes must be less than 1000 characters")
    .optional()
    .transform((str) => (str ? str.trim() : str)),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type LocationBand = ContactFormData["locationBand"];
export type PosSystem = ContactFormData["posSystem"];
export type RestaurantType = ContactFormData["restaurantType"];

export const posSystemSchemaExport = posSystemSchema;
export const restaurantTypeSchemaExport = restaurantTypeSchema;
