import React from "react";

export default function ExplorerLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded block mb-2 mx-auto w-max select-none">
          The Eras Collection
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded mb-4 mx-auto w-max select-none">
          Explorer
        </h1>
        <p className="font-body text-sm text-transparent text-center max-w-md mx-auto select-none">
          <span className="bg-[var(--border)] rounded">Browse every era, discover the vocabulary woven</span>{" "}
          <span className="bg-[var(--border)] rounded">through her discography.</span>
        </p>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-6 opacity-30" />
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="block rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] overflow-hidden"
          >
            {/* Album Cover */}
            <div className="relative aspect-square w-full overflow-hidden bg-[var(--border)]" />
            
            {/* Content */}
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold tracking-tight text-transparent mb-2 -mt-2 bg-[var(--border)] rounded w-max select-none inline-block">
                Title Placeholder
              </h3>
              <div className="flex items-center gap-2 font-body text-xs text-transparent mb-3 select-none flex-wrap">
                <span className="bg-[var(--border)] rounded">2024</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-30" />
                <span className="bg-[var(--border)] rounded">16 songs</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-30" />
                <span className="bg-[var(--border)] rounded">124 words</span>
              </div>

              <p className="font-body text-sm leading-relaxed mb-4 line-clamp-2 select-none text-transparent">
                <span className="bg-[var(--border)] rounded">This is a description placeholder</span>{" "}
                <span className="bg-[var(--border)] rounded">that will wrap across exactly</span>{" "}
                <span className="bg-[var(--border)] rounded">the same two lines.</span>
              </p>

              <div className="flex items-center justify-between">
                <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded select-none">
                  View Album →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
