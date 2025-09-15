'use client';

import { motion } from 'framer-motion';
import { Calendar, Quote, ExternalLink } from 'lucide-react';

// Mock data - will be replaced with real API data
const wordOfTheDay = {
  word: 'Serendipitous',
  definition: 'Occurring or discovered by chance in a happy or beneficial way',
  lyricSnippet: '"It was serendipitous, the way we met"',
  song: 'Invisible String',
  album: 'Folklore',
  context: 'Taylor uses this word to describe the magical, fateful nature of finding love - how seemingly random encounters can lead to something beautiful.',
  difficulty: 'Advanced',
  era: 'folklore'
};

const eraColors = {
  folklore: 'from-gray-100 to-green-100 border-green-200',
  evermore: 'from-amber-100 to-orange-100 border-orange-200',
  midnights: 'from-indigo-100 to-purple-100 border-purple-200',
  lover: 'from-pink-100 to-rose-100 border-pink-200',
  reputation: 'from-gray-200 to-black border-gray-300',
  '1989': 'from-blue-100 to-cyan-100 border-cyan-200',
  red: 'from-red-100 to-pink-100 border-red-200',
  speaknow: 'from-purple-100 to-pink-100 border-purple-200',
  fearless: 'from-yellow-100 to-gold-100 border-yellow-200',
  debut: 'from-green-100 to-teal-100 border-green-200'
};

export default function WordOfTheDay() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur"
    >
      {/* Header */}
      <div className={`p-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40` }>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-neutral-500" />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Word of the Day</span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700">
            {wordOfTheDay.difficulty}
          </span>
        </div>
        <h2 className="font-playfair text-3xl font-bold text-neutral-900 dark:text-white mb-1">
          {wordOfTheDay.word}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          From <span className="font-semibold">{wordOfTheDay.album}</span> • <span className="font-semibold">{wordOfTheDay.song}</span>
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Definition</h3>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {wordOfTheDay.definition}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">In Taylor's Words</h3>
          <div className="rounded-lg p-4 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/30">
            <Quote className="w-4 h-4 text-neutral-400 mb-2" />
            <p className="text-neutral-700 dark:text-neutral-300 italic">
              "{wordOfTheDay.lyricSnippet}"
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Context</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
            {wordOfTheDay.context}
          </p>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 py-2 px-4 rounded-lg font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:shadow transform hover:-translate-y-0.5 transition-all duration-200">
            View Song
          </button>
          <button className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
            <ExternalLink className="w-4 h-4" />
          </button>
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

