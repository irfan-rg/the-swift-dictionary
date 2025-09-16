"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import WordCard from "@/components/dictionary/WordCard";
import DictionaryFilters from "@/components/dictionary/DictionaryFilters";
import WordModal from "@/components/dictionary/WordModal";

type WordItem = {
  id: string;
  word: string;
  definition: string;
  lyricSnippet: string;
  song: string;
  album: string; // era key
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

const MOCK_WORDS: WordItem[] = [
  {
    id: "w1",
    word: "Serendipitous",
    definition:
      "Occurring or discovered by chance in a happy or beneficial way.",
    lyricSnippet: "It was serendipitous, the way we met",
    song: "Invisible String",
    album: "folklore",
    difficulty: "Advanced",
  },
  {
    id: "w2",
    word: "Ephemeral",
    definition: "Lasting for a very short time.",
    lyricSnippet: "Ephemeral moments we tried to hold",
    song: "Seven",
    album: "folklore",
    difficulty: "Intermediate",
  },
  {
    id: "w3",
    word: "Catharsis",
    definition:
      "The process of releasing, and thereby providing relief from, strong or repressed emotions.",
    lyricSnippet: "A catharsis written in the margins",
    song: "The Archer",
    album: "lover",
    difficulty: "Advanced",
  },
  {
    id: "w4",
    word: "Revelry",
    definition: "Lively and noisy festivities.",
    lyricSnippet: "Summer revelry under city lights",
    song: "Cruel Summer",
    album: "lover",
    difficulty: "Beginner",
  },
];

export default function DictionaryPage() {
  const [query, setQuery] = useState("");
  const [album, setAlbum] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [selected, setSelected] = useState<WordItem | null>(null);
  const [sort, setSort] = useState<string>("relevance");

  const filtered = useMemo(() => {
    const base = MOCK_WORDS.filter((w) => {
      const matchesQuery = query
        ? `${w.word} ${w.definition} ${w.song} ${w.album}`
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;
      const matchesAlbum = album === "all" ? true : w.album === album;
      const matchesDiff = difficulty === "all" ? true : w.difficulty === (difficulty as any);
      return matchesQuery && matchesAlbum && matchesDiff;
    });
    const sorted = [...base];
    if (sort === "az") {
      sorted.sort((a, b) => a.word.localeCompare(b.word));
    } else if (sort === "za") {
      sorted.sort((a, b) => b.word.localeCompare(a.word));
    } else if (sort === "difficulty") {
      const order: Record<string, number> = { Beginner: 0, Intermediate: 1, Advanced: 2 };
      sorted.sort((a, b) => (order[a.difficulty] ?? 0) - (order[b.difficulty] ?? 0));
    }
    return sorted;
  }, [query, album, difficulty, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Row */}
      <div className="mb-4">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">Dictionary</h1>
        <div className="mt-2 h-[2px] w-28 accent-gradient rounded-full opacity-80" />
      </div>

      {/* Search + Filters (single row on desktop) */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-8">
        <div className="relative flex-1">
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 dark:text-neutral-300 z-10" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search words, songs, or albums..."
            className="w-full h-11 pl-10 pr-4 rounded-full bg-white/70 dark:bg-neutral-950/70 backdrop-blur border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 focus:border-transparent text-sm"
          />
        </div>
        <DictionaryFilters
          album={album}
          setAlbum={setAlbum}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {/* Results grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((w) => (
          <WordCard key={w.id} item={w} onOpen={setSelected} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-neutral-500 py-16">
            No results found.
          </div>
        )}
      </motion.div>

      {/* Single global modal to ensure only one open at a time */}
      <WordModal open={!!selected} onClose={() => setSelected(null)} item={selected} />
    </div>
  );
}


