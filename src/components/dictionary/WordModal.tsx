"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { getEraColor } from "@/lib/constants";
import FavoriteButton from "@/components/FavoriteButton";
import type { WordCardItem } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  item: WordCardItem | null;
  isFavorited?: boolean;
  userId?: string | null;
  onFavToggle?: (wordId: string, nowFavorited: boolean) => void;
};

export default function WordModal({ open, onClose, item, isFavorited = false, userId = null, onFavToggle }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
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
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none max-md:items-end max-md:p-0"
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="w-full max-w-2xl rounded-sm border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-polaroid)] max-h-[85vh] overflow-hidden pointer-events-auto flex flex-col max-md:max-w-none max-md:rounded-t-2xl max-md:rounded-b-none max-md:border-b-0 max-md:max-h-[88vh]">
              {/* Drag handle — mobile only */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-9 h-1 rounded-full bg-[var(--foreground-muted)] opacity-25" />
              </div>
              {/* Header */}
              <div
                className="p-6 max-md:p-4 border-b border-[var(--border)] relative"
                style={{ borderLeftWidth: '4px', borderLeftColor: getEraColor(item.album) }}
              >
                <button
                  aria-label="Close"
                  className="absolute top-4 right-4 p-2 rounded-sm border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-raised)] focus:outline-none transition-colors"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </button>
                <h2 className="font-display text-3xl font-medium text-[var(--foreground)] mb-1 pr-10">{item.word}</h2>
                <p className="font-body text-xs text-[var(--foreground-muted)]">
                  From <span className="font-medium capitalize" style={{ color: getEraColor(item.album) }}>{item.album}</span> • <span className="font-medium">{item.song}</span>
                </p>
              </div>

              {/* Body */}
              <div className="p-6 max-md:p-4 flex-1 min-h-0 overflow-y-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)]">Definition</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-handwriting text-sm text-[var(--foreground-muted)] opacity-60">{item.difficulty}</span>
                      <FavoriteButton
                        wordId={item.id}
                        isFavorited={isFavorited}
                        userId={userId}
                        onToggle={onFavToggle}
                        size="md"
                      />
                    </div>
                  </div>
                  <p className="font-body text-sm text-[var(--foreground)] leading-relaxed opacity-80">{item.definition}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] mb-3">In Taylor&apos;s Words</h3>
                  <div className="border-l-2 border-[var(--accent)] pl-4 py-2">
                    <p className="font-body text-sm text-[var(--foreground)] italic opacity-80">
                      &ldquo;{item.lyricSnippet}&rdquo; — {item.song}
                    </p>
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] mb-2">Context</h3>
                  <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed">
                    {item.context || 'Contextual note about how the word is used in the song, the narrative angle, tone, or era influence.'}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--surface-raised)]">
                <div className="flex items-center justify-between">
                  <button
                    className="font-body text-xs tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <Link
                    href={`/explorer/${item.album}/${item.songSlug}`}
                    className="font-body text-xs tracking-widest uppercase px-4 py-2 rounded-sm text-white transition-colors hover:opacity-80"
                    style={{ backgroundColor: getEraColor(item.album) }}
                    onClick={onClose}
                  >
                    View Song
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
