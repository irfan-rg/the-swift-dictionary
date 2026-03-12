import React from "react";
import { ArrowLeft, Music } from "lucide-react";

export default function AlbumLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded mb-6 select-none">
          <ArrowLeft className="w-3.5 h-3.5 invisible" />
          Back to Explorer
        </div>

        {/* Short realistic title like "Lover" or "Folklore" */}
        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded mb-3 w-max select-none">
          Lover
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-transparent select-none">
          <span className="font-body text-sm bg-[var(--border)] rounded">2019</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-50" />
          <span className="font-body text-sm bg-[var(--border)] rounded">18 songs</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-50" />
          <span className="font-body text-sm bg-[var(--border)] rounded">81 vocab words</span>
        </div>
        <div className="w-16 h-px bg-[var(--border-focus)] mt-6 opacity-50" />
      </div>

      {/* Album Info Card */}
      <div className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] overflow-hidden mb-12">
        <div className="flex flex-col md:flex-row">
          {/* Cover — exact same sizing as AlbumDetail.tsx */}
          <div className="md:w-64 h-48 md:h-auto relative shrink-0 overflow-hidden bg-[var(--border)]" />
          
          <div className="flex-1 p-8">
            {/* Short 1-line description like real data */}
            <p className="font-body text-base leading-relaxed select-none text-transparent">
              <span className="bg-[var(--border)] rounded">Romantic pop with dreamy vocabulary</span>
            </p>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="mb-4">
        <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded select-none">
          Tracklist
        </span>
      </div>

      <div className="border-t border-[var(--border)]">
        {Array.from({ length: 18 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-5 py-4 border-b border-[var(--border)] px-4 -mx-4"
          >
            {/* Track Number */}
            <span className="font-display italic text-xl text-transparent bg-[var(--border)] rounded w-6 text-right shrink-0 select-none">
              {index + 1}
            </span>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-medium text-lg text-transparent bg-[var(--border)] rounded w-max max-w-full select-none inline-block truncate">
                Song Title Placeholder
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Music className="w-3 h-3 text-[var(--foreground-muted)] opacity-30" />
                <span className="font-body text-xs text-transparent bg-[var(--border)] rounded select-none">
                  5 vocab words
                </span>
              </div>
            </div>

            {/* Difficulty */}
            <span className="font-handwriting text-sm text-transparent bg-[var(--border)] rounded shrink-0 hidden sm:block select-none">
              Intermediate
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
