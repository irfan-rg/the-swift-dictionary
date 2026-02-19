"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Music, ExternalLink } from "lucide-react";
import type { Album, Song } from "@/lib/types";

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200",
};

const accentBorder: Record<string, string> = {
  debut: "border-green-500/50 hover:ring-green-500/50",
  fearless: "border-yellow-500/50 hover:ring-yellow-500/50",
  speaknow: "border-purple-500/50 hover:ring-purple-500/50",
  red: "border-red-500/50 hover:ring-red-500/50",
  "1989": "border-blue-500/50 hover:ring-blue-500/50",
  reputation: "border-gray-500/50 hover:ring-gray-500/50",
  lover: "border-pink-500/50 hover:ring-pink-500/50",
  folklore: "border-neutral-500/50 hover:ring-neutral-500/50",
  evermore: "border-amber-500/50 hover:ring-amber-500/50",
  midnights: "border-indigo-500/50 hover:ring-indigo-500/50",
  ttpd: "border-stone-500/50 hover:ring-stone-500/50",
  showgirl: "border-orange-500/50 hover:ring-orange-500/50",
};

export default function AlbumDetail({
  album,
  songs,
}: {
  album: Album;
  songs: Song[];
}) {
  const totalVocab = songs.reduce((sum, s) => sum + s.vocab_count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/explorer"
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </Link>
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              {album.title}
            </h1>
            <div className="h-[2px] w-28 accent-gradient rounded-full opacity-80 my-2" />
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              {album.year} &bull; {songs.length} songs
            </p>
          </div>
        </div>
      </div>

      {/* Album Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur overflow-hidden mb-8"
      >
        <div className="flex flex-col md:flex-row">
          {/* Album Cover */}
          <div className="md:w-64 h-48 md:h-auto">
            <img
              src={album.cover_url ?? ""}
              alt={`${album.title} album cover`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="400" fill="#f3f4f6"/>
                    <text x="200" y="200" text-anchor="middle" dy=".3em" font-family="Arial" font-size="24" fill="#6b7280">${album.title}</text>
                  </svg>
                `)}`;
              }}
            />
          </div>

          {/* Album Info */}
          <div className="flex-1 p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-4">
                  {album.description}
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Music className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {songs.length} songs
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {totalVocab} vocab words
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Songs Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className="group"
          >
            <Link
              href={`/explorer/${album.slug}/${song.slug}`}
              className={`block rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur p-6 hover:shadow-lg transition-all duration-300 ${accentBorder[album.slug] ?? ""} hover:ring-2 hover:ring-inset`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {song.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Music className="w-4 h-4" />
                    <span>{song.vocab_count} vocab words</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[song.difficulty]}`}
                >
                  {song.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-[var(--accent)] transition-colors">
                  View Words
                </span>
                <ExternalLink className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-[var(--accent)] transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
