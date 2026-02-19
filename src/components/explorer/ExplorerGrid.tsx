"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Play } from "lucide-react";
import type { Album } from "@/lib/types";

// Tailwind accent classes per era (must be static for JIT)
const accentRing: Record<string, string> = {
  debut: "hover:border-green-500/50 hover:ring-green-500/50",
  fearless: "hover:border-yellow-500/50 hover:ring-yellow-500/50",
  speaknow: "hover:border-purple-500/50 hover:ring-purple-500/50",
  red: "hover:border-red-500/50 hover:ring-red-500/50",
  "1989": "hover:border-blue-500/50 hover:ring-blue-500/50",
  reputation: "hover:border-gray-500/50 hover:ring-gray-500/50",
  lover: "hover:border-pink-500/50 hover:ring-pink-500/50",
  folklore: "hover:border-neutral-500/50 hover:ring-neutral-500/50",
  evermore: "hover:border-amber-500/50 hover:ring-amber-500/50",
  midnights: "hover:border-indigo-500/50 hover:ring-indigo-500/50",
  ttpd: "hover:border-stone-500/50 hover:ring-stone-500/50",
  showgirl: "hover:border-orange-500/50 hover:ring-orange-500/50",
};

const accentText: Record<string, string> = {
  debut: "group-hover:text-green-500 dark:group-hover:text-green-400",
  fearless: "group-hover:text-yellow-500 dark:group-hover:text-yellow-400",
  speaknow: "group-hover:text-purple-500 dark:group-hover:text-purple-400",
  red: "group-hover:text-red-500 dark:group-hover:text-red-400",
  "1989": "group-hover:text-blue-500 dark:group-hover:text-blue-400",
  reputation: "group-hover:text-gray-500 dark:group-hover:text-gray-400",
  lover: "group-hover:text-pink-500 dark:group-hover:text-pink-400",
  folklore: "group-hover:text-neutral-500 dark:group-hover:text-neutral-400",
  evermore: "group-hover:text-amber-500 dark:group-hover:text-amber-400",
  midnights: "group-hover:text-indigo-500 dark:group-hover:text-indigo-400",
  ttpd: "group-hover:text-stone-500 dark:group-hover:text-stone-400",
  showgirl: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
};

export default function ExplorerGrid({ albums }: { albums: Album[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {albums.map((album, index) => (
        <motion.div
          key={album.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          className="group"
        >
          <Link
            href={`/explorer/${album.slug}`}
            className={`block rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur overflow-hidden hover:shadow-lg transition-all duration-300 ${accentRing[album.slug] ?? ""} hover:ring-2 hover:ring-inset`}
          >
            {/* Album Cover */}
            <div className="relative h-48 w-full">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-playfair text-xl font-bold text-white mb-1">
                  {album.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span>{album.year}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">Songs</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{album.song_count}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">Vocab Words</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{album.vocab_count}</span>
                </div>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 font-medium">
                {album.description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold text-neutral-800 dark:text-neutral-200 ${accentText[album.slug] ?? ""} transition-colors`}>
                  View Album
                </span>
                <Play className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 ${accentText[album.slug] ?? ""} transition-colors`} />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
