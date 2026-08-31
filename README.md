# FoodSense Website

Marketing site for FoodSense — boutique restaurant technology consultancy.

**Website 2.0** is merged on branch `fixes-20250301-195504` (PR #10, Aug 2026). Documentation: [`docs/README.md`](./docs/README.md). Git workflow: [`docs/website-2.0/git-workflow.md`](./docs/website-2.0/git-workflow.md). Tasks: [ClickUp Website Redesign board](https://app.clickup.com/90131064868/v/b/6-901328341052-2).

## Stack

- Next.js App Router + TypeScript + Tailwind
- Contentful CMS (lean 11-type model)
- ClickUp CRM (unified contact form on homepage + `/contact`; HubSpot legacy fallback)
- Google Analytics / Clarity

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/foodsense-website.git
cd foodsense-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your configuration values.

4. Required environment variables:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_MANAGEMENT_TOKEN=your_cma_token   # migrations / scripts only
CLICKUP_API_TOKEN=your_clickup_token
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
foodsense-website/
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # React components
│   ├── lib/            # Utility functions and configurations
│   └── styles/         # Global styles
├── public/             # Static assets
└── ...configuration files
```

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Contentful](https://www.contentful.com/) - Headless CMS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icons

## Analytics and Monitoring

The website uses:

- Google Analytics 4 for traffic analysis
- Microsoft Clarity for user behavior tracking
- Console logging in development for debugging

## Deployment

The website can be deployed to any platform that supports Next.js, such as:

- Vercel (recommended)
- Netlify
- AWS
- Digital Ocean

## Development

For local development:

```bash
# Start the development server
npm run dev

# If you encounter build cache issues, use clean development
npm run dev:clean
```

## Production Build

```bash
# For GitHub deployment
npm run build:github

# For production deployment with sitemap generation
npm run build
```

## Contributing

Branch off `fixes-20250301-195504` — see [`docs/website-2.0/git-workflow.md`](./docs/website-2.0/git-workflow.md).

1. Fetch and checkout the integration branch
2. Create a feature branch (`cursor/<description>-772b`)
3. Commit, push, and open a PR into `fixes-20250301-195504`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
