export default function AlbumLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      {/* Header */}
      <div className="mb-12">
        {/* Back Link */}
        <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-800 rounded mb-6" />

        <div className="h-16 w-3/4 max-w-lg bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-4" />
        
        <div className="flex items-center gap-3">
          <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-50" />
          <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-50" />
          <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>
        <div className="w-16 h-px bg-[var(--border-focus)] mt-6 opacity-30" />
      </div>

      {/* Album Info Card */}
      <div className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] overflow-hidden mb-12">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 h-48 md:h-auto md:min-h-64 relative shrink-0 bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex-1 p-8 space-y-3">
            <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="mb-4">
        <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
      </div>

      <div className="border-t border-[var(--border)]">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-5 py-4 border-b border-[var(--border)] px-4 -mx-4"
          >
            <div className="w-6 shrink-0 h-6 bg-neutral-200 dark:bg-neutral-800 rounded" />
            
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-5 w-48 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>

            <div className="shrink-0 hidden sm:block h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
