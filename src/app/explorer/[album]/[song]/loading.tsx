import React from "react";
import { ArrowLeft } from "lucide-react";

export default function SongLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 max-md:py-10 animate-pulse">
      {/* Header */}
      <div className="mb-12 max-md:mb-6">
        {/* Back link — hidden on mobile, matches SongDetailView.tsx */}
        {/* Back link — inline element matching real <Link>, hidden on mobile */}
        <span className="max-md:hidden inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded mb-6 select-none">
          <ArrowLeft className="w-3.5 h-3.5 invisible" />
          Back to Album Title
        </span>

        {/* h1 — max-md:text-4xl max-md:leading-tight matches real */}
        <h1 className="font-display text-5xl md:text-6xl max-md:text-4xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded mb-3 max-md:mb-2 w-max max-w-full select-none max-md:leading-tight">
          Song Title
        </h1>
        <div className="flex flex-wrap items-center gap-3 max-md:gap-2 text-transparent select-none">
          <span className="font-body text-sm bg-[var(--border)] rounded">Album Title</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-30" />
          <span className="font-body text-sm bg-[var(--border)] rounded">Track 1</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-30" />
          <span className="font-body text-sm bg-[var(--border)] rounded">12 vocabulary words</span>
        </div>
        <div className="w-16 h-px bg-[var(--border-focus)] mt-6 opacity-30" />
      </div>



      {/* Mobile Tab Switcher — md:hidden, mirrors real SongDetailView pill tabs */}
      <div className="md:hidden flex p-1 bg-[var(--surface-raised)] rounded-full border border-[var(--border)] mb-6 shadow-[var(--shadow-polaroid)]">
        {/* "Lyrics" tab — active state */}
        <div className="flex-1 py-2.5 text-[10px] font-body tracking-widest uppercase rounded-full bg-[var(--border)] text-transparent select-none text-center">
          Lyrics
        </div>
        {/* "Vocabulary" tab — inactive */}
        <div className="flex-1 py-2.5 text-[10px] font-body tracking-widest uppercase rounded-full text-transparent select-none text-center">
          Vocabulary
        </div>
      </div>

      {/* Lyrics and Vocabulary — stacked on mobile, side-by-side on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lyrics Section — max-md:p-5 matches real */}
        <div className="bg-[var(--surface-raised)] rounded-sm border border-[var(--border)] p-8 max-md:p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded block mb-1 w-max select-none">
                Full Text
              </span>
              <h2 className="font-display text-2xl max-md:text-xl font-medium text-transparent bg-[var(--border)] rounded w-max select-none">
                Lyrics
              </h2>
            </div>
            {/* "Tap to define" badge — md:hidden, mirrors real */}
            <div className="md:hidden flex items-center gap-1.5 px-2 py-1 rounded-full bg-[var(--border)] opacity-30 text-transparent text-[8px] select-none">
              <span className="w-1 h-1 rounded-full bg-[var(--border-focus)]" />
              Tap to define
            </div>
          </div>

          <div className="font-body text-sm leading-[2] select-none text-transparent">
            {Array.from({ length: 15 }).map((_, i) => {
              const widths = ["w-1/2", "w-2/3", "w-3/4", "w-4/5", "w-11/12"];
              const randomWidth = widths[i % widths.length];
              return (
                <div key={i}>
                  <span className={`bg-[var(--border)] mb-2 rounded inline-block ${randomWidth}`}>
                    Lyric line placeholder
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vocabulary Section */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded block mb-1 w-max select-none">
              Discovered Words
            </span>
            <h3 className="font-display text-2xl max-md:text-xl font-medium text-transparent bg-[var(--border)] rounded w-max select-none">
              Vocabulary
            </h3>
          </div>

          <div className="border-t border-[var(--border)]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border-b border-[var(--border)] py-4 px-4 -mx-4"
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-display text-lg max-md:text-base font-medium text-transparent bg-[var(--border)] rounded w-max select-none">
                    vocabularyword
                  </h4>
                  <span className="font-handwriting text-sm text-transparent bg-[var(--border)] rounded shrink-0 select-none">
                    Intermediate
                  </span>
                </div>
                <p className="font-body text-sm leading-relaxed select-none text-transparent">
                  <span className="bg-[var(--border)] rounded">This is a definition that will likely span</span>{" "}
                  <span className="bg-[var(--border)] rounded">multiple lines naturally on a resize.</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
