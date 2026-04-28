import React from "react";
import { ArrowLeft } from "lucide-react";

// Realistic varying song title lengths to mirror actual tracklist proportions
const SONG_WIDTHS = [
  "w-32", "w-48", "w-40", "w-56", "w-36",
  "w-44", "w-52", "w-28", "w-48", "w-40",
  "w-36", "w-52", "w-44", "w-32", "w-56",
  "w-40", "w-48", "w-36",
];

export default function AlbumLoading() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 max-md:py-10 animate-pulse">
      {/* Header */}
      <div className="mb-12 max-md:mb-6">
        {/* Back link — inline, hidden on mobile */}
        <span className="max-md:hidden inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded mb-6 select-none">
          <ArrowLeft className="w-3.5 h-3.5 invisible" />
          Back to Explorer
        </span>

        {/* h1 — realistic width matching a mid-length album name like "Midnights" */}
        <h1 className="font-display text-5xl md:text-6xl max-md:text-4xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded mb-3 max-md:mb-2 select-none w-fit">
          Midnights
        </h1>
        <div className="flex items-center gap-3 text-transparent select-none">
          <span className="font-body text-sm bg-[var(--border)] rounded">2022</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)]" />
          <span className="font-body text-sm bg-[var(--border)] rounded">13 songs</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)]" />
          <span className="font-body text-sm bg-[var(--border)] rounded">88 vocab words</span>
        </div>
        <div className="w-16 h-px bg-[var(--border-focus)] mt-6 opacity-50" />
      </div>

      {/* Album Info Card */}
      <div className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] overflow-hidden mb-12 max-md:mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Cover — explicit max-md:w-full so it fills the card edge-to-edge on mobile */}
          <div className="md:w-64 max-md:w-full max-md:aspect-square md:h-auto relative shrink-0 overflow-hidden bg-[var(--border)] max-md:border-b border-[var(--border)]" />

          {/* Description */}
          <div className="flex-1 p-8 max-md:p-5">
            <p className="font-body text-base max-md:text-sm leading-relaxed select-none text-transparent">
              <span className="bg-[var(--border)] rounded">Late-night introspection with poetic depth</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tracklist Label */}
      <div className="mb-4">
        <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded select-none">
          Tracklist
        </span>
      </div>

      {/* Song Rows */}
      <div className="border-t border-[var(--border)]">
        {Array.from({ length: 13 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-5 max-md:gap-3 py-4 max-md:py-3 border-b border-[var(--border)] px-4 -mx-4"
          >
            {/* Track Number — clean fixed bar, no text content */}
            <div className="w-5 h-4 bg-[var(--border)] rounded shrink-0 opacity-60" />

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              {/* Title bar — varied realistic widths */}
              <div className={`h-5 bg-[var(--border)] rounded ${SONG_WIDTHS[index]} max-w-full`} />
              <div className="h-3 w-16 bg-[var(--border)] rounded opacity-70 mt-1.5" />
            </div>

            {/* Difficulty — hidden on mobile */}
            <div className="h-4 w-20 bg-[var(--border)] rounded shrink-0 hidden sm:block opacity-50" />
          </div>
        ))}
      </div>
    </div>
  );
}
