export default function SongLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      {/* Header */}
      <div className="mb-12">
        {/* Back link */}
        <div className="h-3 w-40 bg-neutral-200 dark:bg-neutral-800 rounded mb-6" />

        <div className="h-16 w-3/4 max-w-lg bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-4" />
        
        <div className="flex items-center gap-3">
          <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-30" />
          <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-30" />
          <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>
        <div className="w-16 h-px bg-[var(--border-focus)] mt-6 opacity-30" />
      </div>

      {/* Spotify Embed Skeleton */}
      <div className="mb-12 h-[152px] w-full rounded-sm border border-[var(--border)] bg-[var(--surface-raised)]" />
      
      {/* Lyrics and Vocabulary Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lyrics Section */}
        <div className="bg-[var(--surface-raised)] rounded-sm border border-[var(--border)] p-8">
          <div className="mb-6 space-y-2">
            <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded mb-1" />
            <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>

          <div className="space-y-4 opacity-80">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded"
                style={{ width: `${50 + Math.random() * 40}%` }}
              />
            ))}
          </div>
        </div>

        {/* Vocabulary Section */}
        <div className="flex flex-col">
          <div className="mb-4 space-y-2">
            <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-800 rounded mb-1" />
            <div className="h-8 w-40 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>

          <div className="border-t border-[var(--border)]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border-b border-[var(--border)] py-4 px-4 -mx-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
                  <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded shrink-0" />
                </div>
                <div className="space-y-2 mt-3">
                  <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
                  <div className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
