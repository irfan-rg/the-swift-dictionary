export default function SongLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="mb-8 flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-2">
          <div className="h-9 w-56 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="h-[2px] w-28 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>
      </div>

      {/* Info card */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-8 mb-8 space-y-4">
        <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lyrics skeleton */}
        <div className="bg-white/60 dark:bg-neutral-900/40 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 space-y-3">
          <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-24 mb-6" />
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded"
              style={{ width: `${50 + Math.random() * 50}%` }}
            />
          ))}
        </div>

        {/* Vocab skeleton */}
        <div className="bg-white/60 dark:bg-neutral-900/40 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 space-y-4">
          <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-44 mb-6" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 space-y-2"
            >
              <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
              <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
