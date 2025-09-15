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
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${eraColors[wordOfTheDay.era as keyof typeof eraColors]} p-6 border-b border-gray-200`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Word of the Day</span>
          </div>
          <span className="px-3 py-1 bg-white/80 rounded-full text-xs font-semibold text-gray-700">
            {wordOfTheDay.difficulty}
          </span>
        </div>
        
        <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
          {wordOfTheDay.word}
        </h2>
        
        <p className="text-gray-700 text-sm">
          From <span className="font-semibold">{wordOfTheDay.album}</span> • <span className="font-semibold">{wordOfTheDay.song}</span>
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Definition</h3>
          <p className="text-gray-700 leading-relaxed">
            {wordOfTheDay.definition}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">In Taylor's Words</h3>
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-pink-400">
            <Quote className="w-5 h-5 text-gray-400 mb-2" />
            <p className="text-gray-700 italic">
              "{wordOfTheDay.lyricSnippet}"
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Context</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {wordOfTheDay.context}
          </p>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            View Song
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          New word every day at midnight EST
        </p>
      </div>
    </motion.div>
  );
}

