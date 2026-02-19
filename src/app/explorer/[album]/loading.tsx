export default function AlbumLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="mb-8 flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-2">
          <div className="h-9 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="h-[2px] w-28 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>
      </div>

      {/* Info card skeleton */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 h-48 bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex-1 p-8 space-y-4">
            <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
          </div>
        </div>
      </div>

      {/* Songs grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-6 space-y-3"
          >
            <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
