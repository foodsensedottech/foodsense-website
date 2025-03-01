"use client";

import React, { useEffect } from "react";
import { handleError } from '@/lib/utils';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error
    handleError({
      message: error.message,
      severity: "error",
      context: {
        component: "ErrorBoundary",
        action: "error_handler",
      },
    });
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-2xl font-bold text-red-600">
        Something went wrong!
      </h2>
      <p className="mb-4 text-gray-600">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "An error occurred"}
      </p>
      <button
        onClick={reset}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
