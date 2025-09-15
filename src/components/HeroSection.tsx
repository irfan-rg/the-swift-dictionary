'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Music } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-pink-200 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium text-gray-700">Discover Taylor's Vocabulary</span>
            </div>
            
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                The Swift Dictionary
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock the sophisticated vocabulary hidden in Taylor Swift's lyrics. 
              From <em className="text-pink-600 font-semibold">serendipitous</em> to <em className="text-purple-600 font-semibold">ephemeral</em>, 
              discover the words that make her songs magical.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/dictionary"
              className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explore Dictionary</span>
            </Link>
            
            <Link
              href="/explorer"
              className="group bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 border border-gray-200"
            >
              <Music className="w-5 h-5" />
              <span>Song Explorer</span>
            </Link>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Word Definitions</h3>
              <p className="text-gray-600 text-sm">Comprehensive definitions with lyric context and song references</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Song Explorer</h3>
              <p className="text-gray-600 text-sm">Browse by album and discover vocabulary in your favorite songs</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Daily Discovery</h3>
              <p className="text-gray-600 text-sm">New word every day with lyric snippets and context</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

