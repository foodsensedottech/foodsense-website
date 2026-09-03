/**
 * Canonical /about copy. Seeded to `aboutUsTitleSubtitle` + `aboutUsCard`.
 * Keep in sync with `scripts/contentful/update-about-copy.mjs`.
 */
export type AboutPageCopy = {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  cards: Array<{
    id: string;
    title: string;
    description: string;
    lucideIcon: string;
  }>;
};

export const ABOUT_TITLE_ENTRY_ID = "5tTay5jmvkeJCPx27jw2Dk";

export const aboutSeed: AboutPageCopy = {
  metaTitle: "About",
  metaDescription:
    "A boutique restaurant-technology consultancy for 10+ unit QSR and franchise operators across Latin America, the Caribbean, and the US.",
  heading: "About FoodSense",
  subheading:
    "A boutique consultancy at the intersection of restaurant operations and technology. We help 10+ unit growth-stage brands and multi-unit franchisees build, integrate, and scale the stack that runs every shift.",
  cards: [
    {
      id: "3bYkWJrCQf7JNbTgmJvYAW",
      title: "Operator-first, not deck-first",
      description:
        "We've been in the store at 6am during cutover. We review payloads, sit in integration tests, and hold vendors accountable — then leave your teams able to run the stack.",
      lucideIcon: "Computer",
    },
    {
      id: "42voWpqVNwVz30lYAC5Z3j",
      title: "Built for 10+ unit operators",
      description:
        "We write for multi-unit QSR and franchise groups that need stack standardization — not single-unit independents, and not strategy PDFs with no execution path.",
      lucideIcon: "TrendingUp",
    },
    {
      id: "ut5Pk0Znki7QJRqqZAU7d",
      title: "LATAM, Caribbean, and US",
      description:
        "Multi-market is normal here. Bilingual delivery across regulatory, vendor, and franchise maturity differences — without a one-size playbook.",
      lucideIcon: "Globe",
    },
    {
      id: "8KX0fVS0xR93B3Alft7Ib",
      title: "Test, prove, scale",
      description:
        "Advisory names the gap. Fractional or Project carries the work. We phase everything: pilot first, prove the KPI, then scale — never big-bang.",
      lucideIcon: "ListChecks",
    },
  ],
};
