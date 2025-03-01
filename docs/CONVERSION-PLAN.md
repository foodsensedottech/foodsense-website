# Single-Page Conversion Plan

## Important Note

All commands and file paths are relative to the root directory:

```bash
cd /foodsense-website
```

DO NOT modify or create files outside of the `/foodsense-website` directory.

## Current Working State (DO NOT MODIFY)

- Base layout is functional
- Contact form with HubSpot works
- Navigation and routing work

## Protected Files (DO NOT MODIFY)

- `/src/lib/hubspot/*` - HubSpot integration
- `/src/components/sections/contact/*` - Contact form
- `/src/app/contact/page.tsx` - Contact page
- `/src/components/layout/*` - All layout components
- `/src/app/page.tsx` - Main page

## Preparation Steps

### Phase 1: Create Section Structure

1. Create sections directory (from root):

```bash
cd /foodsense-website
mkdir -p src/components/sections/{hero,about,services,testimonials,blog}
touch src/components/sections/index.ts
```

2. Update semantic config (existing file):

```typescript
// src/lib/utils/semantic-config.ts
export const semanticConfig = {
  sections: {
    hero: "hero-section",
    about: "about-section",
    services: "services-section",
    testimonials: "testimonials-section",
    blog: "blog-section",
    contact: "contact-section",
  },
  // ... rest of existing config remains unchanged
};
```

### Phase 2: Create Placeholder Files

Create empty exports to maintain structure:

```typescript
// src/components/sections/index.ts
// Empty exports - will be populated later
export {};
```

### Phase 3: Update Routes

1. Keep current routes intact:

```
src/app/
├── page.tsx           # Remains unchanged
├── contact/
│   └── page.tsx      # Remains unchanged
└── layout.tsx        # Remains unchanged
```

## Commit Message

```bash
git add .
git commit -m "chore: Prepare section structure (02-22-25)

- Created section directory structure
- Updated semantic configuration
- Maintained existing functionality
- Protected HubSpot integration
- Prepared for section-based layout

Note: Base functionality remains unchanged.
DO NOT MODIFY: HubSpot, Contact Form, or Layout components"
```

## Next Steps (After Commit)

1. Add sections one by one
2. Update navigation gradually
3. Test each section individually
4. Integrate scroll behavior
5. Update documentation

## Rollback Plan

If needed:

```bash
git reset --hard HEAD~1
git clean -fd
```
