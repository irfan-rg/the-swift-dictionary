export default function AboutLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded block mb-3 mx-auto w-max select-none">
          Est. 2025
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded mb-6 mx-auto w-max select-none">
          The Swift Dictionary
        </h1>
        <div className="space-y-2 max-w-xl mx-auto">
          <p className="font-body text-base text-transparent bg-[var(--border)] rounded select-none">
            An interactive vocabulary explorer built around the words
          </p>
          <p className="font-body text-base text-transparent bg-[var(--border)] rounded select-none mx-auto w-3/4">
            Taylor Swift weaves into her songs.
          </p>
        </div>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-10 opacity-30" />
      </section>

      {/* The Story */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16">
        <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded block mb-3 w-max select-none">
          The Idea
        </span>
        <h2 className="font-display text-3xl font-medium text-transparent bg-[var(--border)] rounded mb-6 w-max select-none">
          Why This Exists
        </h2>
        <div className="space-y-3">
          {[100, 90, 80].map((w, i) => (
            <div key={i} className={`h-4 bg-[var(--border)] rounded`} style={{ width: `${w}%` }} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--border)]">
        <span className="font-body text-[10px] tracking-widest uppercase text-transparent bg-[var(--border)] rounded block mb-3 w-max select-none">
          Features
        </span>
        <h2 className="font-display text-3xl font-medium text-transparent bg-[var(--border)] rounded mb-8 w-max select-none">
          What You Can Do
        </h2>
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-b border-[var(--border)] pb-6">
              <div className="h-5 bg-[var(--border)] rounded w-40 mb-2" />
              <div className="h-3 bg-[var(--border)] rounded w-full opacity-60" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
