"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Music, Play, ExternalLink } from "lucide-react";

// Mock song data - will be replaced with real API data
const albumData: Record<string, {
  title: string;
  year: string;
  description: string;
  coverImage: string;
  accent: string;
  songs: Array<{
    id: string;
    title: string;
    vocabCount: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    preview?: string;
  }>;
}> = {
  folklore: {
    title: "Folklore",
    year: "2020",
    description: "Indie folk with literary sophistication and storytelling depth",
    coverImage: "/covers/folklore.jpg",
    accent: "border-neutral-500/50 dark:border-neutral-400/50 hover:ring-neutral-500/50",
    songs: [
      { id: "the-1", title: "the 1", vocabCount: 8, difficulty: "Beginner" },
      { id: "cardigan", title: "cardigan", vocabCount: 15, difficulty: "Advanced" },
      { id: "the-last-great-american-dynasty", title: "the last great american dynasty", vocabCount: 12, difficulty: "Intermediate" },
      { id: "exile", title: "exile", vocabCount: 9, difficulty: "Intermediate" },
      { id: "my-tears-ricochet", title: "my tears ricochet", vocabCount: 11, difficulty: "Advanced" },
      { id: "mirrorball", title: "mirrorball", vocabCount: 7, difficulty: "Beginner" },
      { id: "seven", title: "seven", vocabCount: 13, difficulty: "Advanced" },
      { id: "august", title: "august", vocabCount: 10, difficulty: "Intermediate" },
      { id: "this-is-me-trying", title: "this is me trying", vocabCount: 14, difficulty: "Advanced" },
      { id: "illicit-affairs", title: "illicit affairs", vocabCount: 6, difficulty: "Beginner" },
      { id: "invisible-string", title: "invisible string", vocabCount: 16, difficulty: "Advanced" },
      { id: "mad-woman", title: "mad woman", vocabCount: 8, difficulty: "Intermediate" },
      { id: "epiphany", title: "epiphany", vocabCount: 12, difficulty: "Advanced" },
      { id: "betty", title: "betty", vocabCount: 9, difficulty: "Intermediate" },
      { id: "peace", title: "peace", vocabCount: 11, difficulty: "Advanced" },
      { id: "hoax", title: "hoax", vocabCount: 7, difficulty: "Beginner" }
    ]
  },
  evermore: {
    title: "Evermore",
    year: "2020",
    description: "Sister album with rich storytelling and sophisticated vocabulary",
    coverImage: "/covers/evermore.jpg",
    accent: "border-amber-500/50 dark:border-amber-400/50 hover:ring-amber-500/50",
    songs: [
      { id: "willow", title: "willow", vocabCount: 12, difficulty: "Intermediate" },
      { id: "champagne-problems", title: "champagne problems", vocabCount: 18, difficulty: "Advanced" },
      { id: "gold-rush", title: "gold rush", vocabCount: 14, difficulty: "Advanced" },
      { id: "tis-the-damn-season", title: "'tis the damn season", vocabCount: 10, difficulty: "Intermediate" },
      { id: "tolerate-it", title: "tolerate it", vocabCount: 16, difficulty: "Advanced" },
      { id: "no-body-no-crime", title: "no body, no crime", vocabCount: 8, difficulty: "Beginner" },
      { id: "happiness", title: "happiness", vocabCount: 15, difficulty: "Advanced" },
      { id: "dorothea", title: "dorothea", vocabCount: 11, difficulty: "Intermediate" },
      { id: "coney-island", title: "coney island", vocabCount: 13, difficulty: "Advanced" },
      { id: "ivy", title: "ivy", vocabCount: 17, difficulty: "Advanced" },
      { id: "cowboy-like-me", title: "cowboy like me", vocabCount: 12, difficulty: "Intermediate" },
      { id: "long-story-short", title: "long story short", vocabCount: 9, difficulty: "Intermediate" },
      { id: "marjorie", title: "marjorie", vocabCount: 14, difficulty: "Advanced" },
      { id: "closure", title: "closure", vocabCount: 7, difficulty: "Beginner" },
      { id: "evermore", title: "evermore", vocabCount: 19, difficulty: "Advanced" }
    ]
  },
  midnights: {
    title: "Midnights",
    year: "2022",
    description: "Late-night introspection with poetic depth and clever wordplay",
    coverImage: "/covers/midnights.jpg",
    accent: "border-indigo-500/50 dark:border-indigo-400/50 hover:ring-indigo-500/50",
    songs: [
      { id: "lavender-haze", title: "Lavender Haze", vocabCount: 11, difficulty: "Intermediate" },
      { id: "maroon", title: "Maroon", vocabCount: 13, difficulty: "Advanced" },
      { id: "anti-hero", title: "Anti-Hero", vocabCount: 12, difficulty: "Intermediate" },
      { id: "snow-on-the-beach", title: "Snow On The Beach", vocabCount: 15, difficulty: "Advanced" },
      { id: "youre-on-your-own-kid", title: "You're On Your Own, Kid", vocabCount: 14, difficulty: "Advanced" },
      { id: "midnight-rain", title: "Midnight Rain", vocabCount: 10, difficulty: "Intermediate" },
      { id: "question", title: "Question...?", vocabCount: 8, difficulty: "Beginner" },
      { id: "vigilante-shit", title: "Vigilante Shit", vocabCount: 9, difficulty: "Intermediate" },
      { id: "bejeweled", title: "Bejeweled", vocabCount: 11, difficulty: "Intermediate" },
      { id: "labyrinth", title: "Labyrinth", vocabCount: 16, difficulty: "Advanced" },
      { id: "karma", title: "Karma", vocabCount: 7, difficulty: "Beginner" },
      { id: "sweet-nothing", title: "Sweet Nothing", vocabCount: 6, difficulty: "Beginner" },
      { id: "mastermind", title: "Mastermind", vocabCount: 13, difficulty: "Advanced" }
    ]
  }
};

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
};

type AlbumPageProps = {
  params: {
    album: string;
  };
};

export default function AlbumPage({ params }: AlbumPageProps) {
  const album = albumData[params.album];

  if (!album) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Album Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            The album you're looking for doesn't exist.
          </p>
          <Link
            href="/explorer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Albums</span>
          </Link>
        </div>
      </div>
    );
  }

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
              {album.year} • {album.songs.length} songs
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
              src={album.coverImage}
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
                      {album.songs.length} songs
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {album.songs.reduce((sum, song) => sum + song.vocabCount, 0)} vocab words
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
        {album.songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className="group"
          >
            <Link
              href={`/explorer/${params.album}/${song.id}`}
              className={`block rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur p-6 hover:shadow-lg transition-all duration-300 ${album.accent} hover:ring-2 hover:ring-inset`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {song.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Music className="w-4 h-4" />
                    <span>{song.vocabCount} vocab words</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[song.difficulty]}`}>
                    {song.difficulty}
                  </span>
                </div>
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
