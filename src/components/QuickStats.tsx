import React from 'react';

export default function QuickStats() {
  return (
    <section className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-4">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">Words</div>
          <div className="mt-1 text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-4">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">Songs Indexed</div>
          <div className="mt-1 text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-4">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">Artists</div>
          <div className="mt-1 text-2xl font-semibold">—</div>
        </div>
      </div>
    </section>
  );
}


