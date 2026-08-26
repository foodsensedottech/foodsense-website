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

export type ConversionHomepage = {
  hero: {
    heading: string;
    subheading: string;
    ctaLabel: string;
    imageUrl?: string;
    imageAlt?: string;
  };
  authority: {
    body: string;
    founderLabel: string;
    wins: string[];
    founderImageUrl?: string;
    founderImageAlt?: string;
  };
  pillars: ConversionPillar[];
  menuItems: ConversionMenuItem[];
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

/** Seed content for Preview until Contentful `conversionHomepage` is published. */
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
    heading: "Scaling QSR Excellence Through Fractional Tech & Ops Leadership.",
    subheading:
      "We help SMB and Enterprise Quick Service Restaurants optimize their tech stack and operational workflows to increase margins and efficiency.",
    ctaLabel: "Book a Strategy Audit",
  },
  authority: {
    body: "FoodSense bridges the gap between culinary ambition and operational precision. We advise, guide, and help implement the stack and workflows multi-unit operators need to scale without chaos.",
    founderLabel: "Fabio Escobar",
    wins: [
      "Led restaurant technology for KFC across 20+ countries and 2,200 restaurants in Latin America and the Caribbean",
      "Deployed POS programs across the US and Canada at Restaurant Brands International",
      "Helped shape early cloud-kitchen and delivery stacks at REEF",
      "Built vendor assessment and store-level landing playbooks for multi-unit franchisees",
    ],
  },
  pillars: [
    {
      title: "Program Lifecycle & RFP Management",
      body: "From problem framing to vendor selection and cutover — we guide the full lifecycle so execution does not stall the line.",
      lucideIcon: "ListChecks",
    },
    {
      title: "Tech Stack Optimization",
      body: "POS, FOH, and BOH aligned into one operating model — fewer one-offs, clearer data, and crews that can actually run the tools.",
      lucideIcon: "Monitor",
    },
    {
      title: "Ecosystem Integration",
      body: "Validated vendors and integration patterns that filter bad software before it lands in your stores.",
      lucideIcon: "Cable",
    },
  ],
  menuItems: [
    {
      title: "Menu Architecture — Revenue Optimization",
      body: "Commercial and pricing strategies that protect margin while keeping the guest experience clear across channels.",
    },
    {
      title: "Partnerships & Delivery — Growth & Distribution",
      body: "Third-party and partnership strategy that grows volume without quietly erasing profit in fees and promos.",
    },
  ],
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
    subheading: "Let's optimize your operations.",
    responseNote: "Response time: within 24 hours.",
    ctaLabel: "Request audit",
  },
};
