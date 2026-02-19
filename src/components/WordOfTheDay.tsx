'use client';

import { motion } from 'framer-motion';
import { Calendar, Quote, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { WordWithDetails } from '@/lib/types';

// Fallback when no WotD is scheduled yet
const fallback: WordWithDetails = {
  id: "fallback",
  word: "Serendipitous",
  definition: "Occurring or discovered by chance in a happy or beneficial way",
  lyric_snippet: "It was serendipitous, the way we met",
  song_id: "",
  album_id: "",
  context: "Taylor uses this word to describe the magical, fateful nature of finding love.",
  difficulty: "Advanced",
  positions: [],
  created_at: "",
  song_title: "Invisible String",
  song_slug: "invisible-string",
  album_slug: "folklore",
  album_title: "Folklore",
};

export default function WordOfTheDay({ data }: { data?: WordWithDetails | null }) {
  const wotd = data ?? fallback;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full flex flex-col rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur"
    >
      {/* Header */}
      <div className={`p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40` }>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Word of the Day</span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700">
            {wotd.difficulty}
          </span>
        </div>
        <h2 className="font-playfair text-3xl font-bold text-neutral-900 dark:text-white mb-1">
          {wotd.word}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          From <span className="font-semibold em-accent">{wotd.album_title}</span> • <span className="font-semibold em-secondary">{wotd.song_title}</span>
        </p>
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        <div className="mb-6">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Definition</h3>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {wotd.definition}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-6">In Taylor&apos;s Words</h3>
          <div className="rounded-lg p-4 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/30">
            <Quote className="w-4 h-4 mb-2" style={{ color: 'var(--accent)' }} />
            <p className="text-neutral-700 dark:text-neutral-300 italic">
              &ldquo;{wotd.lyric_snippet}&rdquo;
            </p>
          </div>
        </div>

        {wotd.context && (
          <div className="mb-6">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Context</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              {wotd.context}
            </p>
          </div>
        )}

        <div className="flex space-x-3">
          <Link
            href={`/explorer/${wotd.album_slug}/${wotd.song_slug}`}
            className="flex-1 py-2 px-4 rounded-lg font-medium text-white bg-[var(--accent)] border border-[var(--accent)] backdrop-blur hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:shadow transform hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            View Song
          </Link>
          <Link
            href={`/explorer/${wotd.album_slug}`}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:text-[var(--accent)] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors inline-flex items-center"
            aria-label={`View ${wotd.album_title} album`}
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
          New word every day at midnight EST
        </p>
      </div>
    </motion.div>
  );
}
