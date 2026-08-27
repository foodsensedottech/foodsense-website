# FoodSense Website Development Guide

## Next.js 15.2.0 Known Issues

The project currently uses Next.js 15.2.0, which has known issues with middleware manifest files in development mode. These issues can cause the following errors:

```
Error: Cannot find module '.next/server/middleware-manifest.json'
```

## Development Scripts

We've created several scripts to help work around these issues:

### Option 1: Standard Development (May Show Errors)

```bash
npm run dev
```

This will run the standard Next.js development server. You might see errors about missing manifest files, but the site should still function correctly in many cases.

### Option 2: Fixed Development Server

```bash
npm run dev:fixed
```

This script runs `scripts/dev-fix.js` before starting the development server, which creates the necessary manifest files. However, Next.js may delete these files during development.

### Option 3: Watched Development Server (Recommended)

```bash
npm run dev:watch
```

This is the recommended approach. It starts the development server while continuously watching for deleted manifest files and recreating them automatically.

### Option 4: Clean Development Server

```bash
npm run dev:clean
```

This removes the `.next` directory before starting the development server, which can help resolve some caching issues.

## First-Time Setup

When cloning this repository for the first time:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install the file watcher dependency:

   ```bash
   npm install chokidar --save-dev
   ```

3. Run the setup script:

   ```bash
   npm run setup
   ```

4. Start the development server with file watching:
   ```bash
   npm run dev:watch
   ```

## Alternative: Downgrading Next.js

If you continue to experience issues, consider downgrading to Next.js 14.1.0:

```bash
npm uninstall next
npm install next@14.1.0
```

This version is stable and doesn't have the middleware manifest issues.
