'use client';

import { motion } from 'framer-motion';
import { Music, Play, ExternalLink, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Mock data - will be replaced with real API data
const topSongs = [
  {
    id: 1,
    title: 'Anti-Hero',
    album: 'Midnights',
    vocabCount: 12,
    difficulty: 'Intermediate',
    era: 'midnights',
    preview: 'https://p.scdn.co/mp3-preview/sample1.mp3'
  },
  {
    id: 2,
    title: 'Cardigan',
    album: 'Folklore',
    vocabCount: 15,
    difficulty: 'Advanced',
    era: 'folklore',
    preview: 'https://p.scdn.co/mp3-preview/sample2.mp3'
  },
  {
    id: 3,
    title: 'Willow',
    album: 'Evermore',
    vocabCount: 18,
    difficulty: 'Advanced',
    era: 'evermore',
    preview: 'https://p.scdn.co/mp3-preview/sample3.mp3'
  },
  {
    id: 4,
    title: 'Lover',
    album: 'Lover',
    vocabCount: 8,
    difficulty: 'Beginner',
    era: 'lover',
    preview: 'https://p.scdn.co/mp3-preview/sample4.mp3'
  },
  {
    id: 5,
    title: 'Look What You Made Me Do',
    album: 'Reputation',
    vocabCount: 10,
    difficulty: 'Intermediate',
    era: 'reputation',
    preview: 'https://p.scdn.co/mp3-preview/sample5.mp3'
  }
];

const eraColors = {
  folklore: 'bg-gray-100 text-gray-800',
  evermore: 'bg-amber-100 text-amber-800',
  midnights: 'bg-indigo-100 text-indigo-800',
  lover: 'bg-pink-100 text-pink-800',
  reputation: 'bg-gray-200 text-gray-800',
  '1989': 'bg-blue-100 text-blue-800',
  red: 'bg-red-100 text-red-800',
  speaknow: 'bg-purple-100 text-purple-800',
  fearless: 'bg-yellow-100 text-yellow-800',
  debut: 'bg-green-100 text-green-800'
};

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800'
};

export default function TopSongs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur"
    >
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl grid place-items-center border border-neutral-200 dark:border-neutral-800">
              <TrendingUp className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-bold text-neutral-900 dark:text-white">Top Songs</h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Most vocabulary-rich tracks</p>
            </div>
          </div>
          <Link
            href="/explorer"
            className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium text-sm flex items-center space-x-1"
          >
            <span>View All</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Songs List */}
      <div className="divide-y divide-gray-200">
        {topSongs.map((song, index) => (
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300`}>
                      {song.album}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center space-x-1">
                      <Music className="w-4 h-4" />
                      <span>{song.vocabCount} vocab words</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300`}>
                      {song.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
                  <Play className="w-5 h-5" />
                </button>
                <Link
                  href={`/explorer/song/${song.id}`}
                  className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
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
          className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-3 px-4 rounded-lg font-medium hover:shadow transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Music className="w-5 h-5" />
          <span>Explore All Songs</span>
        </Link>
      </div>
    </motion.div>
  );
}

