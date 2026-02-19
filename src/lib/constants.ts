// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — shared constants (single source of truth)
// ────────────────────────────────────────────────────────────────

import type { EraSlug } from "@/lib/types";

// ── Era / Album metadata ──────────────────────────────────────

export interface EraInfo {
  slug: EraSlug;
  label: string;
  year: number;
  /** Solid hex colour representing the era */
  color: string;
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
    color: "#16a34a",
    gradientClasses: "from-green-100 to-teal-100 border-green-200",
    chipClasses: "bg-green-100 text-green-800",
  },
  {
    slug: "fearless",
    label: "Fearless",
    year: 2008,
    color: "#f59e0b",
    gradientClasses: "from-yellow-100 to-amber-100 border-yellow-200",
    chipClasses: "bg-yellow-100 text-yellow-800",
  },
  {
    slug: "speaknow",
    label: "Speak Now",
    year: 2010,
    color: "#a855f7",
    gradientClasses: "from-purple-100 to-pink-100 border-purple-200",
    chipClasses: "bg-purple-100 text-purple-800",
  },
  {
    slug: "red",
    label: "Red",
    year: 2012,
    color: "#ef4444",
    gradientClasses: "from-red-100 to-pink-100 border-red-200",
    chipClasses: "bg-red-100 text-red-800",
  },
  {
    slug: "1989",
    label: "1989",
    year: 2014,
    color: "#3b82f6",
    gradientClasses: "from-blue-100 to-cyan-100 border-cyan-200",
    chipClasses: "bg-blue-100 text-blue-800",
  },
  {
    slug: "reputation",
    label: "Reputation",
    year: 2017,
    color: "#6b7280",
    gradientClasses: "from-gray-200 to-black border-gray-300",
    chipClasses: "bg-gray-200 text-gray-800",
  },
  {
    slug: "lover",
    label: "Lover",
    year: 2019,
    color: "#ec4899",
    gradientClasses: "from-pink-100 to-rose-100 border-pink-200",
    chipClasses: "bg-pink-100 text-pink-800",
  },
  {
    slug: "folklore",
    label: "Folklore",
    year: 2020,
    color: "#737373",
    gradientClasses: "from-gray-100 to-green-100 border-green-200",
    chipClasses: "bg-gray-100 text-gray-800",
  },
  {
    slug: "evermore",
    label: "Evermore",
    year: 2020,
    color: "#d97706",
    gradientClasses: "from-amber-100 to-orange-100 border-orange-200",
    chipClasses: "bg-amber-100 text-amber-800",
  },
  {
    slug: "midnights",
    label: "Midnights",
    year: 2022,
    color: "#6366f1",
    gradientClasses: "from-indigo-100 to-purple-100 border-purple-200",
    chipClasses: "bg-indigo-100 text-indigo-800",
  },
  {
    slug: "ttpd",
    label: "The Tortured Poets Department",
    year: 2024,
    color: "#78716c",
    gradientClasses: "from-stone-100 to-neutral-200 border-stone-300",
    chipClasses: "bg-stone-100 text-stone-800",
  },
  {
    slug: "showgirl",
    label: "The Life of a Showgirl",
    year: 2025,
    color: "#f97316",
    gradientClasses: "from-orange-100 to-amber-100 border-orange-200",
    chipClasses: "bg-orange-100 text-orange-800",
  },
];

// ── Lookup helpers ─────────────────────────────────────────────

/** Map slug → EraInfo for O(1) lookups */
export const ERA_MAP: Record<EraSlug, EraInfo> = Object.fromEntries(
  ERAS.map((e) => [e.slug, e])
) as Record<EraSlug, EraInfo>;

/** Get the hex era colour for a slug, with fallback */
export function getEraColor(slug: string): string {
  return (ERA_MAP[slug as EraSlug]?.color) ?? "#6b7280";
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
