"use client";

import { useMemo, useState } from "react";
import type { WordWithDetails } from "@/lib/types";

interface Top13ComposerProps {
  favorites: WordWithDetails[];
}

const MAX_SELECTION = 13;

export default function Top13Composer({ favorites }: Top13ComposerProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const filteredFavorites = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return favorites;
    return favorites.filter((item) => {
      return (
        item.word.toLowerCase().includes(trimmed) ||
        item.song_title.toLowerCase().includes(trimmed) ||
        item.album_title.toLowerCase().includes(trimmed)
      );
    });
  }, [favorites, query]);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const selectedWords = useMemo(() => {
    const byId = new Map(favorites.map((f) => [f.id, f]));
    return selectedIds.map((id) => byId.get(id)).filter((item): item is WordWithDetails => Boolean(item));
  }, [favorites, selectedIds]);

  const toggleWord = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((value) => value !== id);
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, id];
    });
  };

  const selectRecent13 = () => {
    const top = favorites.slice(0, MAX_SELECTION).map((item) => item.id);
    setSelectedIds(top);
  };

  const clearSelection = () => setSelectedIds([]);

  const downloadHref = selectedIds.length
    ? `/api/top13/image?ids=${encodeURIComponent(selectedIds.join(","))}`
    : "";

  if (favorites.length === 0) {
    return (
      <div className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-6 md:p-8">
        <p className="font-body text-sm text-[var(--foreground-muted)]">
          You need saved words first. Add favorites from the dictionary, then come back to build your Top 13 card.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-2">
            Curate
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[var(--foreground)]">
            Download Your Top 13
          </h3>
          <p className="font-body text-sm text-[var(--foreground-muted)] mt-2 max-w-2xl">
            Pick up to 13 favorite words and generate a shareable summary card.
          </p>
        </div>
        <div className="font-body text-xs tracking-widest uppercase text-[var(--foreground-muted)]">
          {selectedIds.length} / {MAX_SELECTION} selected
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter words, songs, or eras"
          className="w-full md:flex-1 rounded-sm border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-body text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--border-focus)]"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectRecent13}
            className="px-3 py-2 rounded-sm border border-[var(--border)] font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-focus)] transition-colors"
          >
            Use Recent 13
          </button>
          <button
            type="button"
            onClick={clearSelection}
            className="px-3 py-2 rounded-sm border border-transparent font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto pr-1">
        {filteredFavorites.map((item) => {
          const selected = selectedSet.has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleWord(item.id)}
              className={`rounded-sm border p-3 text-left transition-colors ${
                selected
                  ? "border-[var(--foreground)] bg-[var(--surface)]"
                  : "border-[var(--border)] bg-transparent hover:border-[var(--border-focus)]"
              }`}
            >
              <div className="font-display text-lg font-medium text-[var(--foreground)] leading-tight">
                {item.word}
              </div>
              <div className="font-body text-xs text-[var(--foreground-muted)] mt-1">
                {item.song_title} • {item.album_title}
              </div>
            </button>
          );
        })}
      </div>

      <div className="h-px bg-[var(--border)]" />

      <div className="space-y-3">
        <div className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)]">
          Current Selection
        </div>
        {selectedWords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedWords.map((item) => (
              <span
                key={item.id}
                className="px-2 py-1 rounded-sm border border-[var(--border)] bg-[var(--surface)] font-body text-xs text-[var(--foreground)]"
              >
                {item.word}
              </span>
            ))}
          </div>
        ) : (
          <p className="font-body text-sm text-[var(--foreground-muted)]">
            No words selected yet.
          </p>
        )}
      </div>

      <div className="pt-2">
        <a
          href={downloadHref || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={selectedIds.length === 0}
          className={`inline-block px-5 py-2.5 rounded-sm font-body text-[10px] tracking-widest uppercase transition-colors ${
            selectedIds.length > 0
              ? "text-white bg-[var(--accent)] hover:opacity-90"
              : "text-[var(--foreground-muted)] bg-[var(--surface)] border border-[var(--border)] pointer-events-none"
          }`}
        >
          Generate Image
        </a>
      </div>
    </div>
  );
}
