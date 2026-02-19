'use client';

import { motion } from 'framer-motion';
import { Music, ExternalLink, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { SongWithAlbum } from '@/lib/types';

// Fallback when DB is empty
const fallbackSongs: SongWithAlbum[] = [
  { id: "1", album_id: "", slug: "anti-hero", title: "Anti-Hero", track_number: 3, lyrics: null, vocab_count: 12, difficulty: "Intermediate", spotify_embed_url: null, created_at: "", album_slug: "midnights", album_title: "Midnights" },
  { id: "2", album_id: "", slug: "cardigan", title: "cardigan", track_number: 2, lyrics: null, vocab_count: 15, difficulty: "Advanced", spotify_embed_url: null, created_at: "", album_slug: "folklore", album_title: "Folklore" },
  { id: "3", album_id: "", slug: "willow", title: "willow", track_number: 1, lyrics: null, vocab_count: 18, difficulty: "Advanced", spotify_embed_url: null, created_at: "", album_slug: "evermore", album_title: "Evermore" },
];

export default function TopSongs({ songs }: { songs?: SongWithAlbum[] }) {
  const list = songs && songs.length > 0 ? songs : fallbackSongs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full flex flex-col rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur"
    >
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl grid place-items-center border border-neutral-200 dark:border-neutral-800">
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            </div>
            <div className="space-y-2">
              <h2 className="font-playfair text-2xl font-bold text-neutral-900 dark:text-white">Top Songs</h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Most vocabulary-rich tracks</p>
            </div>
          </div>
          <Link
            href="/explorer"
            className="text-neutral-700 dark:text-neutral-300 hover:text-[var(--accent)] font-medium text-sm flex items-center space-x-1 transition-colors"
          >
            <span>View All</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Songs List */}
      <div className="divide-y divide-gray-200 flex-1">
        {list.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg grid place-items-center border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {song.title}
                    </h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300">
                      {song.album_title}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center space-x-1">
                      <Music className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                      <span>{song.vocab_count} vocab words</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link
                  href={`/explorer/${song.album_slug}/${song.slug}`}
                  className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                  aria-label={`View ${song.title}`}
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40">
        <Link
          href="/explorer"
          className="w-full bg-[var(--accent)] text-white py-3 px-4 rounded-lg font-medium hover:bg-[var(--accent-hover)] hover:shadow transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Music className="w-5 h-5" />
          <span>Explore All Songs</span>
        </Link>
      </div>
    </motion.div>
  );
}
