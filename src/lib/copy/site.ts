export const SITE_EMAIL = "fabio@foodsense.tech";
export const SITE_LINKEDIN = "https://www.linkedin.com/company/foodsensedottech/";
export const SITE_INSTAGRAM = "https://www.instagram.com/foodsense.tech/";
export const CANONICAL_HOST = "https://www.foodsense.tech";

export const ctaLabel = "Start a scoped engagement";

export const navItems = [
  { label: "Offerings", href: "/#franchisee-offers" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const seo = {
  home: {
    title: "FoodSense | Advisor for 10+ unit restaurant operators",
    description:
      "Advisory and fractional program management for VP Tech, CDTO, CEO, and Country GMs at 10+ units. We advise, guide, and help implement stack standardization.",
  },
  services: {
    title: "Services",
    description:
      "Vendor and tech implementation, customer-facing channels, menu architecture, and development — each delivered as Advisory, Fractional work, or Project management.",
  },
  about: {
    title: "About | FoodSense — the operator résumé",
    description:
      "The principal behind FoodSense: POS programs at 4,500 restaurants, QSR tech across 36 countries, and independent openings at about $2.6M AUV. Not a logo wall.",
  },
  contact: {
    title: "Start a scoped engagement | FoodSense",
    description:
      "Tell us what is breaking. We reply next business day, not later than 48 hours in normal business hours. Then we agree on a mode and a scope of work.",
  },
} as const;

export const heroCopy = {
  eyebrow:
    "We bridge the gap between Tech, Operations, and Digital by leveraging the restaurant tech stack.",
  headline:
    "For VP Tech, CDTO, CEO, and Country GMs at 10+ units: Tech, Ops, and Digital as one.",
  subhead:
    "FoodSense is the advisor and fractional program manager who closes that gap. We advise, guide, enable, and help implement stack standardization. You keep your teams. We bring them to one unit — with named handoffs, accountability, and traceability.",
  primaryCta: ctaLabel,
  primaryHref: "#contact-section",
} as const;

export const forWhomCopy = {
  headline: "Who this is for",
  intro:
    "Written first for VP of IT / Tech, VP of Digital Channels, CDTO, CEO, and Country GM. Franchise owners, COO, CFO, and CMO should still be able to read it in one pass.",
  icp: "10+ units is the operator we write to on this page — groups in Latin America, the Caribbean, and the United States.",
  notFor: "Not a customer: single-unit independents.",
  replaceIntro: "We do not replace the people already doing the work:",
  doesNotReplace: [
    {
      title: "Internal teams",
      body: "We advise the decision-maker and guide the Tech and Ops teams already on payroll.",
    },
    {
      title: "The vendor",
      body: "We already know those professional-services benches. They are usually expensive and slow. We move beside them, not as them.",
    },
    {
      title: "The local implementation team",
      body: "They stay. We do not become extra FTE or the trench crew.",
    },
  ],
  floor:
    "If you have fewer than 10 locations, still send the form. A conversation makes sense at 3 or more locations with a 5–7 year growth pipeline (expansion, investors, or franchising). Below 3 locations, or 3+ with no pipeline, we are not the right fit. We will still reply.",
} as const;

export const offeringsCopy = {
  headline: "How you hire FoodSense",
  body: "One practice. Three ways to engage. The work is stack standardization — advising, guiding, enabling, and helping implement. Not a software license. Not a packaged catalog.",
  modes: [
    {
      slug: "advisory",
      title: "Advisory",
      body: "For the decision-maker at 10+ units who needs the gap named and a sequence for what to standardize. In the first stretch of the SOW we name what is fractured, advise on order of work, and guide the teams that already exist.",
      doNot:
        "Do not: become extra FTE, configure POS or kiosk as the trench crew, sell software, take single-unit independents.",
    },
    {
      slug: "fractional-work",
      title: "Fractional work",
      body: "For the same operator who needs ongoing program leadership without a full-time hire. Embedded cadence: advise, guide, enable. Keep standardization moving month to month.",
      doNot:
        "Do not: move as the trench crew, replace vendor professional services, run the restaurants.",
    },
    {
      slug: "project-management",
      title: "Project management",
      body: "For a bounded initiative. Plan, named owners, vendor accountability, and a first milestone — then the timeframe in the SOW.",
      doNot: "Do not: become the vendor implementation team.",
    },
  ],
} as const;

export const howWeWorkCopy = {
  headline: "How we work",
  intro:
    "We guide existing teams. We do not move as the trench crew. Engagements often start as Advisory, then become Fractional work or a bounded project.",
  steps: [
    {
      title: "Pick a mode",
      body: "Advisory, Fractional work, or Project management.",
    },
    {
      title: "Define the scope of work and the timeframe",
      body: "What is in. What is out. Who owns each handoff. How long.",
    },
    {
      title: "Initiation, then monthly",
      body: "An initiation fee starts the work. A monthly fee is sized to the project and the expected business. Rates are not published on this site.",
    },
  ],
  close:
    "Then the work itself: advise, guide, enable, help implement standardization.",
} as const;

export const proofCopy = {
  headline: "The operator behind the practice",
  origin:
    "After leaving a multi-unit off-premise operator, the need was obvious: restaurants had to onboard into a technology era. First it was getting operators onto delivery. During COVID it was survival — new menus, real-time tests, kitchens pivoting to stay open. Then an enterprise program with a well-recognized burger brand: bigger platforms, bigger teams, heavy cross-functional work.",
  villain:
    "Inside that work the pattern was a disconnect between teams. The stack lived in silos. Nothing integrated. Everything was fractured. Technology should enable better cross-functional participation and ownership. That is why FoodSense exists. Vendors that serve brands often move at brand pace. Franchisees need speed of implementation and deployment. FoodSense sits with the operator on that clock.",
  attribution:
    "These are the principal’s roles and engagements. They are not FoodSense-the-firm client counts.",
  beats: [
    {
      title: "Multinational burger chain — program management",
      body: "POS vendor switch at about 400 restaurants a month through 4,500 restaurants, working with 20+ franchisees and equity stores in the US and Canada.",
    },
    {
      title: "Major QSR, Latin America and the Caribbean — senior manager, restaurant technologies",
      body: "The tech stack for about 30 franchisees, 36 countries, 2,200+ restaurants — vendor streamlining, country maturity and adoption assessments, technology adoption programs.",
    },
    {
      title: "Independent consulting",
      body: "Helped open 3 locations for a well-known independently owned brand — about $8M a year combined, about $2.6M AUV per store. Event partnerships including F1 Miami, Miami Open, and Miami Heat, plus other large South Florida events.",
    },
  ],
} as const;

export const faqCopy = {
  headline: "Questions we hear first",
  items: [
    {
      question: "We have internal teams working on this.",
      answer:
        "Good. Keep them. FoodSense advises the decision-maker and guides the Tech and Ops teams that already exist. We do not replace your people.",
    },
    {
      question: "We are working directly with the vendor.",
      answer:
        "Most groups are. Vendor professional-services teams are usually expensive and slow. We already know those teams and can move faster beside them, not as them.",
    },
    {
      question: "We have a local implementation team.",
      answer:
        "They stay. We do not become the local trench crew. The job is to bring Tech, Ops, and Digital to one unit, with named handoffs and someone accountable for each one.",
    },
    {
      question: "What is FoodSense not?",
      answer:
        "Not a software product. Not a general restaurant consultancy. Not a marketing shop. Not a Big 4 body of associates. Not the vendor’s professional-services bench. Not for single-unit independents. We work with a wide network of RestTech players — operators, vendors, implementers — without turning this site into a marketplace.",
    },
    {
      question: "What does done look like?",
      answer:
        "An implementation program that has brought cross-functional teams to work as one unit. Each team understands its handoff points. There is accountability and traceability for that. Operators feel it as speed of service, order accuracy, customer satisfaction, and technology adoption.",
    },
    {
      question: "Do you work with groups under 10 units?",
      answer:
        "This page is written for 10+. We still reply if you are smaller. A conversation makes sense if you have at least 3 locations and a 5–7 year growth pipeline — expansion, investors, or franchising.",
    },
    {
      question: "Where do you work? Is the site in Spanish?",
      answer:
        "Latin America, the Caribbean, and the United States. This site is English. Spanish is later.",
    },
  ],
} as const;

export const contactCopy = {
  headline: "Start a scoped engagement",
  body: "Tell us who you are and what is breaking. We reply within the next business day, and not later than 48 hours in normal business hours. Then we agree on a mode — Advisory, Fractional work, or Project management — and a scope of work.",
  modeNote: "Mode is not a form field. That happens on the follow-up.",
  submitLabel: "Send inquiry",
  submittingLabel: "Sending…",
  success:
    "We received your inquiry. We will get back within the next business day, and no later than 48 hours during normal business hours. Next we agree on a mode and a scope of work.",
  error:
    "We could not send that. Email fabio@foodsense.tech and we will still reply on the same SLA.",
  locationsHelper:
    "We still reply if you are under 10 locations. If you are smaller, we will ask about a 5–7 year growth pipeline. We do not auto-decline.",
} as const;

export const servicesCopy = {
  headline: "Where the work lands",
  body: "You hire FoodSense as Advisory, Fractional work, or Project management. The work itself usually sits in one or more of four domains. Same practice. Same verbs: advise, guide, enable, help implement standardization.",
  modesRecapHeadline: "Delivered through one of three modes",
  modesRecapBody:
    "Advisory names the gap and the order of work. Fractional work keeps the program moving without a full-time hire. Project management runs a bounded initiative to a first milestone. Pick the mode on the follow-up, not as a product SKU on this page.",
  modeLine: "Delivered as Advisory, Fractional work, or Project management.",
  domains: [
    {
      title: "Vendor assessment and tech-implementation standards",
      body: "POS backends — Oracle, NCR, Toast, and similar. Other backend systems: employee management, accounting, inventory. The job is a best-practice standard of implementation so stores are not running three versions of the same stack.",
      stacks:
        "Oracle partners and Oracle vendors. Restaurant software companies. Restaurant solutions operators already run. We work beside those vendors. This is not a recruiting page for them.",
    },
    {
      title: "Customer-facing platforms",
      body: "Third-party and first-party marketplaces. App, kiosk, web, and ordering channels. Aggregators and integrations such as Deliverect and Otter. Reputation-management aggregators. Loyalty here means a customer-facing channel — not a social-media retainer.",
      stacks: null,
    },
    {
      title: "Menu architecture and strategy",
      body: "Competitive pricing analysis. Foodservice supplier pricing negotiations. Paper costs. Profitability analysis. Menu work lives here — not as a standalone “menu optimization” product.",
      stacks: null,
    },
    {
      title: "Development and growth",
      body: "Partnerships. Franchisee partners. Ghost kitchens in new markets. Developers and commercial real estate. New openings and upgrades sit here when they are a growth program, not a one-store independent job.",
      stacks: null,
    },
  ],
  closeHeadline: "Start with a mode, not a catalog",
  closeBody:
    "Tell us what is breaking. We reply within the next business day, and not later than 48 hours in normal business hours. Then we agree on Advisory, Fractional work, or Project management, and a scope of work.",
} as const;

export const aboutCopy = {
  headline: "The operator behind FoodSense",
  body: "FoodSense sells advisory and fractional program management. It closes the gap between restaurant Tech and Ops — and Digital — by advising, guiding, enabling, and helping implement standardization.",
  conferenceLine:
    "We bridge the gap between Tech, Operations, and Digital by leveraging the restaurant tech stack.",
  originHeadline: "Why this practice exists",
  originBody:
    "After leaving a multi-unit off-premise operator, the work was getting restaurants onto delivery, then keeping kitchens alive during COVID — new menus, real-time tests, concepts that had to change in a week. Then came an enterprise program with a well-recognized burger brand: bigger platforms, bigger teams, heavy cross-functional work. That built a wide network of RestTech players already validated with known brands across the United States, the Caribbean, and Latin America. The repeating pattern was a disconnect between teams. Technology should enable better cross-functional participation and ownership. Siloed stacks that do not speak to each other are the problem. FoodSense exists to sit with the decision-maker and guide the teams that already exist — not to become the trench crew.",
  resumeHeadline: "Résumé, anonymized",
  resumeDisclaimer:
    "Employers and restaurant brands are unnamed. Unit counts below are from those roles and engagements. They are not FoodSense-the-firm case studies.",
  differenceHeadline: "How this is different",
  differences: [
    {
      title: "Versus a Big 4 or national consultancy",
      body: "Agile, small team. Works with decision-makers as an advisor. Guides teams that already exist.",
    },
    {
      title: "Versus a POS vendor’s professional-services team",
      body: "Those benches are usually very expensive and slow. FoodSense already knows the vendor teams and can move faster beside them, not as them.",
    },
    {
      title: "Versus “we know people”",
      body: "A wide network of RestTech players — operators, vendors, implementers — that the advisor can pull in. Not a product. Not a marketplace on this site.",
    },
  ],
} as const;

export const footerCopy = {
  tagline:
    "FoodSense advises, guides, enables, and helps implement stack standardization for multi-unit restaurant operators.",
  geo: "Latin America · Caribbean · United States",
} as const;

export const cookieCopy = {
  headline: "Cookies on this site",
  body: "Essential cookies keep the site working. Measurement cookies (Google Analytics 4) run only if you opt in. We do not send your name, email, or phone to analytics.",
  accept: "Accept measurement",
  reject: "Reject measurement",
} as const;
