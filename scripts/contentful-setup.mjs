/**
 * Create FoodSense marketing content types in Contentful and seed fallback copy.
 *
 * Usage:
 *   CONTENTFUL_SPACE_ID=... CONTENTFUL_MANAGEMENT_TOKEN=... npm run contentful:setup
 *
 * Token: Contentful → User profile → CMA tokens (full access to this space).
 */
const SPACE = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENV = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!SPACE || !TOKEN) {
  console.error("Set CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN.");
  process.exit(1);
}

const API = `https://api.contentful.com/spaces/${SPACE}/environments/${ENV}`;

const symbol = (id, name, required = false) => ({
  id,
  name,
  type: "Symbol",
  required,
  localized: false,
});
const text = (id, name, required = false) => ({
  id,
  name,
  type: "Text",
  required,
  localized: false,
});
const integer = (id, name) => ({
  id,
  name,
  type: "Integer",
  required: false,
  localized: false,
});
const image = (id = "image", name = "Image") => ({
  id,
  name,
  type: "Link",
  linkType: "Asset",
  required: false,
  localized: false,
  validations: [{ linkMimetypeGroup: ["image"] }],
});

const MODEL = [
  {
    id: "siteChrome",
    name: "Site chrome",
    displayField: "ctaLabel",
    fields: [
      symbol("ctaLabel", "CTA label", true),
      symbol("navOfferings", "Nav: Offerings"),
      symbol("navServices", "Nav: Services"),
      symbol("navAbout", "Nav: About"),
      symbol("navContact", "Nav: Contact"),
      text("footerTagline", "Footer tagline"),
      symbol("footerGeo", "Footer geography"),
      symbol("footerEmail", "Footer email"),
      symbol("linkedInUrl", "LinkedIn URL"),
      symbol("instagramUrl", "Instagram URL"),
      symbol("cookieHeadline", "Cookie headline"),
      text("cookieBody", "Cookie body"),
      symbol("cookieAccept", "Cookie accept"),
      symbol("cookieReject", "Cookie reject"),
    ],
  },
  {
    id: "forWhomSection",
    name: "For whom section",
    displayField: "headline",
    fields: [
      symbol("headline", "Headline", true),
      text("intro", "Intro"),
      text("primaryAudience", "Primary audience"),
      text("notCustomer", "Not a customer"),
      text("replaceIntro", "We do not replace intro"),
      text("floorNote", "Floor note"),
    ],
  },
  {
    id: "forWhomCard",
    name: "For whom card",
    displayField: "title",
    fields: [
      symbol("title", "Title", true),
      text("body", "Body", true),
      integer("sortOrder", "Sort order"),
      image(),
    ],
  },
  {
    id: "offeringsSection",
    name: "Offerings section",
    displayField: "headline",
    fields: [
      symbol("headline", "Headline", true),
      text("body", "Body"),
    ],
  },
  {
    id: "offeringMode",
    name: "Offering mode",
    displayField: "title",
    fields: [
      symbol("title", "Title", true),
      text("body", "Body", true),
      text("doNot", "Do not"),
      symbol("slug", "Slug"),
      integer("sortOrder", "Sort order"),
      image(),
    ],
  },
  {
    id: "howWeWorkSection",
    name: "How we work section",
    displayField: "headline",
    fields: [
      symbol("headline", "Headline", true),
      text("intro", "Intro"),
      text("close", "Close"),
    ],
  },
  {
    id: "howWeWorkStep",
    name: "How we work step",
    displayField: "title",
    fields: [
      symbol("title", "Title", true),
      text("body", "Body", true),
      integer("sortOrder", "Sort order"),
      image(),
    ],
  },
  {
    id: "proofSection",
    name: "Proof section",
    displayField: "headline",
    fields: [
      symbol("headline", "Headline", true),
      text("origin", "Origin"),
      text("villain", "Villain"),
      text("attributionNote", "Attribution note"),
    ],
  },
  {
    id: "proofBeat",
    name: "Proof beat",
    displayField: "title",
    fields: [
      symbol("title", "Title", true),
      text("body", "Body", true),
      integer("sortOrder", "Sort order"),
      image(),
    ],
  },
  {
    id: "faqSection",
    name: "FAQ section",
    displayField: "headline",
    fields: [symbol("headline", "Headline", true)],
  },
  {
    id: "faqItem",
    name: "FAQ item",
    displayField: "question",
    fields: [
      symbol("question", "Question", true),
      text("answer", "Answer", true),
      integer("sortOrder", "Sort order"),
    ],
  },
  {
    id: "contactSection",
    name: "Contact section",
    displayField: "headline",
    fields: [
      symbol("headline", "Headline", true),
      text("body", "Body"),
      text("modeNote", "Mode note"),
      symbol("submitLabel", "Submit label"),
      symbol("submittingLabel", "Submitting label"),
      text("successMessage", "Success message"),
      text("errorMessage", "Error message"),
      text("locationsHelper", "Locations helper"),
      symbol("calendarHeadline", "Calendar headline"),
      text("calendarBody", "Calendar body"),
    ],
  },
  {
    id: "servicePage",
    name: "Services page",
    displayField: "headline",
    fields: [
      symbol("headline", "Headline", true),
      text("body", "Body"),
      symbol("modesRecapHeadline", "Modes recap headline"),
      text("modesRecapBody", "Modes recap body"),
      text("modeLine", "Mode line"),
      symbol("closeHeadline", "Close headline"),
      text("closeBody", "Close body"),
    ],
  },
  {
    id: "serviceDomain",
    name: "Service domain",
    displayField: "title",
    fields: [
      symbol("title", "Title", true),
      text("body", "Body", true),
      text("stacks", "Stacks line"),
      integer("sortOrder", "Sort order"),
      image(),
    ],
  },
  {
    id: "aboutPage",
    name: "About page",
    displayField: "headline",
    fields: [
      symbol("headline", "Headline", true),
      text("body", "Body"),
      text("conferenceLine", "Conference line"),
      symbol("originHeadline", "Origin headline"),
      text("originBody", "Origin body"),
      symbol("resumeHeadline", "Resume headline"),
      text("resumeDisclaimer", "Resume disclaimer"),
      symbol("differenceHeadline", "Difference headline"),
    ],
  },
  {
    id: "aboutDifference",
    name: "About difference",
    displayField: "title",
    fields: [
      symbol("title", "Title", true),
      text("body", "Body", true),
      integer("sortOrder", "Sort order"),
      image(),
    ],
  },
];

