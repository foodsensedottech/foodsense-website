export type ConversionPillar = {
  title: string;
  body: string;
  lucideIcon: string;
};

export type ConversionMenuItem = {
  title: string;
  body: string;
};

export type ConversionVendor = {
  name: string;
  logoUrl?: string;
};

export type ConversionSectionChrome = {
  eyebrow?: string;
  heading: string;
};

export type ConversionHomepage = {
  hero: {
    /** Small brand / SEO label above the H1 */
    brandLabel: string;
    heading: string;
    subheading: string;
    ctaLabel: string;
    imageUrl?: string;
    imageAlt?: string;
  };
  authority: {
    eyebrow: string;
    heading: string;
    winsLabel: string;
    body: string;
    founderLabel: string;
    wins: string[];
    founderImageUrl?: string;
    founderImageAlt?: string;
  };
  pillarsSection: ConversionSectionChrome;
  pillars: ConversionPillar[];
  menuSection: ConversionSectionChrome;
  menuItems: ConversionMenuItem[];
  partnersSection: ConversionSectionChrome;
  vendors: ConversionVendor[];
  contact: {
    heading: string;
    subheading: string;
    responseNote: string;
    ctaLabel: string;
  };
  chrome: {
    ctaLabel: string;
    navAuthority: string;
    navPillars: string;
    navMenu: string;
    navPartners: string;
    navContact: string;
  };
};

/**
 * Canonical Website 2.0 conversion copy (Brand OS voice).
 * Keep in sync with `scripts/contentful/conversion-seed-data.mjs`.
 */
export const conversionSeed: ConversionHomepage = {
  chrome: {
    ctaLabel: "Book a Strategy Audit",
    navAuthority: "About",
    navPillars: "What We Do",
    navMenu: "Services",
    navPartners: "Partners",
    navContact: "Contact",
  },
  hero: {
    brandLabel: "FoodSense",
    heading: "Fractional tech and ops leadership for 10+ unit QSR.",
    subheading:
      "You have vendors. You need a stack. We name what's fractured, sequence the work, and guide your teams through POS, kiosk, delivery, and data — Advisory, then Fractional or Project. Test, prove, scale.",
    ctaLabel: "Book a Strategy Audit",
  },
  authority: {
    eyebrow: "Why FoodSense",
    heading: "The authority gap we close",
    winsLabel: "The wins",
    body: "FoodSense closes the gap between Tech, Ops, and Digital. We're operators who hold vendors accountable — and guide the teams you already have, without becoming another FTE.",
    founderLabel: "Fabio Escobar",
    wins: [
      "Led restaurant technology for KFC across 20+ countries and 2,200 restaurants in Latin America and the Caribbean",
      "Deployed POS programs across the US and Canada at Restaurant Brands International",
      "Helped shape early cloud-kitchen and delivery stacks at REEF",
      "Built vendor assessment and store-level landing playbooks for multi-unit franchisees",
    ],
  },
  pillarsSection: {
    eyebrow: "Core pillars",
    heading: "What we do",
  },
  pillars: [
    {
      title: "Program lifecycle & RFP management",
      body: "Name the blocker, run the RFP, land the vendor, and own cutover — so the initiative does not stall after the kickoff deck.",
      lucideIcon: "ListChecks",
    },
    {
      title: "Tech stack optimization",
      body: "Standardize POS, FOH, and BOH into one operating model. Fewer one-offs. Cleaner data. Crews that can actually run what you bought.",
      lucideIcon: "Monitor",
    },
    {
      title: "Ecosystem integration",
      body: "Filter bad software before it hits your stores. Validated vendors, integration patterns, and clear ownership across the stack.",
      lucideIcon: "Cable",
    },
  ],
  menuSection: {
    eyebrow: "Specialized menu",
    heading: "Other services",
  },
  menuItems: [
    {
      title: "POS & core systems — migration without downtime theater",
      body: "Vendor evaluation, cutover planning, phased rollouts, and post-go-live stabilization for Oracle, NCR, and the rest of the core stack.",
    },
    {
      title: "Kiosk & self-service — program management end to end",
      body: "Vendor assessment, UI alignment, POS connectivity, menu config, and deployment coordination so kiosk does not die in pilot.",
    },
    {
      title: "Delivery & partnerships — volume without fee bleed",
      body: "First- and third-party channel strategy that grows orders without quietly erasing margin in fees and promos.",
    },
    {
      title: "Vendor governance — who stays and who goes",
      body: "Risk assessments, RFPs, and performance management so you stop paying for tools that never landed in every store.",
    },
  ],
  partnersSection: {
    eyebrow: "Partners",
    heading: "Trusted Integration Partners",
  },
  vendors: [
    { name: "Oracle" },
    { name: "NCR" },
    { name: "Toast" },
    { name: "Deliverect" },
    { name: "Tillster" },
    { name: "GRUBBRR" },
    { name: "HME" },
    { name: "Restaurant365" },
  ],
  contact: {
    heading: "Book a Strategy Audit",
    subheading:
      "Tell us the blocker — stack, cutover, or vendor. We respond within 24 hours.",
    responseNote: "Response within 24 hours.",
    ctaLabel: "Request audit",
  },
};
