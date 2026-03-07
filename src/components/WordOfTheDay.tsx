'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { WordWithDetails } from '@/lib/types';

const fallback: WordWithDetails = {
  id: "fallback",
  word: "Serendipitous",
  definition: "Occurring or discovered by chance in a happy or beneficial way.",
  lyric_snippet: "It was serendipitous, the way we met...",
  song_id: "",
  album_id: "",
  context: "Taylor uses this word to describe the magical, fateful nature of finding love.",
  difficulty: "Advanced",
  positions: [],
  created_at: "",
  song_title: "Invisible  String",
  song_slug: "invisible-string",
  album_slug: "folklore",
  album_title: "Folklore",
};

export default function WordOfTheDay({ data }: { data?: WordWithDetails | null }) {
  const wotd = data ?? fallback;
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full flex justify-center py-4">
      {/* The Polaroid Container — fixed height 3D space so back face matches perfectly */}
      <div
        className="relative w-full max-w-sm"
        style={{ perspective: 1400, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="w-full cursor-pointer grid relative"
          animate={{
            rotateY: isFlipped ? 180 : 0,
            rotateZ: isFlipped ? 1.5 : -1,
          }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 180, damping: 22 }}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
          onClick={() => setIsFlipped(!isFlipped)}
          whileHover={{ scale: isFlipped ? 1 : 1.01 }}
        >

          {/* ── FRONT FACE ── */}
          <div className="polaroid-card w-full col-start-1 row-start-1 mt-4" style={{ backfaceVisibility: 'hidden' }}>
            <div className="scrapbook-tape" />

            {/* Polaroid Photo Area */}
            <div className="w-full aspect-square bg-[var(--surface-raised)] border border-[var(--border)] rounded-sm p-6 sm:p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute top-4 left-4 font-display italic text-4xl text-[var(--foreground)] opacity-[0.04] leading-none select-none pointer-events-none">TSD</div>
              <span className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] mb-4">— Word of the Day —</span>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-3 tracking-tight break-words hyphens-auto w-full">{wotd.word}</h2>
              <div className="font-body text-xs tracking-wider text-[var(--accent)] mb-6 uppercase flex items-center justify-center gap-2">
                <span>{wotd.album_title}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-focus)]" />
                <span className="text-[var(--foreground-muted)]">{wotd.difficulty}</span>
              </div>
              <p className="font-body text-sm text-[var(--foreground-muted)]">{wotd.definition}</p>
            </div>

            {/* Polaroid Chin / Lyric quote */}
            <div className="pt-6 pb-2 px-4 text-center">
              <p className="font-handwriting text-xl sm:text-2xl leading-relaxed text-[var(--foreground)]">
                &quot;{wotd.lyric_snippet}&quot;
              </p>
              <p className="mt-5 font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] opacity-40">
                tap to flip ↩
              </p>
            </div>
          </div>

          {/* ── BACK FACE ── */}
          <div
            className="polaroid-card w-full col-start-1 row-start-1 overflow-hidden mt-4"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Aged paper texture lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, var(--foreground) 28px)',
                backgroundSize: '100% 28px',
                backgroundPositionY: '48px',
              }}
            />

            <div className="scrapbook-tape opacity-60" />

            {/* Back content */}
            <div className="relative z-10 pt-10 pb-6 px-6 flex flex-col h-full min-h-[420px]">

              {/* Stamp in top-right corner */}
              {/* <div className="absolute top-10 right-5 flex flex-col items-center rotate-12 opacity-40">
                <div className="w-10 h-10 border border-[var(--accent)] rounded-md flex items-center justify-center">
                  <span className="font-display text-[8px] font-bold text-[var(--accent)] uppercase tracking-tight text-center leading-tight">TSD<br />✦</span>
                </div>
              </div> */}

              {/* Handwritten heading */}
              <span className="font-handwriting text-3xl text-[var(--accent)] mb-2 leading-tight block">
                about this word...
              </span>
              <div className="w-8 h-px bg-[var(--accent)] opacity-40 mb-6" />

              {/* Context body — written text feel */}
              <p className="font-body text-[15px] text-[var(--foreground)] leading-[1.85] tracking-wider flex-1">
                {wotd.context || "No additional context found for this lyric."}
              </p>

              {/* Bottom meta strip */}
              <div className="mt-6 pt-4 border-t border-dashed border-[var(--border)] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-handwriting text-base text-[var(--foreground)]">{wotd.song_title || wotd.song_slug}</span>
                  <span className="font-body text-[10px] uppercase tracking-widest text-[var(--foreground)] opacity-50 mt-0.5">{wotd.album_title}</span>
                </div>
                <Link
                  href={`/explorer/${wotd.album_slug}/${wotd.song_slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                >
                  View Song <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>  

        </motion.div>
      </div>
    </div>
  );
}
