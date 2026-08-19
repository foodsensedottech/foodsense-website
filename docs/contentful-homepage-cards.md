# Homepage copy in Contentful (paste pack)

The homepage reads **only** published Contentful entries. There is no Spanish site and no fallback marketing copy in the code. Until you add a Spanish locale in Contentful, `/es` redirects to `/`.

Page order: Hero → About → Pains → Offerings → Contact.

Create or edit entries under **Content → Add entry**, then **Publish**. If a description is longer than 255 characters, change that field from Short text to **Long text**.

---

## 1. Hero (`heroFields`)

Edit the existing Hero entry. Optionally add two Short text fields on the content type, then fill them.

| Field API ID | Paste |
| --- | --- |
| `heroEyebrow` | US · Latin America · Caribbean |
| `heroHeading` | Next-Gen Restaurant Tech for Multi-Unit Franchisees. |
| `heroSubheading` | We turn global enterprise strategy into scalable store-level architecture across POS, kiosk, payments, and data governance. |
| `heroCta` | Talk to Our Team |

Keep the existing background image.

If `heroEyebrow` or `heroCta` are missing from the content type, add them (Short text), then paste the values above. The yellow button only appears when `heroCta` is published.

Optional SEO (if the linked SEO entry exists):

| Field | Paste |
| --- | --- |
| Title | FoodSense \| Restaurant Tech for Multi-Unit Franchisees |
| Description | Next-gen restaurant technology for multi-unit franchisees across the US, Latin America, and the Caribbean. POS, kiosk, payments, and data governance at scale. |

---

## 2. About title (`aboutUsTitleSubtitle`)

Edit the existing About Us Title entry.

**Heading**

```
Who We Are
```

**Subheading** (use Long text)

```
FoodSense is a restaurant-technology consultancy built on a decade inside operators that run at scale. We helped shape early cloud-kitchen and delivery stacks at REEF, deployed POS across the US and Canada at Restaurant Brands International, and led restaurant technology for KFC across Latin America and the Caribbean — more than 20 countries and 2,200 restaurants. We know the vendors. We know the franchisees. We close the gap between technology and operations.
```

---

## 3. About cards (`aboutUsCard`)

Edit the four existing About Us Card entries (do not create extras, or they will all show). Use Lucide names in `lucideIcon`.

### Card 1

**Title**

```
Proven Results
```

**Description**

```
Technology programs that have already run at brand scale: POS across the US and Canada, and restaurant-tech leadership for KFC in Latin America and the Caribbean — 20+ countries, 2,200 restaurants, plus cybersecurity and IT infrastructure standards.
```

**lucideIcon**

```
LineChart
```

### Card 2

**Title**

```
Vendor Assessment and Restaurant Tech Implementation
```

**Description**

```
We work with the major vendors in the restaurant tech space — Oracle, NCR, Deliverect, Orquest, HME, Summit, APEX Food lockers, Eyecatch, Tillster, GRUBBRR, and others — so features, pricing, and support are standardized instead of reinvented store by store.
```

**lucideIcon**

```
ClipboardCheck
```

### Card 3

**Title**

```
Project and Program Management
```

**Description**

```
Fractional project and program management for POS deployment, KDS optimization, and the other cutovers that cannot stall the line. We own the plan, the vendors, and store-level landing.
```

**lucideIcon**

```
ListChecks
```

### Card 4

**Title**

```
Intersection between Technology and Operations
```

**Description**

```
Most franchise groups have a gap between the tech team and the operations team. We bring both: how restaurants actually run, and how to implement technology so crews adopt it.
```

**lucideIcon**

```
Users
```

---

## 4. Pains title (`franchiseePainsTitle`)

One published entry.

**Title or Heading**

```
What breaks when you scale past 10 units
```

**Description or Subheading**

```
Multi-unit operators need predictable execution, labor efficiency, third-party margin protection, and uniform visibility across stores.
```

---

## 5. Pain cards (`franchiseePainCard`)

### Card 1

**Title**

```
Fragmented tech stacks
```

**Description**

```
Three POS versions or mismatched KDS/KMS across 15 locations. Every store becomes a one-off, and enterprise playbooks never land.
```

**lucideIcon**

```
Layers
```

### Card 2

**Title**

```
Margin leak on delivery and promos
```

**Description**

```
Un-optimized third-party fees and promo spend quietly erase the profit you thought extra volume would create.
```

**lucideIcon**

```
Percent
```

### Card 3

**Title**

```
Vendor lock-in and rogue tooling
```

**Description**

```
Store GMs deploy non-compliant apps or unapproved payment processors. The group loses control of data, fees, and risk.
```

**lucideIcon**

```
ShieldAlert
```

### Card 4

**Title**

```
No single view of the group
```

**Description**

```
Labor, sales, and menu data live in different systems per market. You cannot compare stores, and decisions lag the P&L.
```

**lucideIcon**

```
LineChart
```

---

## 6. Offerings title (`franchiseeOffersTitle`)

One published entry.

**Heading**

```
Packaged systems, not general consulting
```

**Subheading**

```
Repeatable, enterprise-tested offerings built for franchisee groups running 10+ units across the US, Latin America, and the Caribbean.
```

---

## 7. Offer cards (`franchiseeOfferCard`)

### Card 1

**Title**

```
Franchisee Tech Maturity Assessment
```

**Description**

```
A structured scorecard of tech adoption, readiness, and ROI across your locations — using the same discipline as enterprise playbooks.
```

**lucideIcon**

```
ClipboardCheck
```

### Card 2

**Title**

```
POS and kiosk migration
```

**Description**

```
Risk-controlled platform transitions, BOH integration, and store training so cutover does not stall operations.
```

**lucideIcon**

```
Store
```

### Card 3

**Title**

```
Payments and wallet architecture
```

**Description**

```
Lower processing fees and tighten card/POS workflows so every unit runs the same approved payment stack.
```

**lucideIcon**

```
Wallet
```

### Card 4

**Title**

```
Multi-market stack standardization
```

**Description**

```
One approved architecture for US, LATAM, and Caribbean units — localized where it must be, standardized where it counts.
```

**lucideIcon**

```
Globe
```

---

## 8. Contact title (`contactTitleAndSubtitle`)

Create this content type if it does not exist:

1. **Content model → Add content type**
2. Name: `Contact Title and Subtitle`
3. API identifier: `contactTitleAndSubtitle`
4. Fields:
   - `heading` — Short text
   - `subheading` — Long text
5. Create one entry, paste the copy below, **Publish**

The site also accepts `contactUsTitleSubtitle` or `contactTitleSubtitle` if you already have one of those IDs.

**Heading**

```
Contact Us
```

**Subheading**

```
Fill out this form and we will be in touch with you as soon as possible.
```

If this entry is unpublished, the contact form still renders; the heading and intro do not.

---

## After publishing

- Spanish routes (`/es`) redirect to `/` until you add Contentful locales and wire them.
- Header / footer labels (About, Pains, Offerings, Contact, Get Started) and HubSpot form field labels stay in site chrome so CRM field values do not drift.
- After code is on Production, **Promote to Production** in Vercel if the live site does not update.
