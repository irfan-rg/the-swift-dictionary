export default function ExplorerLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="mb-8">
        <div className="h-10 w-40 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="mt-2 h-[2px] w-28 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 overflow-hidden"
          >
            <div className="h-48 bg-neutral-200 dark:bg-neutral-800" />
            <div className="p-6 space-y-3">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
