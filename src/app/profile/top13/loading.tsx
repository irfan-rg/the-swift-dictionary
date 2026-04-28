export default function Top13Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 animate-pulse">
      {/* Back link — matches real: inline-flex items-center gap-2 mb-12 */}
      <div className="inline-flex items-center gap-2 mb-12 select-none text-transparent">
        <div className="w-3 h-3 bg-[var(--border)] rounded" />
        <div className="h-3 bg-[var(--border)] rounded w-28" />
      </div>

      {/* Top13Composer real structure: space-y-10 */}
      <div className="w-full space-y-10">

        {/* Header flex row: title block (left) + selection counter (right) */}
        <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded block mb-3 w-fit select-none">
              Curate
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded w-fit mb-3 select-none">
              Download Your Top 13
            </h3>
            <p className="font-body text-sm md:text-base text-transparent select-none">
              <span className="bg-[var(--border)] rounded">Pick up to 13 favorite words</span>{" "}
              <span className="bg-[var(--border)] rounded">to generate your shareable card.</span>
            </p>
          </div>
          {/* Selection counter: italic number + label */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="block font-display italic text-2xl text-transparent bg-[var(--border)] rounded w-8 leading-none mb-1 select-none">0</span>
              <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded w-fit select-none">
                of 13 Selected
              </span>
            </div>
          </div>
        </div>

        {/* Bordered composer box — p-6 md:p-8 border bg-[var(--surface)] */}
        <div className="w-full p-6 md:p-8 border border-[var(--border)] bg-[var(--surface)]">
          {/* Search input + action buttons row */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search input — border-b only, like real */}
            <div className="w-full md:flex-1 h-10 border-b border-[var(--border)] bg-transparent opacity-60" />
            {/* "Use Recent 13" + "Clear" buttons */}
            <div className="flex gap-3 shrink-0 items-end">
              <div className="h-9 w-28 border border-[var(--border)] bg-[var(--surface-raised)] opacity-50" />
              <div className="h-9 w-14 border border-transparent bg-transparent opacity-40" />
            </div>
          </div>

          {/* Dashed header bar: "Saved Words (N) | Page X of Y" */}
          <div className="flex justify-between items-center border-b border-dashed border-[var(--border-focus)] pb-3 mb-6 opacity-40">
            <div className="h-3 bg-[var(--border)] rounded w-32" />
            <div className="h-3 bg-[var(--border)] rounded w-20" />
          </div>

          {/* Word list grid — grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 */}
          {/* Each item: bottom-bordered row with word (font-display text-xl) + song (text-[10px] uppercase) + radio circle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="py-2 border-b border-[var(--border)] flex items-center justify-between"
              >
                <div className="flex-1 min-w-0 pr-4">
                  {/* Word — font-display text-xl */}
                  <div className="h-5 bg-[var(--border)] rounded w-24 mb-1.5 opacity-80" />
                  {/* Song — text-[10px] uppercase */}
                  <div className="h-2.5 bg-[var(--border)] rounded w-16 opacity-40" />
                </div>
                {/* Radio circle — w-5 h-5 border rounded-full */}
                <div className="shrink-0 w-5 h-5 border border-[var(--border)] rounded-full opacity-40" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
