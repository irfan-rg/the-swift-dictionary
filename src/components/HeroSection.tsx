'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ERAS } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative w-full pt-16 pb-10 md:pt-28 md:pb-16 flex flex-col items-center justify-center text-center">

      {/* Handwriting Sub-Label */}
      <motion.p
        initial={{ opacity: 0, y: 10, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-handwriting text-2xl md:text-3xl lg:text-4xl text-[var(--accent)] mb-4 md:mb-6"
      >
        a vocabulary for the eras...
      </motion.p>

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-medium leading-[0.9] tracking-tight mb-8"
      >
        The Swift<br />
        <span>Dictionary</span>
      </motion.h1>

      {/* Hero Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="font-body text-base md:text-lg max-w-xl text-[var(--foreground-muted)] font-light leading-relaxed mb-12"
      >
        Every lyric tells a story. Every word carries a meaning.
        Uncover the sophistication hidden in her discography.
      </motion.p>

      {/* Glowing Era Pills Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-3xl mx-auto flex flex-wrap justify-center gap-3 md:gap-4 px-4 "
      >
        {ERAS.map((era) => (
          <motion.div key={era.slug} whileHover={{ y: -2 }}>
            <Link
              href={`/explorer/${era.slug}`}
              className="era-pill"
              style={{
                '--hover-bg': `${era.color}15`,
                '--hover-text': era.color,
                '--hover-border': `${era.color}50`,
              } as React.CSSProperties}
            >
              {era.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
