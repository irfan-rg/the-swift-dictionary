import React from "react";
import { Search, ArrowRight } from "lucide-react";

export default function DictionaryLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded block mb-2 mx-auto w-max select-none">
          The Full Index
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded mb-4 mx-auto w-max select-none">
          Dictionary
        </h1>
        <p className="font-body text-sm text-transparent text-center max-w-md mx-auto select-none">
          <span className="bg-[var(--border)] rounded">Search and filter vocabulary words</span>{" "}
          <span className="bg-[var(--border)] rounded">discovered across every era.</span>
        </p>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-6 opacity-30" />
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-transparent z-10" />
          <div className="w-full h-11 bg-[var(--surface-raised)] border border-[var(--border)] rounded-sm" />
        </div>
        <div className="flex gap-3">
          <div className="h-11 w-40 rounded-sm border border-[var(--border)] bg-[var(--surface-raised)]" />
          <div className="h-11 w-40 rounded-sm border border-[var(--border)] bg-[var(--surface-raised)]" />
          <div className="h-11 w-40 rounded-sm border border-[var(--border)] bg-[var(--surface-raised)]" />
        </div>
      </div>

      {/* Results count text-xs */}
      <p className="font-body text-xs text-transparent bg-[var(--border)] rounded w-max mb-4 select-none">
        0 words found
      </p>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="group rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded w-max select-none">Vocabulary</h3>
                  <p className="font-body text-xs font-medium text-transparent bg-[var(--border)] rounded w-max mt-1 select-none">
                    Song Title Here
                  </p>
                </div>
                <div className="inline-flex flex-wrap items-center gap-2">
                  <span className="font-body text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-sm border text-transparent bg-[var(--border)] select-none">
                    Album Name
                  </span>
                  <span className="font-handwriting text-sm text-transparent bg-[var(--border)] rounded select-none">
                    Difficulty
                  </span>
                </div>
              </div>
              <div className="p-2 opacity-30 text-[var(--border)]">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h4 className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded w-max mb-1 select-none">Meaning</h4>
              <p className="font-body text-sm leading-relaxed line-clamp-2 select-none text-transparent">
                <span className="bg-[var(--border)] rounded">This is a definition that will wrap</span>{" "}
                <span className="bg-[var(--border)] rounded">naturally to two lines and not blow</span>{" "}
                <span className="bg-[var(--border)] rounded">out the horizontal width constraints.</span>
              </p>
            </div>

            <div>
              <h4 className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded w-max mb-1 select-none">Lyric</h4>
              <blockquote className="font-body text-sm italic border-l-2 border-[var(--border)] pl-3 select-none py-0.5 text-transparent">
                <span className="bg-[var(--border)] rounded">This is a lyric quote that wraps</span>{" "}
                <span className="bg-[var(--border)] rounded">naturally properly.</span>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
