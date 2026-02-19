"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import WordCard from "@/components/dictionary/WordCard";
import DictionaryFilters from "@/components/dictionary/DictionaryFilters";
import WordModal from "@/components/dictionary/WordModal";
import type { WordCardItem, WordWithDetails } from "@/lib/types";

function toCardItem(w: WordWithDetails): WordCardItem {
  return {
    id: w.id,
    word: w.word,
    definition: w.definition,
    lyricSnippet: w.lyric_snippet,
    song: w.song_title,
    album: w.album_slug,
    difficulty: w.difficulty,
    context: w.context ?? undefined,
  };
}

interface Props {
  words: WordWithDetails[];
  total: number;
  query: string;
  album: string;
  difficulty: string;
  sort: string;
  page: number;
  limit: number;
}

export default function DictionaryClient({
  words,
  total,
  query: initialQuery,
  album,
  difficulty,
  sort,
  page,
  limit,
}: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<WordCardItem | null>(null);
  const [searchInput, setSearchInput] = useState(initialQuery);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Push new search params to URL — triggers server re-fetch
  const updateParams = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams();
      const merged = {
        q: initialQuery,
        album,
        difficulty,
        sort,
        page: String(page),
        ...overrides,
      };
      // Reset to page 1 when filters change (unless page itself is changing)
      if (!("page" in overrides)) merged.page = "1";

      for (const [k, v] of Object.entries(merged)) {
        if (v && v !== "all" && v !== "1" && !(k === "sort" && v === "az") && !(k === "q" && v === "")) {
          params.set(k, v);
        }
      }
      router.push(`/dictionary?${params.toString()}`);
    },
    [router, initialQuery, album, difficulty, sort, page]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput });
  };

  const items = words.map(toCardItem);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Row */}
      <div className="mb-4">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Dictionary
        </h1>
        <div className="mt-2 h-[2px] w-28 accent-gradient rounded-full opacity-80" />
      </div>

      {/* Search + Filters */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 dark:text-neutral-300 z-10"
          />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search words, songs, or albums..."
            className="w-full h-11 pl-10 pr-4 rounded-full bg-white/70 dark:bg-neutral-950/70 backdrop-blur border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 focus:border-transparent text-sm"
          />
        </div>
        <DictionaryFilters
          album={album}
          setAlbum={(v) => updateParams({ album: v })}
          difficulty={difficulty}
          setDifficulty={(v) => updateParams({ difficulty: v })}
          sort={sort}
          setSort={(v) => updateParams({ sort: v })}
        />
      </form>

      {/* Results count */}
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        {total} {total === 1 ? "word" : "words"} found
      </p>

      {/* Results grid */}
      <motion.div
        key={`${initialQuery}-${album}-${difficulty}-${sort}-${page}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((w) => (
          <WordCard key={w.id} item={w} onOpen={setSelected} />
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center text-neutral-500 py-16">
            No results found.
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            disabled={page <= 1}
            onClick={() => updateParams({ page: String(page - 1) })}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => updateParams({ page: String(page + 1) })}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Word Modal */}
      <WordModal open={!!selected} onClose={() => setSelected(null)} item={selected} />
    </div>
  );
}
