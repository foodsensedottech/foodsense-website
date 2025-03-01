"use client";

import * as React from "react";

export function IconPreloader() {
  React.useEffect(() => {
    // No need to preload icons anymore since we're importing them directly
    return () => {};
  }, []);

  return null;
}
