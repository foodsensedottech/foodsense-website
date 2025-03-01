import React from "react";
import { appLogger } from "@/lib/utils";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  React.useEffect(() => {
    appLogger.error(error.message, {
      component: "ErrorFallback",
      action: "render",
      metadata: {
        stack: error.stack,
      },
    });
  }, [error]);

  return (
    <div className="p-4 bg-red-50 rounded-lg">
      <h2 className="text-lg font-semibold text-red-800">
        Something went wrong
      </h2>
      <p className="mt-2 text-red-600">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "An error occurred"}
      </p>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}
