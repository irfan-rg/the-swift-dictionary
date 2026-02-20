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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur p-5 flex flex-col gap-4 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg/40 dark:hover:shadow-black/30 transition-transform"
      onClick={() => onOpen?.(item)}
    >
      <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-playfair text-2xl font-bold tracking-wide text-neutral-900 dark:text-white">{item.word}</h3>
              <p 
                className="text-sm mt-1 font-medium"
                style={{ color: getEraColor(item.album) }}
              >
                {item.song}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-neutral-500">
            <span
              className="px-2.5 py-0.5 rounded-full border text-neutral-700 dark:text-neutral-300 uppercase tracking-wide"
              style={{ borderColor: getEraColor(item.album) }}
              title={`Era: ${item.album}`}
            >
              {item.album}
            </span>
            <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
              {item.difficulty}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="p-2 rounded-md text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
            <ArrowRight className="w-4 h-4 transform transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Meaning</h4>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed line-clamp-2">{item.definition}</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Lyric</h4>
        <blockquote className="text-neutral-700 dark:text-neutral-300 text-sm italic border-l-2 border-neutral-300 dark:border-neutral-700 pl-3">“{item.lyricSnippet}” — {item.song}</blockquote>
      </div>
      {/* Modal moved to page-level to ensure single instance */}
    </motion.div>
  );
}


