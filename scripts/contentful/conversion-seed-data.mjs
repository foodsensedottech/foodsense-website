/** Mirror of src/lib/content/conversion-seed.ts for Contentful seed scripts (no ts-node). */
export const conversionSeed = {
  chrome: {
    ctaLabel: "Book a Strategy Audit",
    navAuthority: "About",
    navPillars: "What We Do",
    navMenu: "Services",
    navPartners: "Partners",
    navContact: "Contact",
  },
  hero: {
    heading: "Fractional tech and ops leadership for multi-unit QSR.",
    subheading:
      "We help growth-stage and franchise operators build, integrate, and scale the stack that runs every shift — test, prove, scale.",
    ctaLabel: "Book a Strategy Audit",
  },
  authority: {
    body: "FoodSense sits between culinary ambition and operational precision. We advise, guide, and help implement the stack and workflows multi-unit operators need to scale without chaos.",
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
      title: "Program lifecycle & RFP management",
      body: "From problem framing to vendor selection and cutover — we guide the full lifecycle so execution does not stall the line.",
      lucideIcon: "ListChecks",
    },
    {
      title: "Tech stack optimization",
      body: "POS, FOH, and BOH aligned into one operating model — fewer one-offs, clearer data, and crews that can actually run the tools.",
      lucideIcon: "Monitor",
    },
    {
      title: "Ecosystem integration",
      body: "Validated vendors and integration patterns that filter bad software before it lands in your stores.",
      lucideIcon: "Cable",
    },
  ],
  menuItems: [
    {
      title: "Menu architecture — revenue optimization",
      body: "Commercial and pricing strategies that protect margin while keeping the guest experience clear across channels.",
    },
    {
      title: "Partnerships & delivery — growth & distribution",
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
    subheading: "Tell us the blocker. We respond within 24 hours.",
    responseNote: "Response time: within 24 hours.",
    ctaLabel: "Request audit",
  },
};
