import { z } from "zod";

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
    .min(7, "Enter a phone number we can reach.")
    .max(40)
    .transform((str) => str.trim()),
  companyGroupName: z
    .string()
    .min(2, "Enter the company or group name.")
    .max(120)
    .transform((str) => str.trim()),
  brandsRepresented: z
    .string()
    .min(1, "Enter the restaurant brands you operate or represent.")
    .max(200)
    .transform((str) => str.trim()),
  numberOfLocations: z
    .number({ invalid_type_error: "Enter number of locations." })
    .int("Must be a whole number")
    .min(1, "Must have at least 1 location")
    .max(10000),
  restaurantType: z
    .string()
    .min(1, "Enter a restaurant type.")
    .max(80)
    .transform((str) => str.trim()),
  posSystem: z
    .string()
    .min(1, "Enter the POS system.")
    .max(120)
    .transform((str) => str.trim()),
  whatsBreaking: z
    .string()
    .min(10, "Tell us what is breaking.")
    .max(2000)
    .transform((str) => str.trim()),
  growthPipeline: z
    .string()
    .max(300)
    .optional()
    .transform((str) => (str ? str.trim() : str)),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function locationBand(
  count: number
): "1_9" | "10_24" | "25_49" | "50_plus" | "unknown" {
  if (!Number.isFinite(count)) return "unknown";
  if (count <= 9) return "1_9";
  if (count <= 24) return "10_24";
  if (count <= 49) return "25_49";
  return "50_plus";
}
