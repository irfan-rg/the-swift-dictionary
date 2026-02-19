"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="font-playfair text-4xl font-bold text-neutral-900 dark:text-white mb-4">
        Something went wrong
      </h1>
      <div className="h-[2px] w-20 accent-gradient rounded-full opacity-80 mb-6" />
      <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:shadow transform hover:-translate-y-0.5 transition-all duration-200"
      >
        Try Again
      </button>
    </div>
  );
}
