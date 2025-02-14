import { z } from "zod";
import { RESTAURANT_TYPES, POS_SYSTEMS, DELIVERY_PARTNERS } from "@/lib/hubspot/types";

// Helper regex for phone format (XXX) XXX-XXXX
const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

// Helper regex for monthly orders format: number or range (e.g., "1000" or "1000-2000")
const MONTHLY_ORDERS_REGEX = /^\d{1,8}(-\d{1,8})?$/;

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Full name is required")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
    .refine(val => val.trim().includes(' '), "Please provide both first and last name"),
  
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  
  phone: z.string()
    .regex(PHONE_REGEX, "Phone must be in format: (555) 555-4444")
    .min(1, "Phone number is required"),
  
  restaurant: z.string()
    .min(2, "Restaurant name is required")
    .max(100, "Restaurant name is too long"),
  
  numberOfLocations: z.number()
    .min(1, "Must have at least 1 location")
    .max(10000, "For businesses with over 10,000 locations, please contact us directly"),
  
  monthlyOrders: z.string()
    .optional()
    .refine(val => !val || MONTHLY_ORDERS_REGEX.test(val), {
      message: "Please enter a valid number range (e.g., 1000 or 1000-2000)"
    }),
  
  restaurantType: z.enum(Object.values(RESTAURANT_TYPES) as [string, ...string[]], {
    errorMap: () => ({ message: "Please select your restaurant type" })
  }),
  
  serviceInterests: z.array(z.string())
    .min(1, "Please select at least one service you're interested in"),
  
  deliveryPartners: z.array(z.enum(Object.values(DELIVERY_PARTNERS) as [string, ...string[]]))
    .optional(),
  
  posSystem: z.enum(Object.values(POS_SYSTEMS) as [string, ...string[]], {
    errorMap: () => ({ message: "Please select your POS system" })
  })
    .optional(),
  
  notes: z.string()
    .max(1000, "Notes must be less than 1000 characters")
    .optional()
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>; 