# Where to edit Contentful (visual map)

> **Historical — Website 1.x.** Current CMS map: [`website-2.0/contentful.md`](../website-2.0/contentful.md).

**Rule of thumb**

| Goal | Go here |
| --- | --- |
| Change the **words** on the website | **Content** (entries) |
| Change the **fields / structure** (add a new field) | **Content model** (content types) |

Almost always you want **Content**.

---

## Two home screens

1. **All entries (edit copy)**  
   https://app.contentful.com/spaces/es87a9loayi1/entries

2. **Content model (structure / Visual Modeler)**  
   https://app.contentful.com/spaces/es87a9loayi1/content_types  
   Visual modeler: https://app.contentful.com/spaces/es87a9loayi1/visual_modeler/content_types

Tip: On the entries page, use the **content type filter** (dropdown) to show only e.g. `About difference card` or `Hero Fields`.

After editing → click **Publish** (or Publish changes). Drafts do not appear on the live site.

---

## Homepage map → open these entries

```
┌─────────────────────────────────────────────────────────┐
│  HEADER / FOOTER  →  siteChrome                         │
│  https://app.contentful.com/spaces/es87a9loayi1/entries/2MTJiKdm1QuibujonOEs6r
├─────────────────────────────────────────────────────────┤
│  HERO  →  heroFields                                    │
│  https://app.contentful.com/spaces/es87a9loayi1/entries/66YaALrGfY1Xzy1XY1GmyR
├─────────────────────────────────────────────────────────┤
│  ABOUT title  →  aboutUsTitleSubtitle                   │
│  https://app.contentful.com/spaces/es87a9loayi1/entries/5tTay5jmvkeJCPx27jw2Dk
│                                                         │
│  ABOUT cards  →  aboutUsCard (edit these 4, don’t add)  │
│  • Proven Results                                       │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/42voWpqVNwVz30lYAC5Z3j
│  • Optimization and Profits                             │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/ut5Pk0Znki7QJRqqZAU7d
│  • Customer Reviews & Sentiment                         │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/8KX0fVS0xR93B3Alft7Ib
│  • Expertise in Restaurant Tech                         │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/3bYkWJrCQf7JNbTgmJvYAW
├─────────────────────────────────────────────────────────┤
│  PAINS title  →  franchiseePainsTitle                   │
│  https://app.contentful.com/spaces/es87a9loayi1/entries/6XsMzwbe4XHH9P97qInSeI
│                                                         │
│  PAIN cards  →  franchiseePainCard                      │
│  • Fragmented tech stacks                               │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/7LPbh2QmOifij9chZocJ5C
│  • Margin leak…                                         │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/aLzNIQypMOv9c9nl8HlvI
│  • Vendor lock-in…                                      │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/aNxmyvuEDmwdT8hq5pm9N
│  • Packaged systems…  ← fix this one (wrong section)    │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/5Mw7beX10pRAVtP9WPNH4K
├─────────────────────────────────────────────────────────┤
│  OFFERINGS title  →  franchiseeOffersTitle              │
│  (none yet) Content → Add entry → Franchisee Offers Title
│                                                         │
│  OFFER cards  →  franchiseeOfferCard                    │
│  • Franchisee Tech Maturity Assessment                  │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/7EDPFORM4IyZWIR1Rx0ZEC
│  • POS and kiosk migration                              │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/3ik8KRtnRHzl1AH6KC4BzS
│  • Payments and wallet architecture                     │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/6osN980fDWs0fEShPybyui
│  • Multi-market stack standardization                   │
│    https://app.contentful.com/spaces/es87a9loayi1/entries/1k7I2WYhHuZmu6AW1aX7cT
├─────────────────────────────────────────────────────────┤
│  CONTACT heading (optional)                             │
│  Create: contactTitleAndSubtitle  OR update reuse entry │
│  https://app.contentful.com/spaces/es87a9loayi1/entries/3FJZSn4Uu5yNkb2pm2cXV
│  (rename title to include “Contact” so the site picks it up)
└─────────────────────────────────────────────────────────┘
```

Paste-ready copy: [`contentful-homepage-cards.md`](./contentful-homepage-cards.md)

---

## Make the entries list easier in Contentful

1. Open [Entries](https://app.contentful.com/spaces/es87a9loayi1/entries).
2. Filter by **Content type** (e.g. only `About difference card`).
3. Optional: create a **View** named “Homepage” saved with those filters.
4. Star / favorite entries you edit often (star icon on the entry).

The **Visual Modeler** is for seeing how types relate — not for editing day-to-day marketing text. Use it when you want to add a field (e.g. `navPains` on `siteChrome`).

---

## Quick “what am I looking at?”

| Contentful label (UI name) | API ID | Site section |
| --- | --- | --- |
| Site chrome | `siteChrome` | Header + footer |
| Hero Fields | `heroFields` | Top hero |
| About page | `aboutUsTitleSubtitle` | About heading |
| About difference card | `aboutUsCard` | About cards |
| Franchisee Pains Title | `franchiseePainsTitle` | Pains heading |
| Franchisee Pain Card | `franchiseePainCard` | Pain cards |
| Franchisee Offers Title | `franchiseeOffersTitle` | Offerings heading |
| Franchisee Offer Card | `franchiseeOfferCard` | Offer cards |
| Contact section (reuse) | `testimonialsTitleAndSubtitle` | Contact heading (if title says Contact) |
