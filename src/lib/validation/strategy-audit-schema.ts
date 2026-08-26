import { z } from "zod";

export const PRIMARY_CHALLENGES = [
  { value: "tech_stack", label: "Tech Stack" },
  { value: "menu_pricing", label: "Menu Pricing" },
  { value: "operational_efficiency", label: "Operational Efficiency" },
  { value: "delivery_margins", label: "Delivery & Margins" },
  { value: "other", label: "Other" },
] as const;

export const strategyAuditSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .transform((str) => str.trim()),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100)
    .transform((str) => str.toLowerCase().trim()),
  restaurant: z
    .string()
    .min(2, "Restaurant name is required")
    .max(100)
    .transform((str) => str.trim()),
  primaryChallenge: z.enum([
    "tech_stack",
    "menu_pricing",
    "operational_efficiency",
    "delivery_margins",
    "other",
  ]),
  notes: z
    .string()
    .max(1000)
    .optional()
    .transform((str) => (str ? str.trim() : str)),
});

export type StrategyAuditFormData = z.infer<typeof strategyAuditSchema>;
