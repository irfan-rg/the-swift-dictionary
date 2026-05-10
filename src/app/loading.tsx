import React from "react";

/**
 * Homepage loading skeleton — matches the actual page layout:
 * 1. Hero section (centered title + subtitle)
 * 2. Scrapbook grid: WOTD polaroid card (left) + Top Songs list (right)
 * 3. Era timeline placeholder
 */
export default function HomeLoading() {
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto gap-12 lg:gap-20 max-md:px-4 animate-pulse">

      {/* ── Hero Section ── */}
      <section className="relative w-full min-h-[calc(100vh-3.5rem)] flex flex-col items-center px-4">
        <div className="flex-1" />
        <div className="flex flex-col items-center text-center">
          {/* Handwriting sub-label */}
          <div className="h-7 w-64 max-md:w-48 bg-[var(--border)] rounded mb-6 max-md:mb-3 opacity-60" />
          {/* Hero title */}
          <div className="h-20 md:h-28 w-80 md:w-[28rem] bg-[var(--border)] rounded mt-4 mb-8 md:mb-10" />
          {/* Hero description */}
          <div className="space-y-2 max-w-xl w-full">
            <div className="h-4 w-full bg-[var(--border)] rounded opacity-50" />
            <div className="h-4 w-3/4 bg-[var(--border)] rounded opacity-50 mx-auto" />
          </div>
        </div>
        <div className="flex-1" />
        {/* Marquee placeholder */}
        <div className="w-full max-w-4xl mx-auto pb-8">
          <div className="h-8 w-full bg-[var(--border)] rounded-full opacity-30" />
        </div>
      </section>

      {/* ── Scrapbook Grid: WOTD + Top Songs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full max-md:gap-6">

        {/* WOTD Polaroid Card */}
        <div className="lg:col-span-5 flex items-center h-full">
          <div className="w-full flex justify-center py-4">
            <div className="w-full max-w-sm max-md:max-w-[calc(100vw-2rem)]">
              <div className="polaroid-card w-full mt-4">
                {/* Photo area */}
                <div className="w-full aspect-square max-md:aspect-auto bg-[var(--surface-raised)] border border-[var(--border)] rounded-sm p-6 sm:p-8 max-md:py-8 flex flex-col justify-center items-center text-center">
                  <div className="h-3 w-28 bg-[var(--border)] rounded mb-4 opacity-60" />
                  <div className="h-12 w-48 bg-[var(--border)] rounded mb-3" />
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-3 w-16 bg-[var(--border)] rounded opacity-60" />
                    <span className="w-1 h-1 rounded-full bg-[var(--border-focus)]" />
                    <div className="h-3 w-14 bg-[var(--border)] rounded opacity-60" />
                  </div>
                  <div className="h-4 w-full bg-[var(--border)] rounded opacity-40" />
                  <div className="h-4 w-3/4 bg-[var(--border)] rounded opacity-40 mt-1.5" />
                </div>
                {/* Chin / lyric */}
                <div className="pt-6 pb-2 px-4 text-center">
                  <div className="h-6 w-full bg-[var(--border)] rounded opacity-40" />
                  <div className="h-3 w-16 bg-[var(--border)] rounded opacity-20 mx-auto mt-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Songs List */}
        <div className="lg:col-span-7 flex">
          <div className="polaroid-card flex flex-col w-full p-8 sm:p-10 max-md:p-5 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-end justify-between mb-4 relative z-10">
              <div>
                <div className="h-3 w-36 bg-[var(--border)] rounded mb-1 opacity-60" />
                <div className="h-10 w-32 bg-[var(--border)] rounded" />
              </div>
              <div className="h-3 w-24 bg-[var(--border)] rounded hidden sm:block opacity-40" />
            </div>
            {/* Song rows */}
            <div className="flex-1 flex flex-col justify-between relative z-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-4 border-b border-[var(--border)] py-2 sm:py-3">
                    <div className="h-5 w-5 bg-[var(--border)] rounded shrink-0 opacity-50" />
                    <div className="flex-1 min-w-0">
                      <div className={`h-5 bg-[var(--border)] rounded ${['w-40', 'w-48', 'w-36', 'w-44', 'w-32'][i]} max-w-full`} />
                      <div className="h-3 w-20 bg-[var(--border)] rounded opacity-50 mt-1" />
                    </div>
                    <div className="h-4 w-12 bg-[var(--border)] rounded shrink-0 hidden sm:block opacity-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]" />
      </div>

      {/* ── Era Timeline placeholder ── */}
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="h-3 w-20 bg-[var(--border)] rounded mx-auto mb-2 opacity-60" />
          <div className="h-8 w-48 bg-[var(--border)] rounded mx-auto" />
        </div>
        <div className="h-12 w-full bg-[var(--border)] rounded-sm opacity-30" />
      </div>

      {/* ── End Mark ── */}
      <div className="w-full max-w-xs mx-auto divider-ornate">
        <span className="text-[var(--accent)] opacity-40">✧</span>
      </div>
    </div>
  );
}
