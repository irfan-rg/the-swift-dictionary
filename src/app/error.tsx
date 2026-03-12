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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-4">
        Error
      </span>
      <h1 className="font-display text-4xl font-medium text-[var(--foreground)] mb-4">
        Something Went Wrong!
      </h1>
      <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mb-8 opacity-50" />
      <p className="font-body text-base text-[var(--foreground-muted)] mb-10 max-w-md leading-relaxed">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-block px-8 py-3 rounded-sm font-body text-sm tracking-widest uppercase text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
