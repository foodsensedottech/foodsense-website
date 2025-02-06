# FoodSense Website

A modern restaurant management platform built with Next.js 14.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

This project is automatically deployed to Vercel through GitHub Actions. 

- Production: [https://foodsense.vercel.app](https://foodsense.vercel.app)
- Staging: Every PR gets a preview deployment

### Branch Strategy
- `main` → Production (auto-deploys)
- `develop` → Staging (optional)
- Feature branches → PR previews

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Required variables are:
- `NEXT_PUBLIC_BASE_URL`: Your app's URL
- `NEXTAUTH_URL`: Same as BASE_URL
- `NEXTAUTH_SECRET`: Auth secret (auto-generated in production)

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Analytics

Analytics are enabled in production only. To set up:

1. Get your Google Analytics ID (format: G-XXXXXXXXXX)
2. Add to Vercel environment variables:
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_ENABLE_ANALYTICS=true`
3. Only enabled when:
   - Environment is production
   - GA ID is configured
   - Analytics are explicitly enabled
