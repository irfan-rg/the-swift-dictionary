'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { SongWithAlbum } from '@/lib/types';

const fallbackSongs: SongWithAlbum[] = [
  { id: "1", album_id: "", slug: "the-smallest-man-who-ever-lived", title: "The Smallest Man Who Ever Lived", track_number: 1, lyrics: null, vocab_count: 12, difficulty: "Beginner", spotify_embed_url: null, created_at: "", album_slug: "ttpd", album_title: "The Tortured Poets Department" },
  { id: "2", album_id: "", slug: "so-long-london", title: "So Long, London", track_number: 2, lyrics: null, vocab_count: 12, difficulty: "Intermediate", spotify_embed_url: null, created_at: "", album_slug: "ttpd", album_title: "The Tortured Poets Department" },
  { id: "3", album_id: "", slug: "dear-john", title: "Dear John", track_number: 3, lyrics: null, vocab_count: 11, difficulty: "Intermediate", spotify_embed_url: null, created_at: "", album_slug: "speaknow", album_title: "Speak Now" },
  { id: "4", album_id: "", slug: "mean", title: "Mean", track_number: 4, lyrics: null, vocab_count: 10, difficulty: "Intermediate", spotify_embed_url: null, created_at: "", album_slug: "speaknow", album_title: "Speak Now" },
  { id: "5", album_id: "", slug: "eldest-daughter", title: "Eldest Daughter", track_number: 5, lyrics: null, vocab_count: 10, difficulty: "Intermediate", spotify_embed_url: null, created_at: "", album_slug: "showgirl", album_title: "The Life of a Showgirl" },
];

export default function TopSongs({ songs }: { songs?: SongWithAlbum[] }) {
  const list = songs && songs.length > 0 ? songs : fallbackSongs;

  return (
    <div className="w-full flex pt-4 relative">

      {/* The Diary Page Form Factor */}
      <div className="w-full bg-[var(--surface-raised)] border border-[var(--border)] rounded-sm py-6 sm:py-8 pr-6 sm:pr-8 pl-12 sm:pl-16 max-md:pl-8 max-md:pr-4 flex flex-col relative overflow-hidden shadow-sm group/journal rotate-[-0.5deg] max-md:rotate-0">

        {/* Spiral Binder Holes */}
        <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-10 max-md:w-6 border-r border-[var(--border)] flex flex-col justify-evenly py-6 opacity-60 z-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 max-md:w-2 max-md:h-2 rounded-full bg-[var(--background)] border border-[var(--border)] mx-auto shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
          ))}
        </div>

        {/* Scrapbook Tape — taped to the scrapbook wall */}
        <div className="scrapbook-tape absolute -top-4 right-12 w-24 rotate-[4deg] opacity-80 z-10 max-md:hidden" />
        <div className="scrapbook-tape absolute -bottom-3 left-10 w-20 rotate-[-6deg] opacity-60 z-10 max-md:hidden" />

        {/* Vintage Notebook Paper Lines Texture */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none opacity-[0.03] max-md:hidden"
          style={{
            top: '84px',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, var(--foreground) 40px)',
            backgroundSize: '100% 40px',
          }}
        />

        {/* Journal Header */}
        <div className="flex items-end justify-between mb-4 relative z-10">
          <div>
            <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-1 opacity-80">
              The Mastermind Collection
            </span>
            <h2 className="font-display text-4xl sm:text-[2.75rem] max-md:text-3xl leading-none font-medium tracking-tight">
              Top Songs
            </h2>
          </div>
          <Link
            href="/explorer"
            className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--accent)] border-b border-transparent hover:border-[var(--accent)] pb-0.5 mb-1 hidden sm:block"
            style={{ transition: 'color 0.2s, border-color 0.2s' }}
          >
            Explore Albums
          </Link>
        </div>

        {/* The List — flex-1 + justify-between ensures it statically stretches to EXACTLY match WOTD height */}
        <div className="flex-1 flex flex-col justify-between relative z-10">
          {list.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="flex-1 flex flex-col justify-center"
            >
              <Link
                href={`/explorer/${song.album_slug}/${song.slug}`}
                className="group flex items-center gap-4 border-b border-[var(--border)] py-2 sm:py-3 relative"
              >
                {/* Index Number */}
                <span className="font-display italic text-2xl max-md:text-lg text-[var(--accent)] w-6 text-right shrink-0 select-none leading-none opacity-80 group-hover:opacity-100 transition-colors">
                  {index + 1}
                </span>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-medium text-xl sm:text-[1.35rem] max-md:text-base text-[var(--foreground)] group-hover:text-[var(--accent)] leading-tight transition-colors">
                    {song.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-body text-[9px] tracking-widest uppercase text-[var(--foreground-muted)] opacity-80 group-hover:text-[var(--accent)] transition-colors">
                      {song.album_title}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-30" />
                    <span className="font-body text-[10px] text-[var(--foreground-muted)] opacity-70">
                      {song.vocab_count} words
                    </span>
                  </div>
                </div>

                {/* Difficulty Annotation */}
                <span className="font-handwriting text-[15px] sm:text-[17px] text-[var(--foreground-muted)] opacity-50 shrink-0 hidden sm:block group-hover:opacity-80 transition-opacity">
                  {song.difficulty}
                </span>

                {/* Arrow */}
                <div className="shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 text-[var(--accent)] transition-all duration-200 max-md:hidden">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile explore link */}
        <div className="mt-4 text-center sm:hidden relative z-10">
          <Link
            href="/explorer"
            className="font-body text-xs tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--accent)] border-b border-transparent hover:border-[var(--accent)] pb-0.5"
          >
            Explore Index
          </Link>
        </div>

      </div>
    </div>
  );
}
