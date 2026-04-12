'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ERAS } from '@/lib/constants';

export default function HeroSection() {
  const doubled = [...ERAS, ...ERAS];

  return (
    <section className="relative w-full min-h-[calc(100vh-3.5rem)] flex flex-col items-center px-4">

      {/* Spacer — pushes content to true vertical center */}
      <div className="flex-1" />

      {/* Centered content group */}
      <div className="flex flex-col items-center text-center">
        {/* Handwriting Sub-Label */}
        <motion.p
          initial={{ opacity: 0, y: 10, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-handwriting text-2xl md:text-3xl lg:text-4xl max-md:text-xl max-md:mb-3 text-[var(--accent)] mb-6 md:mb-10"
        >
          a vocabulary for every era...
        </motion.p>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-branding [-webkit-text-stroke:0.1px_currentColor] text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] max-md:text-5xl font-medium leading-[0.9] tracking-wide md:mt-4 mt-8 mb-8 md:mb-10"
        >
          The Swift<br />
          <span>Dictionary</span>
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-body text-base md:text-lg max-w-xl text-[var(--foreground-muted)] font-light leading-relaxed md:-mb-8 md:mt-8"
        >
          Every lyric tells a story. Every word carries a meaning.
          Uncover the sophistication hidden in her discography.
        </motion.p>
      </div>

      {/* Spacer — pushes marquee to bottom */}
      <div className="flex-1" />

      {/* Scrolling Era Marquee — anchored near bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-4xl mx-auto overflow-hidden marquee-mask pb-8 "
      >
        <div className="marquee-track">
          {doubled.map((era, i) => (
            <Link
              key={`${era.slug}-${i}`}
              href={`/explorer/${era.slug}`}
              className="marquee-item group"
              style={{
                '--era-color': `var(--era-${era.slug})`,
              } as React.CSSProperties}
            >
              <span className="marquee-dot" style={{ backgroundColor: `var(--era-${era.slug})` }} />
              <span className="marquee-label">{era.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
