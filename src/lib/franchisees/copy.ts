export type FranchiseeLocale = "en";

export const franchiseeCopy = {
  en: {
    heroPrimaryCta: "Talk to Our Team",
    assessmentHeading: "2-minute Technology Maturity Score",
    assessmentIntro:
      "Tell us your store count and stack. We’ll score fragmentation, delivery margin control, and payment governance — then route you to the right next step.",
    assessmentCta: "Start assessment",
    questions: {
      locations: {
        label: "How many restaurants are in the group?",
        options: [
          { value: "1-9", label: "1–9 units" },
          { value: "10-24", label: "10–24 units" },
          { value: "25-99", label: "25–99 units" },
          { value: "100+", label: "100+ units" },
        ],
      },
      region: {
        label: "Where do you operate?",
        options: [
          { value: "us", label: "United States" },
          { value: "latam", label: "Latin America" },
          { value: "caribbean", label: "Caribbean" },
          { value: "multi", label: "More than one region" },
        ],
      },
      pos: {
        label: "How many POS platforms or versions are in production?",
        options: [
          { value: "one", label: "One standard POS" },
          { value: "two", label: "Two platforms or major versions" },
          { value: "three_plus", label: "Three or more" },
        ],
      },
      kds: {
        label: "Kiosk / KDS / KMS across stores?",
        options: [
          { value: "standard", label: "Standardized across the group" },
          { value: "mixed", label: "Mixed or store-by-store" },
          { value: "none", label: "Limited or none" },
        ],
      },
      delivery: {
        label: "Who controls third-party delivery fees and promos?",
        options: [
          { value: "central", label: "Centralized for the group" },
          { value: "store", label: "Mostly store-level" },
          { value: "none", label: "Not actively managed" },
        ],
      },
      payments: {
        label: "Payment processors and wallet flows?",
        options: [
          { value: "standard", label: "One approved processor / architecture" },
          { value: "mixed", label: "Multiple processors or rogue store tools" },
          { value: "unknown", label: "Not sure / not governed" },
        ],
      },
    },
    capture: {
      heading: "See your score",
      intro: "We’ll email a copy and route 10+ unit groups to a franchisee specialist.",
      name: "Full name",
      email: "Work email",
      company: "Franchisee group or brand",
      submit: "Show my score",
      submitting: "Scoring…",
      error: "We calculated your score, but could not save the lead. You can still book a conversation.",
    },
    results: {
      heading: "Your Technology Maturity Score",
      bands: {
        optimized: "Optimized — enterprise-ready operating model",
        scaling: "Scaling — material gaps will compound with each new unit",
        fragmented: "Fragmented — store-level tools are driving the stack",
      },
      nextCta: "Book a franchisee working session",
      restart: "Retake assessment",
    },
    next: "Continue",
    back: "Back",
  },
} as const;

export function getFranchiseeCopy(_locale: FranchiseeLocale = "en") {
  return franchiseeCopy.en;
}
