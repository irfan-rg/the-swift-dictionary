// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — shared constants (single source of truth)
// ────────────────────────────────────────────────────────────────

import type { EraSlug } from "@/lib/types";

// ── Era / Album metadata ──────────────────────────────────────

export interface EraInfo {
  slug: EraSlug;
  label: string;
  year: number;
  /** Solid hex colour representing the era (light mode) */
  color: string;
  /** Brighter variant readable on dark backgrounds */
  colorDark: string;
  /** Tailwind gradient classes for modal/card headers (light mode) */
  gradientClasses: string;
  /** Tailwind chip classes (bg + text) */
  chipClasses: string;
}

export const ERAS: EraInfo[] = [
  {
    slug: "debut",
    label: "Taylor Swift",
    year: 2006,
    color: "#5F9EA0",
    colorDark: "#7EC8CA",
    gradientClasses: "from-green-100 to-teal-100 border-green-200",
    chipClasses: "bg-green-100 text-green-800",
  },
  {
    slug: "fearless",
    label: "Fearless",
    year: 2008,
    color: "#D4A017",
    colorDark: "#FFD700",
    gradientClasses: "from-yellow-100 to-amber-100 border-yellow-200",
    chipClasses: "bg-yellow-100 text-yellow-800",
  },
  {
    slug: "speaknow",
    label: "Speak Now",
    year: 2010,
    color: "#7B2D8E",
    colorDark: "#C084FC",
    gradientClasses: "from-purple-100 to-pink-100 border-purple-200",
    chipClasses: "bg-purple-100 text-purple-800",
  },
  {
    slug: "red",
    label: "Red",
    year: 2012,
    color: "#DC143C",
    colorDark: "#F87171",
    gradientClasses: "from-red-100 to-pink-100 border-red-200",
    chipClasses: "bg-red-100 text-red-800",
  },
  {
    slug: "1989",
    label: "1989",
    year: 2014,
    color: "#4A90D9",
    colorDark: "#87CEEB",
    gradientClasses: "from-blue-100 to-cyan-100 border-cyan-200",
    chipClasses: "bg-blue-100 text-blue-800",
  },
  {
    slug: "reputation",
    label: "Reputation",
    year: 2017,
    color: "#1a1a1a",
    colorDark: "#C0C0C0",
    gradientClasses: "from-gray-200 to-black border-gray-300",
    chipClasses: "bg-gray-200 text-gray-800",
  },
  {
    slug: "lover",
    label: "Lover",
    year: 2019,
    color: "#E8788F",
    colorDark: "#FFB6C1",
    gradientClasses: "from-pink-100 to-rose-100 border-pink-200",
    chipClasses: "bg-pink-100 text-pink-800",
  },
  {
    slug: "folklore",
    label: "Folklore",
    year: 2020,
    color: "#8A8A8A",
    colorDark: "#C8C8C8",
    gradientClasses: "from-gray-100 to-green-100 border-green-200",
    chipClasses: "bg-gray-100 text-gray-800",
  },
  {
    slug: "evermore",
    label: "Evermore",
    year: 2020,
    color: "#CC5500",
    colorDark: "#E8923B",
    gradientClasses: "from-amber-100 to-orange-100 border-orange-200",
    chipClasses: "bg-amber-100 text-amber-800",
  },
  {
    slug: "midnights",
    label: "Midnights",
    year: 2022,
    color: "#191970",
    colorDark: "#818CF8",
    gradientClasses: "from-indigo-100 to-purple-100 border-purple-200",
    chipClasses: "bg-indigo-100 text-indigo-800",
  },
  {
    slug: "ttpd",
    label: "The Tortured Poets Department",
    year: 2024,
    color: "#78716c",
    colorDark: "#A8A29E",
    gradientClasses: "from-stone-100 to-neutral-200 border-stone-300",
    chipClasses: "bg-stone-100 text-stone-800",
  },
  {
    slug: "showgirl",
    label: "The Life of a Showgirl",
    year: 2025,
    color: "#f97316",
    colorDark: "#FB923C",
    gradientClasses: "from-orange-100 to-amber-100 border-orange-200",
    chipClasses: "bg-orange-100 text-orange-800",
  },
];

// ── Lookup helpers ─────────────────────────────────────────────

/** Map slug → EraInfo for O(1) lookups */
export const ERA_MAP: Record<EraSlug, EraInfo> = Object.fromEntries(
  ERAS.map((e) => [e.slug, e])
) as Record<EraSlug, EraInfo>;

/** Get the CSS variable for an era color. The browser handles light/dark mode automatically. */
export function getEraColor(slug: string): string {
  if (!ERA_MAP[slug as EraSlug]) return "var(--foreground-muted)";
  return `var(--era-${slug})`;
}

/** Get gradient header classes for a slug, with fallback */
export function getEraGradient(slug: string): string {
  return (ERA_MAP[slug as EraSlug]?.gradientClasses) ?? "from-neutral-100 to-neutral-200 border-neutral-200";
}

/** Get the display label for an era slug */
export function getEraLabel(slug: string): string {
  return (ERA_MAP[slug as EraSlug]?.label) ?? slug;
}

// ── Difficulty config ──────────────────────────────────────────

export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;
