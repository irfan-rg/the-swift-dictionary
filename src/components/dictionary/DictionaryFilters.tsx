"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

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
  { key: "relevance", label: "Relevance" },
  { key: "az", label: "A–Z" },
  { key: "za", label: "Z–A" },
  { key: "difficulty", label: "Difficulty" },
];

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
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className="h-11 w-full pr-10 pl-4 rounded-sm bg-[var(--surface-raised)] border border-[var(--border)] font-body text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--border-focus)] md:min-w-[10rem] text-left relative transition-colors"
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

/* ── Compact mobile pill selector ─────────────────────────── */
function MobilePillSelect({
  value,
  onChange,
  options,
  ariaLabel,
}: { value: string; onChange: (v: string) => void; options: Option[]; ariaLabel: string }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="listbox" aria-label={ariaLabel}>
      {options.map((opt) => {
        const isSelected = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onChange(opt.key)}
            className={`px-3 py-1.5 rounded-full font-body text-xs tracking-wide transition-colors ${
              isSelected
                ? "bg-[var(--foreground)] text-[var(--background)] font-medium"
                : "bg-[var(--surface-raised)] text-[var(--foreground-muted)] border border-[var(--border)]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function DictionaryFilters({ album, setAlbum, difficulty, setDifficulty, sort, setSort }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Count active filters (non-default values)
  const activeCount = [
    album !== "all" ? 1 : 0,
    difficulty !== "all" ? 1 : 0,
    sort !== "az" && sort !== "relevance" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <>
      {/* ── Mobile: icon button (sits inline in the search row) ── */}
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className={`md:hidden relative flex items-center justify-center w-11 h-11 shrink-0 rounded-sm border transition-colors ${
          mobileOpen
            ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
            : "border-[var(--border)] bg-[var(--surface-raised)] text-[var(--foreground-muted)]"
        }`}
        aria-label="Toggle filters"
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
        {!mobileOpen && activeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-[var(--accent)] text-[var(--background)] text-[9px] font-bold">
            {activeCount}
          </span>
        )}
      </button>

      {/* ── Mobile: compact filter panel with pill selectors ── */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-3 w-full pt-1">
          {/* Era */}
          <div>
            <span className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] opacity-60 mb-1.5 block">Era</span>
            <MobilePillSelect value={album} onChange={setAlbum} options={albums} ariaLabel="Album era" />
          </div>
          {/* Difficulty */}
          <div>
            <span className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] opacity-60 mb-1.5 block">Level</span>
            <MobilePillSelect value={difficulty} onChange={setDifficulty} options={difficulties} ariaLabel="Difficulty level" />
          </div>
          {/* Sort */}
          <div>
            <span className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] opacity-60 mb-1.5 block">Sort by</span>
            <MobilePillSelect value={sort} onChange={setSort} options={sortOptions} ariaLabel="Sort results" />
          </div>
        </div>
      )}

      {/* ── Desktop: always visible dropdown row (unchanged) ── */}
      <div className="hidden md:flex items-center gap-4">
        <Dropdown value={album} onChange={setAlbum} options={albums} ariaLabel="Album era" />
        <Dropdown value={difficulty} onChange={setDifficulty} options={difficulties} ariaLabel="Difficulty level" />
        <Dropdown value={sort} onChange={setSort} options={sortOptions} ariaLabel="Sort results" />
      </div>
    </>
  );
}
