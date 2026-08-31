# Git workflow — Website 2.0

**Active branch:** `cursor/website-2.0-772b`  
**Merge target:** `fixes-20250301-195504`  
**Preview:** Vercel deployment of the Website 2.0 branch only

Do not develop on `website-ia-refresh`, `main`, or other feature branches unless explicitly reviving archived work.

---

## Daily workflow

```bash
cd /path/to/foodsense-website
git fetch origin
git checkout cursor/website-2.0-772b
git pull origin cursor/website-2.0-772b
git status   # commit or stash before switching branches
```

If the local branch does not exist:

```bash
git fetch origin cursor/website-2.0-772b
git checkout -B cursor/website-2.0-772b FETCH_HEAD
```

---

## Sources of truth

| Layer | Canonical |
| --- | --- |
| Code | `cursor/website-2.0-772b` → PR #10 |
| Product decisions | [`decisions.md`](./decisions.md) |
| Technical plan | [`assessment.md`](./assessment.md) |
| CMS model | Contentful `master` — 11 types ([`contentful.md`](./contentful.md)) |
| CRM | ClickUp Leads — Strategy Audit + `/contact` |

---

## Archived branches (do not use)

These were closed and deleted after Website 2.0 superseded them:

| Branch | Was |
| --- | --- |
| `website-ia-refresh` | One-company IA + old multi-section homepage |
| `cursor/conversion-homepage-772b` | Early conversion homepage (merged into website-2.0) |
| `cursor/homepage-multiunit-sections-772b` | Multi-section franchisee homepage |
| `cursor/franchisee-landing-772b` | Franchisee landing (in git history via #4–#5) |
| `cursor/restore-contentful-revalidation-772b` | Revalidation (in git history via #3) |

Legacy `main` / `v2-development` are HubSpot-era; not the active line.

---

## Documentation

- **Current:** `docs/website-2.0/`, `docs/brand/`, `docs/engineering/`
- **Historical only:** `docs/archive/`, `docs/contentful/*-legacy.md` — do not follow for new work

If two docs disagree, **`decisions.md` and live Website 2.0 code win.**
