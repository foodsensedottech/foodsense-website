// This is an empty middleware file to ensure that the Next.js development server
// doesn't try to generate a middleware file for us, which could cause conflicts.
//
// We've set skipMiddlewareUrlNormalize and skipTrailingSlashRedirect in next.config.js
// to disable middleware functionality, but having this file ensures proper compatibility.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Return next response without any modifications
  return NextResponse.next();
}

// Apply to no routes for maximum compatibility
export const config = {
  matcher: [],
};
