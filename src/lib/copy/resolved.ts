import type { CmsImage } from "@/lib/contentful/fields";

export type NavItemCopy = { label: string; href: string };

export type CopyCardData = {
  title: string;
  body: string;
  extra?: string;
  image?: CmsImage | null;
};

export type SiteChromeCopy = {
  ctaLabel: string;
  navItems: NavItemCopy[];
  footerTagline: string;
  footerGeo: string;
  footerEmail: string;
  linkedInUrl: string;
  instagramUrl: string;
  cookieHeadline: string;
  cookieBody: string;
  cookieAccept: string;
  cookieReject: string;
};

export type HeroCopyResolved = {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCta: string;
  primaryHref: string;
  backgroundImage: CmsImage | null;
};

export type ContactCopyResolved = {
  headline: string;
  body: string;
  modeNote: string;
  submitLabel: string;
  submittingLabel: string;
  success: string;
  error: string;
  locationsHelper: string;
  calendarHeadline: string;
  calendarBody: string;
};

export type HomeMarketingCopy = {
  chrome: SiteChromeCopy;
  hero: HeroCopyResolved;
  forWhom: {
    headline: string;
    intro: string;
    icp: string;
    notFor: string;
    replaceIntro: string;
    floor: string;
    cards: CopyCardData[];
  };
  offerings: {
    headline: string;
    body: string;
    modes: CopyCardData[];
  };
  howWeWork: {
    headline: string;
    intro: string;
    close: string;
    steps: CopyCardData[];
  };
  proof: {
    headline: string;
    origin: string;
    villain: string;
    attribution: string;
    beats: CopyCardData[];
  };
  faq: {
    headline: string;
    items: { question: string; answer: string }[];
  };
  contact: ContactCopyResolved;
};

export type ServicesMarketingCopy = {
  chrome: SiteChromeCopy;
  headline: string;
  body: string;
  modesRecapHeadline: string;
  modesRecapBody: string;
  modeLine: string;
  closeHeadline: string;
  closeBody: string;
  domains: CopyCardData[];
};

export type AboutMarketingCopy = {
  chrome: SiteChromeCopy;
  headline: string;
  body: string;
  conferenceLine: string;
  originHeadline: string;
  originBody: string;
  resumeHeadline: string;
  resumeDisclaimer: string;
  differenceHeadline: string;
  beats: CopyCardData[];
  differences: CopyCardData[];
};
