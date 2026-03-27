export default function Top13Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 animate-pulse">
      {/* Back link */}
      <div className="h-3 bg-[var(--border)] rounded w-28 mb-12" />

      {/* Header */}
      <div className="mb-10">
        <div className="h-3 bg-[var(--border)] rounded w-24 mb-4" />
        <div className="h-10 bg-[var(--border)] rounded w-56 mb-3" />
        <div className="h-3 bg-[var(--border)] rounded w-80 opacity-60" />
      </div>

      {/* Word grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="border border-[var(--border)] bg-[var(--surface-raised)] rounded-sm p-4 flex items-center gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--border)] shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[var(--border)] rounded w-24" />
              <div className="h-2 bg-[var(--border)] rounded w-16 opacity-60" />
            </div>
          </div>
        ))}
      </div>

      {/* Action button */}
      <div className="h-11 bg-[var(--border)] rounded-sm w-48 opacity-50" />
    </div>
  );
}
