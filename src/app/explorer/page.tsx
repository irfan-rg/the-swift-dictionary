"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Music, Calendar, Play } from "lucide-react";

// Color mapping for each album - using explicit Tailwind classes
const albumColors: Record<string, string> = {
  debut: "group-hover:text-green-500 dark:group-hover:text-green-400",
  fearless: "group-hover:text-yellow-500 dark:group-hover:text-yellow-400", 
  speaknow: "group-hover:text-purple-500 dark:group-hover:text-purple-400",
  red: "group-hover:text-red-500 dark:group-hover:text-red-400",
  "1989": "group-hover:text-blue-500 dark:group-hover:text-blue-400",
  reputation: "group-hover:text-gray-500 dark:group-hover:text-gray-400",
  lover: "group-hover:text-pink-500 dark:group-hover:text-pink-400",
  folklore: "group-hover:text-neutral-500 dark:group-hover:text-neutral-400",
  evermore: "group-hover:text-amber-500 dark:group-hover:text-amber-400",
  midnights: "group-hover:text-indigo-500 dark:group-hover:text-indigo-400"
};

// Mock album data - will be replaced with real API data
const albums = [
  {
    key: "midnights",
    title: "Midnights",
    year: "2022",
    songCount: 13,
    vocabCount: 41,
    coverImage: "/covers/midnights.jpg",
    accent: "hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:ring-indigo-500/50",
    description: "Late-night introspection with poetic depth"
  },
  {
    key: "evermore",
    title: "Evermore",
    year: "2020",
    songCount: 15,
    vocabCount: 48,
    coverImage: "/covers/evermore.jpg",
    accent: "hover:border-amber-500/50 dark:hover:border-amber-400/50 hover:ring-amber-500/50",
    description: "Sister album with rich storytelling"
  },
  {
    key: "folklore",
    title: "Folklore",
    year: "2020",
    songCount: 16,
    vocabCount: 52,
    coverImage: "/covers/folklore.jpg",
    accent: "hover:border-neutral-500/50 dark:hover:border-neutral-400/50 hover:ring-neutral-500/50",
    description: "Indie folk with literary sophistication"
  },
  {
    key: "lover",
    title: "Lover",
    year: "2019",
    songCount: 18,
    vocabCount: 47,
    coverImage: "/covers/lover.jpg",
    accent: "hover:border-pink-500/50 dark:hover:border-pink-400/50 hover:ring-pink-500/50",
    description: "Romantic pop with dreamy vocabulary"
  },
  {
    key: "reputation",
    title: "Reputation",
    year: "2017",
    songCount: 15,
    vocabCount: 35,
    coverImage: "/covers/reputation.jpg",
    accent: "hover:border-gray-500/50 dark:hover:border-gray-400/50 hover:ring-gray-500/50",
    description: "Dark pop with sophisticated storytelling"
  },
  {
    key: "1989",
    title: "1989",
    year: "2014",
    songCount: 13,
    vocabCount: 29,
    coverImage: "/covers/1989.jpg",
    accent: "hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:ring-blue-500/50",
    description: "Pop perfection with clever wordplay"
  },
  {
    key: "red",
    title: "Red",
    year: "2012",
    songCount: 16,
    vocabCount: 38,
    coverImage: "/covers/red.jpg",
    accent: "hover:border-red-500/50 dark:hover:border-red-400/50 hover:ring-red-500/50",
    description: "The transition era with emotional depth"
  },
  {
    key: "speaknow",
    title: "Speak Now",
    year: "2010",
    songCount: 14,
    vocabCount: 42,
    coverImage: "/covers/speaknow.jpg",
    accent: "hover:border-purple-500/50 dark:hover:border-purple-400/50 hover:ring-purple-500/50",
    description: "Self-written masterpiece with poetic language"
  },
  {
    key: "fearless",
    title: "Fearless",
    year: "2008",
    songCount: 13,
    vocabCount: 31,
    coverImage: "/covers/fearless.jpg",
    accent: "hover:border-yellow-500/50 dark:hover:border-yellow-400/50 hover:ring-yellow-500/50",
    description: "Country-pop perfection with sophisticated vocabulary"
  },
  {
    key: "debut",
    title: "Taylor Swift",
    year: "2006",
    songCount: 11,
    vocabCount: 23,
    coverImage: "/covers/debut.jpg",
    accent: "hover:border-green-500/50 dark:hover:border-green-400/50 hover:ring-green-500/50",
    description: "The beginning of Taylor's storytelling journey"
  }
];

export default function ExplorerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
          Explorer
        </h1>
        <div className="h-[2px] w-28 accent-gradient rounded-full opacity-80" />
      </div>

      {/* Albums Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {albums.map((album, index) => (
          <motion.div
            key={album.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <Link
              href={`/explorer/${album.key}`}
              className={`block rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur overflow-hidden hover:shadow-lg transition-all duration-300 ${album.accent} hover:ring-2 hover:ring-inset`}
            >
              {/* Album Cover */}
              <div className="relative h-48 w-full">
                <img
                  src={album.coverImage}
                  alt={`${album.title} album cover`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
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
                {/* Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400 font-medium">Songs</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">{album.songCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400 font-medium">Vocab Words</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">{album.vocabCount}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 font-medium">
                  {album.description}
                </p>

                 {/* CTA */}
                 <div className="flex items-center justify-between">
                   <span className={`text-sm font-bold text-neutral-800 dark:text-neutral-200 ${albumColors[album.key]} transition-colors`}>
                     View Album
                   </span>
                   <Play className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 ${albumColors[album.key]} transition-colors`} />
                 </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Stats
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 bg-white/60 dark:bg-neutral-900/40 backdrop-blur rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              {albums.reduce((sum, album) => sum + album.songCount, 0)}
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">Total Songs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              {albums.reduce((sum, album) => sum + album.vocabCount, 0)}
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">Vocabulary Words</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              {albums.length}
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">Albums</div>
          </div>
        </div>
      </motion.div> */}
    </div>
  );
}
