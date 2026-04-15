"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getEraColor } from "@/lib/constants";
import type { WordCardItem } from "@/lib/types";

type Props = {
  item: WordCardItem;
  onOpen?: (item: WordCardItem) => void;
};

export default function WordCard({ item, onOpen }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-5 max-md:p-4 flex flex-col gap-4 max-md:gap-3 cursor-pointer hover:border-[var(--border-focus)] hover:shadow-[var(--shadow-soft)] transition-all"
      onClick={() => onOpen?.(item)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div>
            <h3 className="font-display text-2xl max-md:text-xl font-medium tracking-tight text-[var(--foreground)]">{item.word}</h3>
            <p
              className="font-body text-xs font-medium mt-1"
              style={{ color: getEraColor(item.album) }}
            >
              {item.song}
            </p>
          </div>
          <div className="inline-flex items-center gap-2">
            <span
              className="font-body text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-sm border text-[var(--foreground-muted)]"
              style={{ borderColor: getEraColor(item.album) }}
              title={`Era: ${item.album}`}
            >
              {item.album}
            </span>
            <span className="font-handwriting text-sm text-[var(--foreground-muted)] opacity-60">
              {item.difficulty}
            </span>
          </div>
        </div>
        <div className="p-2 text-[var(--foreground-muted)] opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all max-md:hidden">
          <ArrowRight className="w-4 h-4 transform transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </div>
      </div>

      <div>
        <h4 className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] opacity-60 mb-1">Meaning</h4>
        <p className="font-body text-sm text-[var(--foreground)] leading-relaxed line-clamp-2 opacity-80">{item.definition}</p>
      </div>

      <div className="max-md:hidden">
        <h4 className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] opacity-60 mb-1">Lyric</h4>
        <blockquote className="font-body text-sm text-[var(--foreground)] italic border-l-2 border-[var(--accent)] opacity-60 pl-3">
          &ldquo;{item.lyricSnippet}&rdquo; — {item.song}
        </blockquote>
      </div>
    </motion.div>
  );
}
