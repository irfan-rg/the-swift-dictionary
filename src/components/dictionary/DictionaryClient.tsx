"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import WordCard from "@/components/dictionary/WordCard";
import DictionaryFilters from "@/components/dictionary/DictionaryFilters";
import WordModal from "@/components/dictionary/WordModal";
import { createClient } from "@/lib/supabase/client";
import type { WordCardItem, WordWithDetails } from "@/lib/types";

function toCardItem(w: WordWithDetails): WordCardItem {
  return {
    id: w.id,
    word: w.word,
    definition: w.definition,
    lyricSnippet: w.lyric_snippet,
    song: w.song_title,
    songSlug: w.song_slug,
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
  const [userId, setUserId] = useState<string | null>(null);
  const [favIds, setFavIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      supabase
        .from("favorites")
        .select("word_id")
        .eq("user_id", user.id)
        .then(({ data }) => {
          if (data) setFavIds(new Set(data.map((r: { word_id: string }) => r.word_id)));
        });
    });
  }, []);

  const handleFavToggle = useCallback((wordId: string, nowFavorited: boolean) => {
    setFavIds((prev) => {
      const next = new Set(prev);
      if (nowFavorited) next.add(wordId);
      else next.delete(wordId);
      return next;
    });
  }, []);

  const totalPages = Math.max(1, Math.ceil(total / limit));

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-2">
          The Full Index
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-[var(--foreground)] mb-4">
          Dictionary
        </h1>
        <p className="font-body text-sm text-[var(--foreground-muted)] max-w-md mx-auto">
          Search and filter vocabulary words discovered across every era.
        </p>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-6 opacity-50" />
      </div>

      {/* Search + Filters */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)] opacity-60 z-10"
          />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search words, songs, or albums..."
            className="w-full h-11 pl-10 pr-4 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--border-focus)] font-body text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] placeholder:opacity-50"
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
      <p className="font-body text-xs text-[var(--foreground-muted)] opacity-70 mb-4">
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
          <WordCard
            key={w.id}
            item={w}
            onOpen={setSelected}
          />
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="font-body text-sm text-[var(--foreground-muted)]">No results found.</p>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            disabled={page <= 1}
            onClick={() => updateParams({ page: String(page - 1) })}
            className="p-2 rounded-sm border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--surface-raised)] hover:border-[var(--border-focus)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-body text-xs text-[var(--foreground-muted)] tracking-wide">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => updateParams({ page: String(page + 1) })}
            className="p-2 rounded-sm border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--surface-raised)] hover:border-[var(--border-focus)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Word Modal */}
      <WordModal
        open={!!selected}
        onClose={() => setSelected(null)}
        item={selected}
        isFavorited={selected ? favIds.has(selected.id) : false}
        userId={userId}
        onFavToggle={handleFavToggle}
      />
    </div>
  );
}
