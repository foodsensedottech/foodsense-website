import { z } from "zod";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import {
  formatSelectedOptions,
  POS_SYSTEMS,
  RESTAURANT_TYPES,
  WHATS_BREAKING,
} from "@/lib/constants/form-fields";

const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((str) => (str?.trim() ? str.trim() : undefined));

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Enter your full name.")
    .max(100)
    .transform((str) => str.trim()),
  email: z
    .string()
    .email("Enter a valid email.")
    .max(100)
    .transform((str) => str.toLowerCase().trim()),
  phone: z
    .string()
    .min(8, "Enter a phone number we can reach.")
    .refine((value) => isPossiblePhoneNumber(value), "Enter a valid phone number."),
  companyGroupName: z
    .string()
    .min(2, "Enter the company or group name.")
    .max(120)
    .transform((str) => str.trim()),
  brandsRepresented: optionalText(200),
  numberOfLocations: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    if (typeof val === "number" && Number.isNaN(val)) return undefined;
    return val;
  }, z.coerce.number().int().min(1).max(10000).optional()),
  restaurantType: z.string().optional(),
  restaurantTypeOther: optionalText(120),
  posSystems: z.array(z.string()).optional().default([]),
  posSystemOther: optionalText(120),
  whatsBreaking: z.array(z.string()).optional().default([]),
  whatsBreakingOther: optionalText(2000),
  growthPipeline: optionalText(300),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function formattedRestaurantType(data: ContactFormData): string | undefined {
  if (data.restaurantType === "other") {
    return data.restaurantTypeOther
      ? `Other: ${data.restaurantTypeOther}`
      : "Other";
  }
  if (!data.restaurantType) return undefined;
  return formatSelectedOptions([data.restaurantType], RESTAURANT_TYPES);
}

export function formattedPosSystems(data: ContactFormData): string | undefined {
  return formatSelectedOptions(
    data.posSystems,
    POS_SYSTEMS,
    data.posSystemOther
  );
}

export function formattedWhatsBreaking(data: ContactFormData): string | undefined {
  return formatSelectedOptions(
    data.whatsBreaking,
    WHATS_BREAKING,
    data.whatsBreakingOther
  );
}

export function locationBand(
  count?: number
): "1_9" | "10_24" | "25_49" | "50_plus" | "unknown" {
  if (!Number.isFinite(count)) return "unknown";
  if ((count as number) <= 9) return "1_9";
  if ((count as number) <= 24) return "10_24";
  if ((count as number) <= 49) return "25_49";
  return "50_plus";
}
