export default function FavoritesLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">

      {/* Header — exact same structure as real page */}
      <div className="mb-12 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded select-none">
          Your Collection
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded mb-4 mt-2 mx-auto w-fit select-none">
          Favorites
        </h1>
        <p className="font-body text-sm text-transparent bg-[var(--border)] rounded w-fit mx-auto select-none">
          — saved words
        </p>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-6 opacity-30" />
      </div>

      {/* Exact same grid as real page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-5 flex flex-col gap-3"
          >
            {/* Exact same top row structure: word+song | heart */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-medium text-transparent bg-[var(--border)] rounded select-none">
                  {i % 2 === 0 ? "Vocabulary" : "Iridescent"}
                </h3>
                <p className="font-body text-xs font-medium mt-1 text-transparent bg-[var(--border)] rounded select-none">
                  Song Title Here
                </p>
              </div>
              <div className="w-5 h-5 bg-[var(--border)] rounded-sm shrink-0 opacity-60" />
            </div>

            {/* Definition — same text-sm leading-relaxed line-clamp-2 */}
            <p className="font-body text-sm text-transparent leading-relaxed select-none">
              <span className="bg-[var(--border)] rounded">A definition that wraps naturally across</span>{" "}
              <span className="bg-[var(--border)] rounded">exactly the same two lines of text.</span>
            </p>

            {/* "View in song →" */}
            <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded w-fit select-none">
              View in Song →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
