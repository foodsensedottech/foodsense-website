# Git workflow — Website 2.0

**Integration branch:** `fixes-20250301-195504`  
**Website 2.0 merge:** PR #10 squash-merged 31 Aug 2026 → commit `1691d6b`  
**Preview / Production:** Vercel deploys from the integration branch (and PR previews for feature branches)

Do not develop on `website-ia-refresh`, `main`, or archived feature branches unless explicitly reviving old work.

---

## Daily workflow

```bash
cd /path/to/foodsense-website
git fetch origin
git checkout fixes-20250301-195504
git pull origin fixes-20250301-195504
git status   # commit or stash before switching branches
```

**New work:** branch off `fixes-20250301-195504`, open a PR back into it.

```bash
git checkout fixes-20250301-195504
git pull origin fixes-20250301-195504
git checkout -b cursor/<short-description>-772b
# … commits …
git push -u origin cursor/<short-description>-772b
```

Agent/cloud branches use the prefix `cursor/` and suffix `-772b`.

---

## Sources of truth

| Layer | Canonical |
| --- | --- |
| Code | `fixes-20250301-195504` (Website 2.0 merged) |
| Task tracking | ClickUp **Website Redesign Tasks** — [board](https://app.clickup.com/90131064868/v/b/6-901328341052-2) |
| Product decisions | [`decisions.md`](./decisions.md) |
| Technical plan | [`assessment.md`](./assessment.md) |
| CMS model | Contentful `master` — 11 types ([`contentful.md`](./contentful.md)) |
| CRM | ClickUp Leads — unified contact form (homepage + `/contact`) |

---

## Merged feature branch (historical)

`cursor/website-2.0-772b` delivered Website 2.0 via PR #10. Do not continue committing to it; branch off `fixes-20250301-195504` instead. The remote feature branch may be deleted after merge.

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
