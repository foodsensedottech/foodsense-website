import { getHeroContent, getAboutCards, getAboutHeading } from "../src/lib/contentful/client";
import { getFranchiseePains, getFranchiseeOffers } from "../src/lib/contentful/franchisee";
import { getSiteChrome } from "../src/lib/contentful/site-chrome";
import { getContactSectionCopy } from "../src/lib/contentful/contact";
import { buildSiteNav } from "../src/lib/contentful/site-nav";
import { getCardIcon } from "../src/lib/about-icons";

async function main() {
  const [hero, aboutH, aboutC, pains, offers, chrome, contact] =
    await Promise.all([
      getHeroContent(),
      getAboutHeading(),
      getAboutCards(),
      getFranchiseePains(),
      getFranchiseeOffers(),
      getSiteChrome(),
      getContactSectionCopy(),
    ]);

  const summary = {
    hero: {
      heading: hero?.fields?.heroHeading,
      cta: hero?.fields?.heroCta ?? null,
      eyebrow: hero?.fields?.heroEyebrow ?? null,
      ctaHref: hero?.fields?.heroCtaHref ?? null,
    },
    about: {
      heading: aboutH?.fields?.heading,
      cards: (aboutC || []).map((c) => c.fields.title),
    },
    pains: {
      heading: pains.heading?.fields?.heading,
      cards: pains.cards.map((c) => ({
        t: c.fields.title,
        icon: c.fields.lucideIcon,
        resolved: !!getCardIcon(c.fields.lucideIcon),
      })),
    },
    offers: {
      heading: offers.heading?.fields?.heading ?? null,
      cards: offers.cards.map((c) => c.fields.title),
    },
    chrome: chrome && {
      cta: chrome.ctaLabel,
      nav: buildSiteNav(chrome).map((n) => n.label),
      email: chrome.footerEmail,
    },
    contact,
  };

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
