export default function BraceletsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 animate-pulse">
      {/* Back link */}
      <div className="h-3 bg-[var(--border)] rounded w-28 mb-12" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="h-3 bg-[var(--border)] rounded w-32 mb-4" />
          <div className="h-10 bg-[var(--border)] rounded w-64 mb-3" />
          <div className="h-3 bg-[var(--border)] rounded w-96 opacity-60" />
        </div>

        {/* Bracelet preview row */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-[var(--border)]"
            />
          ))}
          <div className="w-10 h-[1px] bg-[var(--border)] self-center" />
        </div>

        {/* Input area */}
        <div className="border border-[var(--border)] bg-[var(--surface-raised)] rounded-sm p-6 mb-6">
          <div className="h-3 bg-[var(--border)] rounded w-24 mb-4" />
          <div className="h-10 bg-[var(--border)] rounded w-full mb-3" />
          <div className="h-10 bg-[var(--border)] rounded w-36 opacity-50" />
        </div>

        {/* Bead shelf */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-10 bg-[var(--border)] rounded-sm opacity-40" />
          ))}
        </div>
      </div>
    </div>
  );
}
