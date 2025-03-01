# Contentful Revalidation Setup

This document explains how to set up Contentful webhooks to trigger on-demand revalidation for your Next.js website.

## How It Works

1. Next.js builds static pages at build time
2. When content changes in Contentful, a webhook is triggered
3. The webhook calls our revalidation API endpoint
4. The API endpoint revalidates the affected pages
5. Users see the updated content without a full rebuild

## Setting Up the Webhook in Contentful

1. Log in to your Contentful account
2. Go to Settings > Webhooks
3. Click "Add Webhook"
4. Fill in the following details:

   - Name: "Next.js Revalidation"
   - URL: `https://your-production-domain.com/api/revalidate?secret=your-secure-random-token`

   Replace:

   - `your-production-domain.com` with your actual website domain (e.g., `foodsense.tech` or `your-site.vercel.app`)
   - `your-secure-random-token` with the value from your `.env.local` file (the same value as `CONTENTFUL_REVALIDATION_SECRET`)

   - Triggers: Select "Create", "Save", "Publish", "Unpublish", and "Delete" for Entries
   - Content Type: Select all relevant content types
   - Include Entry Body: Yes

## Environment Variables

Make sure your `.env.local` file and deployment environment have the following variable:

```
CONTENTFUL_REVALIDATION_SECRET=your-secure-random-token
```

### Generating a Secure Token

Instead of using a simple password, generate a secure random token:

```bash
# Using OpenSSL (recommended)
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

This token must match the one you use in the webhook URL.

## Testing the Webhook

1. Make a change to any content in Contentful and publish it
2. Check your server logs for messages like "Revalidated path: /about"
3. Visit your website to see the updated content

### Manual Testing

You can also manually test the revalidation endpoint using a GET request:

```
https://your-production-domain.com/api/revalidate?secret=your-secure-random-token&path=/about
```

Replace:

- `your-production-domain.com` with your actual website domain
- `your-secure-random-token` with your secret token from `.env.local`
- `/about` with the path you want to revalidate

For local testing, use:

```
http://localhost:3000/api/revalidate?secret=your-secure-random-token&path=/about
```

This will revalidate the specified path. You should see a JSON response confirming the revalidation.

## Troubleshooting

- If revalidation isn't working, check your server logs for error messages
- Verify that the secret token matches between your webhook URL and environment variable
- Ensure your webhook URL is accessible from the internet
- Check that the content type of the changed entry is handled in the revalidation API route
