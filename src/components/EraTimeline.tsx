'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ERAS } from '@/lib/constants';
import type { Album } from '@/lib/types';

interface Props {
  albums: Album[];
}

export default function EraTimeline({ albums }: Props) {
  const [hoveredEra, setHoveredEra] = useState<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Match ERAS order with album data for proportional widths + covers
  const eraData = ERAS.map((era) => {
    const album = albums.find((a) => a.slug === era.slug);
    return {
      ...era,
      vocabCount: album?.vocab_count ?? 1,
      songCount: album?.song_count ?? 0,
      coverUrl: album?.cover_url ?? null,
    };
  });

  const totalVocab = eraData.reduce((sum, e) => sum + e.vocabCount, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      {/* Section label */}
       <p className="font-body text-[12px] tracking-widest uppercase text-center text-[var(--foreground-muted)] opacity-50 mb-6 mt-6">
        The Eras · 2006 – {ERAS[ERAS.length - 1].year}
      </p>


      {/* Hovered era info — cover + label */}
      <div className="h-20 flex items-end justify-center mb-3">
        <AnimatePresence mode="wait">
          {hoveredEra !== null && (
            <motion.div
              key={hoveredEra}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center gap-2"
            >
              {/* Album cover thumbnail */}
              {eraData[hoveredEra].coverUrl && (
                <div
                  className="w-12 h-12 rounded-sm overflow-hidden border border-[var(--border)] shadow-md"
                >
                  <Image
                    src={eraData[hoveredEra].coverUrl!}
                    alt={eraData[hoveredEra].label}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <span
                className="font-body text-xs tracking-widest uppercase"
                style={{ color: isDark ? eraData[hoveredEra].colorDark : eraData[hoveredEra].color }}
              >
                {eraData[hoveredEra].label} · {eraData[hoveredEra].year}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The bar — proportional widths */}
      <div className="flex h-2 rounded-full overflow-hidden gap-px">
        {eraData.map((era, i) => {
          // Proportional width based on vocab count, with a sensible minimum
          const proportion = Math.max(era.vocabCount / totalVocab, 0.04);
          return (
            <Link
              key={era.slug}
              href={`/explorer/${era.slug}`}
              className="relative transition-all duration-300 ease-out"
              style={{
                flex: `${proportion} 0 0%`,
                backgroundColor: isDark ? era.colorDark : era.color,
                opacity: hoveredEra === null ? 0.5 : hoveredEra === i ? 1 : 0.15,
                transform: hoveredEra === i ? 'scaleY(2.5)' : 'scaleY(1)',
              }}
              onMouseEnter={() => setHoveredEra(i)}
              onMouseLeave={() => setHoveredEra(null)}
            />
          );
        })}
      </div>

      {/* Year markers */}
      <div className="flex justify-between mt-2 px-0.5">
        <span className="font-body text-[9px] text-[var(--foreground-muted)] opacity-30 tracking-wider">
          {ERAS[0].year}
        </span>
        <span className="font-body text-[9px] text-[var(--foreground-muted)] opacity-30 tracking-wider">
          {ERAS[ERAS.length - 1].year}
        </span>
      </div>
    </motion.section>
  );
}
