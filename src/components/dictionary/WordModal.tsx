"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type WordItem = {
  id: string;
  word: string;
  definition: string;
  lyricSnippet: string;
  song: string;
  album: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  context?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  item: WordItem | null;
};

export default function WordModal({ open, onClose, item }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {(() => {
              const eraColors: Record<string, string> = {
                folklore: 'from-gray-100 to-green-100 border-green-200',
                evermore: 'from-amber-100 to-orange-100 border-orange-200',
                midnights: 'from-indigo-100 to-purple-100 border-purple-200',
                lover: 'from-pink-100 to-rose-100 border-pink-200',
                reputation: 'from-gray-200 to-black border-gray-300',
                '1989': 'from-blue-100 to-cyan-100 border-cyan-200',
                red: 'from-red-100 to-pink-100 border-red-200',
                speaknow: 'from-purple-100 to-pink-100 border-purple-200',
                fearless: 'from-yellow-100 to-amber-100 border-yellow-200',
                debut: 'from-green-100 to-teal-100 border-green-200',
              };
              const headerClass = eraColors[item.album] || 'from-neutral-100 to-neutral-200 border-neutral-200';
              return (
                <div className="w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur shadow-xl max-h-[85vh] overflow-hidden pointer-events-auto">
                  {/* Header (clean, no difficulty chip) */}
                  <div className={`bg-gradient-to-r ${headerClass} p-6 border-b border-neutral-200 dark:border-neutral-800 relative`}>
                    <button
                      aria-label="Close"
                      className="absolute top-3 right-3 p-2 rounded-full border border-neutral-300/70 dark:border-neutral-700/60 bg-white/70 dark:bg-neutral-900/70 text-neutral-700 dark:text-neutral-200 hover:bg-white/90 dark:hover:bg-neutral-800/80 focus:outline-none focus:ring-2 focus:ring-neutral-400/40"
                      onClick={onClose}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-1 pr-10">{item.word}</h2>
                    <p className="text-gray-700 text-sm pr-12">
                      From <span className="font-semibold capitalize">{item.album}</span> • <span className="font-semibold">{item.song}</span>
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Definition</h3>
                        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700">{item.difficulty}</span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">{item.definition}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-6">In Taylor's Words</h3>
                      <div className="rounded-lg p-4 border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/30">
                        <svg className="w-4 h-4 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M7.17 6.17C5.97 7.37 5.25 8.97 5.25 10.75C5.25 12.68 6.82 14.25 8.75 14.25C10.68 14.25 12.25 12.68 12.25 10.75C12.25 8.82 10.68 7.25 8.75 7.25C8.46 7.25 8.18 7.28 7.91 7.33C8.21 6.74 8.63 6.2 9.17 5.67C10.37 4.47 11.97 3.75 13.75 3.75V2.25C11.53 2.25 9.5 3.13 8.08 4.54L7.17 5.46V6.17Z" fill="currentColor" opacity="0.6"/>
                          <path d="M16.17 6.17C14.97 7.37 14.25 8.97 14.25 10.75C14.25 12.68 15.82 14.25 17.75 14.25C19.68 14.25 21.25 12.68 21.25 10.75C21.25 8.82 19.68 7.25 17.75 7.25C17.46 7.25 17.18 7.28 16.91 7.33C17.21 6.74 17.63 6.2 18.17 5.67C19.37 4.47 20.97 3.75 22.75 3.75V2.25C20.53 2.25 18.5 3.13 17.08 4.54L16.17 5.46V6.17Z" fill="currentColor" opacity="0.6"/>
                        </svg>
                        <p className="text-neutral-700 dark:text-neutral-300 italic">“{item.lyricSnippet}” — {item.song}</p>
                      </div>
                    </div>

                    <div className="mb-2">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Context</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                        {item.context || 'Contextual note about how the word is used in the song, the narrative angle, tone, or era influence.'}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40">
                    <div className="flex items-center justify-end">
                      <button
                        className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm"
                        onClick={onClose}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


