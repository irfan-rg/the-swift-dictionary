export default function ExplorerLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="mb-12 text-center flex flex-col items-center">
        <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-800 rounded mb-3" />
        <div className="h-14 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-4" />
        <div className="h-4 w-80 bg-neutral-200 dark:bg-neutral-800 rounded mb-2" />
        <div className="h-4 w-64 bg-neutral-200 dark:bg-neutral-800 rounded" />
        <div className="w-16 h-px bg-[var(--border-focus)] mt-6 opacity-50" />
      </div>

      {/* Albums Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] overflow-hidden"
          >
            {/* Album Cover */}
            <div className="w-full aspect-square bg-neutral-200 dark:bg-neutral-800" />
            
            {/* Content */}
            <div className="p-5">
              <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded mb-2" />
              
              {/* Stats Row */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-10 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-50" />
                <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-50" />
                <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
              </div>

              {/* Description */}
              <div className="space-y-2 mb-5">
                <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded" />
              </div>

              {/* View Album Link */}
              <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
