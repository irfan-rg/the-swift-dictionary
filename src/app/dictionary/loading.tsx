export default function DictionaryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="mb-4">
        <div className="h-10 w-44 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="mt-2 h-[2px] w-28 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
      </div>

      {/* Search + filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-8">
        <div className="flex-1 h-11 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="flex gap-3">
          <div className="h-11 w-40 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-11 w-40 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-11 w-40 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>

      <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded mb-4" />

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-6 space-y-3"
          >
            <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
