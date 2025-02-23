import { z } from "zod";

// Helper regex patterns
const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;
const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

export const deliveryPartnersSchema = z
  .array(z.enum(["ubereats", "doordash", "grubhub", "postmates", "other"]))
  .min(1)
  .max(5);

export const restaurantTypeSchema = z.enum([
  "dine_in",
  "fast_casual",
  "quick_service",
  "ghost_kitchen",
  "food_truck",
  "other",
]);

export const contactFormSchema = z.object({
  // Personal Info
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      NAME_REGEX,
      "Name can only contain letters, spaces, hyphens and apostrophes"
    )
    .transform((str) => str.trim()),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email is required")
    .max(100, "Email must be less than 100 characters")
    .transform((str) => str.toLowerCase().trim()),

  phone: z
    .string()
    .regex(PHONE_REGEX, "Phone must be in format: (555) 555-1234")
    .min(10, "Phone number is required"),

  // Restaurant Info
  restaurant: z
    .string()
    .min(2, "Restaurant name must be at least 2 characters")
    .max(100, "Restaurant name must be less than 100 characters")
    .transform((str) => str.trim()),

  numberOfLocations: z
    .number()
    .int("Must be a whole number")
    .min(1, "Must have at least 1 location")
    .max(10000, "For 10000+ locations, please contact us directly"),

  monthlyOrders: z
    .number()
    .int("Must be a whole number")
    .min(0, "Cannot be negative")
    .max(1000000, "For 1M+ monthly orders, please contact us directly"),

  // Dropdowns
  restaurantType: restaurantTypeSchema.refine((val) => val !== undefined, {
    message: "Please select a restaurant type",
  }),

  posSystem: z.enum([
    "toast",
    "clover",
    "square",
    "lightspeed",
    "spoton",
    "qupos",
    "aloha",
    "xenial",
    "par",
    "ncr",
    "oracle",
    "other",
  ]),

  // Multi-select
  deliveryPartners: deliveryPartnersSchema,

  serviceInterests: z
    .array(z.string())
    .min(1, "Select at least one service")
    .max(5, "Maximum 5 services allowed"),

  // Optional
  notes: z
    .string()
    .max(1000, "Notes must be less than 1000 characters")
    .optional()
    .transform((str) => (str ? str.trim() : str)),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const posSystemSchema = z.enum([
  "toast",
  "clover",
  "square",
  "lightspeed",
  "spoton",
  "qupos",
  "aloha",
  "xenial",
  "par",
  "ncr",
  "oracle",
  "other",
]);

export type PosSystem = z.infer<typeof posSystemSchema>;

export type DeliveryPartner = z.infer<typeof deliveryPartnersSchema>[number];

export type RestaurantType = z.infer<typeof restaurantTypeSchema>;