const HERO_EXTRA_FIELDS = [
  symbol("heroEyebrow", "Eyebrow"),
  symbol("heroCta", "CTA label"),
  symbol("heroCtaHref", "CTA href"),
];

async function cma(method, path, body, extraHeaders = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(`${method} ${path} → ${res.status} ${JSON.stringify(json)}`);
    err.status = res.status;
    err.payload = json;
    throw err;
  }
  return json;
}

async function putContentType(type) {
  let version = 1;
  try {
    const existing = await cma("GET", `/content_types/${type.id}`);
    version = existing.sys.version;
  } catch (error) {
    if (error.status !== 404) throw error;
  }

  const saved = await cma(
    "PUT",
    `/content_types/${type.id}`,
    {
      name: type.name,
      displayField: type.displayField,
      fields: type.fields,
    },
    { "X-Contentful-Version": String(version) }
  );
  await cma(
    "PUT",
    `/content_types/${type.id}/published`,
    undefined,
    { "X-Contentful-Version": String(saved.sys.version) }
  );
  console.log("content type", type.id);
}

async function ensureHeroFields() {
  let hero;
  try {
    hero = await cma("GET", "/content_types/heroFields");
  } catch (error) {
    if (error.status === 404) {
      console.warn("heroFields not found — skip extra hero fields.");
      return;
    }
    throw error;
  }
  const have = new Set(hero.fields.map((field) => field.id));
  const missing = HERO_EXTRA_FIELDS.filter((field) => !have.has(field.id));
  if (!missing.length) return;
  const saved = await cma(
    "PUT",
    "/content_types/heroFields",
    {
      name: hero.name,
      displayField: hero.displayField,
      fields: [...hero.fields, ...missing],
    },
    { "X-Contentful-Version": String(hero.sys.version) }
  );
  await cma(
    "PUT",
    "/content_types/heroFields/published",
    undefined,
    { "X-Contentful-Version": String(saved.sys.version) }
  );
  console.log("extended heroFields");
}

async function main() {
  for (const type of MODEL) {
    await putContentType(type);
  }
  await ensureHeroFields();
  console.log("Content model is ready. Publish entries in Contentful, then attach images on cards.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
