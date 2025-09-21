'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Music } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden -mt-14">
      {/* Media slot (image/video) can be mounted behind content). Fallback: animated gradient vignette */}
      <div className="absolute inset-0 -z-10" id="hero-media-slot">
        <img
          className="hero-video"
          src="https://i.pinimg.com/736x/74/92/45/7492453e97a344e00507b18f77b02b74.jpg"
          alt="Background image"
        />
        <div className="hero-vignette" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-[85vh] md:min-h-screen flex items-center">
        <div className="text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 rounded-full px-6 py-2 mb-4 -translate-y-2 md:-translate-y-8 border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur">
              <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 tracking-wide uppercase">Discover Taylor's Vocabulary</span>
            </div>
            
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-neutral-600 dark:text-neutral-300 tracking-wider">
              The Swift Dictionary
            </h1>
            <div className="mx-auto h-[2px] w-40 accent-gradient rounded-full mb-8 opacity-80" />
            
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock the sophisticated vocabulary hidden in Taylor Swift's lyrics. 
              From <em className="em-accent">serendipitous</em> to <em className="em-secondary">ephemeral</em>, 
              discover the words that make her songs magical.
            </p>
          </motion.div>

          {/* Subtle CTA link */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-0 right-0 bottom-24 md:bottom-32 flex justify-center"
          >
            <Link
              href="/dictionary"
              className="inline-flex items-center gap-1 font-semibold link-accent transition-colors"
            >
              Browse Dictionary
              <span aria-hidden>→</span>
            </Link>
          </motion.div>

          {/* Album/Era chip strip at hero bottom */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="pointer-events-auto"
          >
            <div className="absolute left-0 right-0 bottom-6 md:bottom-10">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="w-full overflow-x-auto md:overflow-visible scrollbar-none">
                  <div className="flex md:justify-center items-center gap-2 md:gap-3 min-w-max md:min-w-0">
                    {(() => {
                      const albums = [
                        { key: 'debut', label: 'Debut', color: '#16a34a' },
                        { key: 'fearless', label: 'Fearless', color: '#f59e0b' },
                        { key: 'speaknow', label: 'Speak Now', color: '#a855f7' },
                        { key: 'red', label: 'Red', color: '#ef4444' },
                        { key: '1989', label: '1989', color: '#3b82f6' },
                        { key: 'reputation', label: 'Reputation', color: '#6b7280' },
                        { key: 'lover', label: 'Lover', color: '#ec4899' },
                        { key: 'folklore', label: 'Folklore', color: '#737373' },
                        { key: 'evermore', label: 'Evermore', color: '#d97706' },
                        { key: 'midnights', label: 'Midnights', color: '#6366f1' },
                      ];
                      return albums.map((album) => (
                        <Link
                          key={album.key}
                          href={`/explorer/${album.key}`}
                          className="group relative px-3.5 md:px-4 py-2 rounded-full border border-neutral-300/80 dark:border-neutral-700/70 bg-white/60 dark:bg-neutral-900/50 backdrop-blur text-sm md:text-[15px] text-neutral-800 dark:text-neutral-200 hover:-translate-y-0.5 transition-transform duration-200 shadow-sm"
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          <span className="relative z-10 inline-flex items-center">
                            <span>{album.label}</span>
                          </span>
                          <span
                            className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ boxShadow: `inset 0 0 0 1px ${album.color}` }}
                          />
                        </Link>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

