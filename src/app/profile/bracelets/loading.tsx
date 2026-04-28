export default function BraceletsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 animate-pulse">
      {/* Back link — matches real: inline-flex items-center gap-2 */}
      <div className="inline-flex items-center gap-2 mb-12 select-none text-transparent">
        <div className="w-3 h-3 bg-[var(--border)] rounded" />
        <div className="h-3 bg-[var(--border)] rounded w-28" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header — matches BraceletBuilder: span + h3 + p */}
        <div className="space-y-8">
          <div>
            <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded block mb-3 w-fit select-none">
              Create
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded w-fit mb-3 select-none">
              Bracelet Builder
            </h3>
            <p className="font-body text-sm md:text-base text-transparent select-none">
              <span className="bg-[var(--border)] rounded">String together up to 24 beads to capture</span>{" "}
              <span className="bg-[var(--border)] rounded">a moment, a lyric, or a feeling.</span>
            </p>
          </div>

          {/* Bead Preview Row — matches real: dashed line + flex-wrap bead spans */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 w-full h-px border-t-2 border-dashed border-[var(--border)] opacity-50 -z-10" />
            <div className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded w-fit mb-4 inline-block select-none">
              Preview (0/24)
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] opacity-40"
                />
              ))}
            </div>
          </div>

          {/* Palette Section — matches real: label + flex flex-wrap gap-3 of 10 circular buttons */}
          <div className="space-y-4">
            <div className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded w-fit pb-2 border-b border-[var(--border)] select-none">
              Palette
            </div>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface)] opacity-50"
                />
              ))}
            </div>
          </div>

          {/* Custom Input Row — matches real: flex flex-col sm:flex-row gap-3 */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Custom text input (bottom-border only) */}
            <div className="w-full sm:w-32 h-10 border-b-2 border-[var(--border)] bg-transparent opacity-60" />
            {/* "Add Bead" button */}
            <div className="h-10 w-24 border border-[var(--border)] bg-[var(--surface-raised)] rounded-sm opacity-50" />
          </div>

          {/* Save Button Row — matches real: pt-8 border-t + sm:ml-auto button */}
          <div className="pt-8 border-t border-[var(--border)] flex justify-end">
            <div className="h-11 w-36 border border-[var(--border)] bg-[var(--surface-raised)] opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
