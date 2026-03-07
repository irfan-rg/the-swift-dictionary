export default function DictionaryLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      {/* Header */}
      <div className="mb-8 text-center flex flex-col items-center">
        <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded mb-3" />
        <div className="h-16 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-4" />
        <div className="h-4 w-80 max-w-md bg-neutral-200 dark:bg-neutral-800 rounded" />
        <div className="w-16 h-px bg-[var(--border-focus)] mt-6 opacity-30" />
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-8">
        <div className="flex-1 h-11 bg-[var(--surface-raised)] border border-[var(--border)] rounded-sm" />
        <div className="flex gap-2 w-full md:w-auto overflow-hidden">
          <div className="h-11 w-full md:w-[130px] bg-[var(--surface-raised)] border border-[var(--border)] rounded-sm shrink-0" />
          <div className="h-11 w-full md:w-[130px] bg-[var(--surface-raised)] border border-[var(--border)] rounded-sm shrink-0" />
          <div className="h-11 w-full md:w-[130px] bg-[var(--surface-raised)] border border-[var(--border)] rounded-sm shrink-0" />
        </div>
      </div>

      {/* Results count */}
      <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded mb-5" />

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 w-full">
                <div>
                  <div className="h-7 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded mb-2" />
                  <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                  <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
                </div>
              </div>
              <div className="w-4 h-4 rounded bg-neutral-200 dark:bg-neutral-800 shrink-0" />
            </div>

            <div className="space-y-2 mt-2">
              <div className="h-2 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-3 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>

            <div className="space-y-2 mt-2">
              <div className="h-2 w-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="flex">
                <div className="w-0.5 h-10 bg-neutral-200 dark:bg-neutral-800 mr-3" />
                <div className="flex-1 space-y-1.5 py-1">
                  <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
                  <div className="h-3 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
