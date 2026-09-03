import { fetchFirstEntryFields } from "@/lib/contentful/fetch-entry";
import {
  contentfulLocale,
  linkedEntries,
  mapTitleBody,
  pickJson,
  pickString,
} from "@/lib/contentful/fields";
import {
  getFranchiseeCopy,
  type FranchiseeCopy,
  type FranchiseeLocale,
} from "@/lib/franchisees/copy";

const QUESTION_KEYS = [
  "locations",
  "region",
  "pos",
  "kds",
  "delivery",
  "payments",
] as const;

type QuestionKey = (typeof QUESTION_KEYS)[number];

function mergeQuestions(
  seed: FranchiseeCopy["questions"],
  cms: unknown
): FranchiseeCopy["questions"] {
  if (!cms || typeof cms !== "object") return structuredClone(seed);
  const source = cms as Record<string, unknown>;
  const next = structuredClone(seed);

  for (const key of QUESTION_KEYS) {
    const entry = source[key];
    if (!entry || typeof entry !== "object") continue;
    const record = entry as { label?: unknown; options?: unknown };
    if (typeof record.label === "string" && record.label.trim()) {
      next[key as QuestionKey].label = record.label.trim();
    }
    if (Array.isArray(record.options)) {
      const options = record.options
        .map((option) => {
          if (!option || typeof option !== "object") return null;
          const value = (option as { value?: unknown }).value;
          const label = (option as { label?: unknown }).label;
          if (typeof value !== "string" || typeof label !== "string") return null;
          if (!value.trim() || !label.trim()) return null;
          return { value: value.trim(), label: label.trim() };
        })
        .filter(Boolean) as FranchiseeCopy["questions"][QuestionKey]["options"];
      if (options.length) {
        next[key].options = options;
      }
    }
  }

  return next;
}

function mergeCards(
  seed: FranchiseeCopy["pains"],
  field: unknown
): FranchiseeCopy["pains"] {
  const cards = linkedEntries(field)
    .map(mapTitleBody)
    .filter(Boolean) as FranchiseeCopy["pains"];
  return cards.length ? cards : seed.map((card) => ({ ...card }));
}

function mergeCopy(
  seed: FranchiseeCopy,
  fields: Record<string, unknown>
): FranchiseeCopy {
  const str = (keys: string[], fallback: string) =>
    pickString(fields, keys) || fallback;

  return {
    htmlLang: str(["htmlLang"], seed.htmlLang),
    metaTitle: str(["metaTitle"], seed.metaTitle),
    metaDescription: str(["metaDescription"], seed.metaDescription),
    navLabel: str(["navLabel"], seed.navLabel),
    otherLocaleLabel: str(["otherLocaleLabel"], seed.otherLocaleLabel),
    otherLocaleHref: str(["otherLocaleHref"], seed.otherLocaleHref),
    heroEyebrow: str(["heroEyebrow"], seed.heroEyebrow),
    heroHeadline: str(["heroHeadline"], seed.heroHeadline),
    heroSubheadline: str(["heroSubheadline"], seed.heroSubheadline),
    heroPrimaryCta: str(["heroPrimaryCta"], seed.heroPrimaryCta),
    heroSecondaryCta: str(["heroSecondaryCta"], seed.heroSecondaryCta),
    trustMetric: str(["trustMetric"], seed.trustMetric),
    painHeading: str(["painHeading", "painsHeading"], seed.painHeading),
    painIntro: str(["painIntro", "painsIntro"], seed.painIntro),
    pains: mergeCards(seed.pains, fields.pains),
    offersHeading: str(["offersHeading"], seed.offersHeading),
    offersIntro: str(["offersIntro"], seed.offersIntro),
    offers: mergeCards(seed.offers, fields.offers),
    assessmentHeading: str(["assessmentHeading"], seed.assessmentHeading),
    assessmentIntro: str(["assessmentIntro"], seed.assessmentIntro),
    assessmentCta: str(["assessmentCta"], seed.assessmentCta),
    questions: mergeQuestions(
      seed.questions,
      pickJson(fields, ["questions"]) ?? fields.questions
    ),
    capture: {
      heading: str(["captureHeading"], seed.capture.heading),
      intro: str(["captureIntro"], seed.capture.intro),
      name: str(["captureName"], seed.capture.name),
      email: str(["captureEmail"], seed.capture.email),
      company: str(["captureCompany"], seed.capture.company),
      submit: str(["captureSubmit"], seed.capture.submit),
      submitting: str(["captureSubmitting"], seed.capture.submitting),
      error: str(["captureError"], seed.capture.error),
    },
    results: {
      heading: str(["resultsHeading"], seed.results.heading),
      bands: {
        optimized: str(["resultOptimized"], seed.results.bands.optimized),
        scaling: str(["resultScaling"], seed.results.bands.scaling),
        fragmented: str(["resultFragmented"], seed.results.bands.fragmented),
      },
      nextCta: str(["resultsNextCta"], seed.results.nextCta),
      restart: str(["resultsRestart"], seed.results.restart),
    },
    next: str(["nextLabel"], seed.next),
    back: str(["backLabel"], seed.back),
  };
}

/** Set this API ID before the first Save. UI guesses (`franchisees`) also work. */
export const FRANCHISEE_CONTENT_TYPES = [
  "franchiseeLandingPage",
  "franchisee",
  "franchisees",
] as const;

/**
 * `/franchisees` from Contentful. Linked pains/offers reuse
 * `conversionMenuItem`. Locale `es` reads Contentful locale `es`.
 */
export async function getFranchiseePage(
  locale: FranchiseeLocale = "en"
): Promise<FranchiseeCopy> {
  const seed = structuredClone(getFranchiseeCopy(locale)) as FranchiseeCopy;
  try {
    const fields = await fetchFirstEntryFields([...FRANCHISEE_CONTENT_TYPES], {
      include: 2,
      locale: contentfulLocale(locale),
    });
    if (!fields) return seed;
    return mergeCopy(seed, fields);
  } catch (error) {
    console.error("Error fetching franchisee landing page:", error);
    return seed;
  }
}
