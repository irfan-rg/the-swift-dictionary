export default function PrivacyLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-pulse">
      <div className="h-8 bg-[var(--border)] rounded w-56 mb-6" />
      <div className="h-3 bg-[var(--border)] rounded w-40 mb-12 opacity-60" />
      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="h-5 bg-[var(--border)] rounded w-48 mb-3" />
            <div className="space-y-2">
              <div className="h-3 bg-[var(--border)] rounded w-full opacity-50" />
              <div className="h-3 bg-[var(--border)] rounded w-[90%] opacity-50" />
              <div className="h-3 bg-[var(--border)] rounded w-[75%] opacity-50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
