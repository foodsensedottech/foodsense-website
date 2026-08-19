import { z } from "zod";

export const assessmentAnswersSchema = z.object({
  locations: z.enum(["1-9", "10-24", "25-99", "100+"]),
  region: z.enum(["us", "latam", "caribbean", "multi"]),
  pos: z.enum(["one", "two", "three_plus"]),
  kds: z.enum(["standard", "mixed", "none"]),
  delivery: z.enum(["central", "store", "none"]),
  payments: z.enum(["standard", "mixed", "unknown"]),
});

export const assessmentLeadSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(100)
    .transform((value) => value.trim()),
  email: z
    .string()
    .email()
    .max(100)
    .transform((value) => value.toLowerCase().trim()),
  company: z
    .string()
    .min(2)
    .max(120)
    .transform((value) => value.trim()),
  locale: z.enum(["en"]).default("en"),
  answers: assessmentAnswersSchema,
});

export type AssessmentLeadInput = z.infer<typeof assessmentLeadSchema>;
