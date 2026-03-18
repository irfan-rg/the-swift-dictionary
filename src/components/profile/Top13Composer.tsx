"use client";

import { useMemo, useState, useEffect } from "react";
import type { WordWithDetails } from "@/lib/types";

interface Top13ComposerProps {
  favorites: WordWithDetails[];
}

const MAX_SELECTION = 13;
const MIN_SELECTION = 6;

export default function Top13Composer({ favorites }: Top13ComposerProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const filteredFavorites = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    let result = favorites;
    if (trimmed) {
      result = favorites.filter((item) => {
        return (
          item.word.toLowerCase().includes(trimmed) ||
          item.song_title.toLowerCase().includes(trimmed) ||
          item.album_title.toLowerCase().includes(trimmed)
        );
      });
    }
    return result;
  }, [favorites, query]);

  const totalPages = Math.max(1, Math.ceil(filteredFavorites.length / itemsPerPage));
  const currentChunk = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFavorites.slice(start, start + itemsPerPage);
  }, [filteredFavorites, currentPage]);

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

  const downloadHref = selectedIds.length >= MIN_SELECTION
    ? `/api/top13/image?ids=${encodeURIComponent(selectedIds.join(","))}`
    : "";

  if (favorites.length === 0) {
    return (
      <div className="w-full p-8 border border-[var(--border)] border-dashed border-t-0 border-b-0 space-y-4">
        <h3 className="font-display text-2xl font-medium tracking-tight text-[var(--foreground)]">
          Download Your Top 13
        </h3>
        <p className="font-body text-sm text-[var(--foreground-muted)]">
          You need saved words first. Add favorites from the dictionary, then come back to build your Top 13 card.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10">
      <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex-1">
          <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
            Curate
          </span>
          <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--foreground)] mb-3">
            Download Your Top 13
          </h3>
          <p className="font-body text-sm md:text-base text-[var(--foreground-muted)] max-w-xl leading-relaxed">
            Pick up to {MAX_SELECTION} favorite words to generate your shareable card.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="block font-display italic text-2xl text-[var(--accent)] leading-none mb-1">
              {selectedIds.length}
            </span>
            <span className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)]">
              of {MAX_SELECTION} Selected
            </span>
          </div>
        </div>
      </div>

      <div className="w-full p-6 md:p-8 border border-[var(--border)] bg-[var(--surface)] relative group">
        <div className="absolute top-0 left-0 w-full h-px bg-[var(--border)] opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your favorites..."
            className="w-full md:flex-1 bg-transparent border-b border-[var(--border)] px-1 py-2 font-body text-lg text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <div className="flex gap-3 shrink-0 items-end">
            <button
              type="button"
              onClick={selectRecent13}
              className="px-4 py-2 border border-[var(--border)] font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-focus)] transition-colors"
            >
              Use Recent 13
            </button>
            <button
              type="button"
              onClick={clearSelection}
              className="px-4 py-2 border border-transparent font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] flex justify-between items-center border-b border-[var(--border-focus)] border-dashed pb-3 opacity-60">
            <span>Saved Words ({filteredFavorites.length})</span>
            <div className="flex gap-4 items-center">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 font-display italic text-lg hover:text-[var(--foreground)] text-[var(--foreground-muted)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Previous page"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 font-display italic text-lg hover:text-[var(--foreground)] text-[var(--foreground-muted)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Next page"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
          
          {currentChunk.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
              {currentChunk.map((item) => {
                const selected = selectedSet.has(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleWord(item.id)}
                    className={`group relative text-left py-2 transition-all flex items-center justify-between border-b ${
                      selected
                        ? "border-[var(--foreground)] text-[var(--foreground)]"
                        : "border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--border-focus)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className={`font-display text-xl leading-tight truncate transition-colors ${selected ? 'font-medium' : ''}`}>
                        {item.word}
                      </div>
                      <div className={`font-body text-[10px] uppercase tracking-wider mt-1 truncate transition-opacity ${selected ? 'opacity-80' : 'opacity-40 group-hover:opacity-70'}`}>
                        {item.song_title}
                      </div>
                    </div>
                    <div className="shrink-0 w-5 h-5 border border-current rounded-full flex items-center justify-center transition-colors">
                      {selected && <div className="w-2.5 h-2.5 bg-current rounded-full" />}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="font-display italic text-xl text-[var(--foreground-muted)] py-6 opacity-60">
              No matching words found for "{query}".
            </p>
          )}
        </div>
      </div>

      {selectedWords.length > 0 && (
        <div className="space-y-4">
          <div className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] flex items-center gap-4">
            <span className="whitespace-nowrap">Your Selection Card</span>
            <div className="h-px bg-[var(--border-focus)] w-full opacity-30" />
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3 py-2">
            {selectedWords.map((item) => (
              <button
                key={`sel-${item.id}`}
                onClick={() => toggleWord(item.id)}
                className="group flex items-center gap-2 px-4 py-2 border border-[var(--border)] bg-transparent hover:border-[var(--border-focus)] hover:bg-[var(--surface-raised)] transition-all"
              >
                <span className="font-display text-lg text-[var(--foreground)] leading-none">{item.word}</span>
                <span className="font-body text-xs text-[var(--foreground-muted)] group-hover:text-red-400 opacity-60 transition-colors">&times;</span>
              </button>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={downloadHref || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={selectedIds.length < MIN_SELECTION}
              className={`inline-block px-8 py-3.5 font-body text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                selectedIds.length >= MIN_SELECTION
                  ? "text-white bg-[var(--accent)] hover:opacity-90 shadow-md transform hover:-translate-y-0.5"
                  : "text-[var(--foreground-muted)] bg-[var(--surface)] border border-[var(--border)] pointer-events-none opacity-50"
              }`}
            >
              Generate Dossier Image
            </a>
            {selectedIds.length > 0 && selectedIds.length < MIN_SELECTION && (
              <span className="font-body text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] mt-2 sm:mt-0">
                Requires {MIN_SELECTION - selectedIds.length} more words
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
