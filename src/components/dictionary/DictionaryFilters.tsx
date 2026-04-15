"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  album: string;
  setAlbum: (v: string) => void;
  difficulty: string;
  setDifficulty: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
};

const albums = [
  { key: "all", label: "All Eras" },
  { key: "debut", label: "Taylor Swift" },
  { key: "fearless", label: "Fearless" },
  { key: "speaknow", label: "Speak Now" },
  { key: "red", label: "Red" },
  { key: "1989", label: "1989" },
  { key: "reputation", label: "Reputation" },
  { key: "lover", label: "Lover" },
  { key: "folklore", label: "Folklore" },
  { key: "evermore", label: "Evermore" },
  { key: "midnights", label: "Midnights" },
  { key: "ttpd", label: "TTPD" },
  { key: "showgirl", label: "Showgirl" },
];

const difficulties = [
  { key: "all", label: "All Levels" },
  { key: "Beginner", label: "Beginner" },
  { key: "Intermediate", label: "Intermediate" },
  { key: "Advanced", label: "Advanced" },
];

const sortOptions = [
  { key: "relevance", label: "Sort: Relevance" },
  { key: "az", label: "Sort: A–Z" },
  { key: "za", label: "Sort: Z–A" },
  { key: "difficulty", label: "Sort: Difficulty" },
];

export default function DictionaryFilters({ album, setAlbum, difficulty, setDifficulty, sort, setSort }: Props) {
  return (
    <div className="flex items-center gap-3 md:gap-4 max-md:flex-wrap max-md:gap-2">
      {(() => {
        type Option = { key: string; label: string };
        function Dropdown({
          value,
          onChange,
          options,
          ariaLabel,
        }: { value: string; onChange: (v: string) => void; options: Option[]; ariaLabel: string }) {
          const [open, setOpen] = useState(false);
          const [activeIndex, setActiveIndex] = useState<number>(() => Math.max(0, options.findIndex((o) => o.key === value)));
          const ref = useRef<HTMLDivElement | null>(null);

          useEffect(() => {
            if (!open) return;
            const onDown = (e: MouseEvent) => {
              if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
            };
            document.addEventListener('mousedown', onDown);
            return () => document.removeEventListener('mousedown', onDown);
          }, [open]);

          const onKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
              setActiveIndex((i) => (i + 1) % options.length);
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setOpen(true);
              setActiveIndex((i) => (i - 1 + options.length) % options.length);
            } else if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (open) {
                const opt = options[activeIndex];
                if (opt) onChange(opt.key);
                setOpen(false);
              } else {
                setOpen(true);
              }
            } else if (e.key === 'Escape') {
              setOpen(false);
            }
          };

          const selected = options.find((o) => o.key === value) || options[0];

          return (
            <div className="relative max-md:flex-1" ref={ref}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={ariaLabel}
                onClick={() => setOpen((v) => !v)}
                onKeyDown={onKeyDown}
                className="h-11 pr-10 pl-4 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] font-body text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--border-focus)] min-w-[10rem] max-md:min-w-0 max-md:w-full text-left relative transition-colors"
              >
                {selected.label}
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)] opacity-50" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {open && (
                <div
                  role="listbox"
                  tabIndex={-1}
                  aria-label={ariaLabel}
                  className="absolute z-30 mt-2 w-full rounded-sm border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] overflow-hidden"
                >
                  <ul className="max-h-64 overflow-auto py-1">
                    {options.map((opt, idx) => {
                      const isActive = idx === activeIndex;
                      const isSelected = opt.key === value;
                      return (
                        <li key={opt.key}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => {
                              onChange(opt.key);
                              setOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 font-body text-sm transition-colors ${isActive ? 'bg-[var(--surface-raised)]' : ''} ${isSelected ? 'font-semibold text-[var(--accent)]' : 'text-[var(--foreground)]'}`}
                          >
                            {opt.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        }

        return (
          <>
            <Dropdown value={album} onChange={setAlbum} options={albums} ariaLabel="Album era" />
            <Dropdown value={difficulty} onChange={setDifficulty} options={difficulties} ariaLabel="Difficulty level" />
            <Dropdown value={sort} onChange={setSort} options={sortOptions} ariaLabel="Sort results" />
          </>
        );
      })()}
    </div>
  );
}
