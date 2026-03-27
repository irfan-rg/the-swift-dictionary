export default function ProfileLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-20 md:space-y-28 animate-pulse">

      {/* 1. Identity Header — exact same flex structure as real page */}
      <header className="flex flex-col gap-12 border-b border-[var(--border-focus)] pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
        <div className="max-w-2xl">
          {/* "CURATOR IDENTITY" */}
          <span className="mb-10 block font-body text-[10px] tracking-[0.28em] uppercase text-transparent bg-[var(--border)] rounded w-fit select-none">
            Curator Identity
          </span>
          {/* "Oh, hi." */}
          <div className="mb-4 font-handwriting text-[1.75rem] leading-none text-transparent bg-[var(--border)] rounded w-fit select-none md:text-[2rem]">
            Oh, hi.
          </div>
          {/* Big name */}
          <div className="font-display text-5xl md:text-6xl font-medium tracking-tight text-transparent bg-[var(--border)] rounded w-fit select-none mb-4">
            Irfan
          </div>
          {/* Email */}
          <div className="font-body text-xs tracking-[0.08em] text-transparent bg-[var(--border)] rounded w-fit select-none md:text-sm">
            user@example.com
          </div>
        </div>

        {/* Stats block — right side */}
        <div className="shrink-0 border-l border-[var(--border)] pl-8 md:pl-10">
          <div className="flex gap-10 md:gap-16">
            <div className="flex flex-col">
              <span className="mb-2 font-body text-[10px] tracking-[0.2em] uppercase text-transparent bg-[var(--border)] rounded w-fit select-none">
                Member Since
              </span>
              <span className="font-display text-[1.9rem] leading-none text-transparent bg-[var(--border)] rounded w-fit select-none">
                Mar 2026
              </span>
            </div>
            <div className="flex flex-col">
              <span className="mb-2 font-body text-[10px] tracking-[0.2em] uppercase text-transparent bg-[var(--border)] rounded w-fit select-none">
                Kept Words
              </span>
              <span className="font-display text-[1.9rem] leading-none text-transparent bg-[var(--border)] rounded w-fit select-none">
                —
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Aesthetic Chronology */}
      <section className="space-y-12">
        <div className="flex flex-col justify-between gap-6 px-2 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="mb-4 -mt-14 font-display text-4xl leading-[0.95] tracking-tight text-transparent bg-[var(--border)] rounded w-fit select-none md:text-5xl">
              Aesthetic Chronology
            </h2>
            <p className="font-body text-[0.95rem] leading-[1.55] text-transparent select-none">
              <span className="bg-[var(--border)] rounded">Select an era to establish your visual identity,</span>{" "}
              <span className="bg-[var(--border)] rounded">or allow your saved words to naturally dictate</span>{" "}
              <span className="bg-[var(--border)] rounded">your current alignment.</span>
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="mb-2 block font-body text-[10px] tracking-[0.2em] uppercase text-transparent bg-[var(--border)] rounded w-fit md:ml-auto select-none">
              Current Alignment
            </span>
            <span className="font-display text-[2.05rem] leading-none text-transparent bg-[var(--border)] rounded w-fit select-none md:text-[2.3rem]">
              The Tortured Poets
            </span>
          </div>
        </div>
        {/* Era selector component placeholder */}
        <div className="w-full h-32 bg-[var(--surface-raised)] border border-[var(--border)] rounded-sm" />
      </section>

      {/* 3. Interactive Experiences */}
      <section className="pt-20 border-t border-[var(--border)]">
        <header className="mb-12 md:mb-16">
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-transparent bg-[var(--border)] rounded w-fit block mb-4 select-none">
            Your Studio
          </span>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight text-transparent bg-[var(--border)] rounded w-fit select-none">
            Interactive Experiences
          </h2>
          <p className="font-body text-base text-transparent leading-relaxed mx-auto ml-0 mt-6 select-none max-w-xl">
            <span className="bg-[var(--border)] rounded">Extend the narrative of the pieces you've curated</span>{" "}
            <span className="bg-[var(--border)] rounded">into something tangibly yours.</span>
          </p>
        </header>

        {/* Two tall bordered cards — exact same min-h and padding as real */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Top 13 card */}
          <div className="flex flex-col justify-between p-8 md:p-10 border border-[var(--border)] min-h-[320px]">
            <div>
              <div className="font-display text-4xl text-transparent bg-[var(--border)] rounded w-fit mb-8 select-none">
                13
              </div>
              <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-transparent bg-[var(--border)] rounded w-fit mb-4 select-none">
                Your Top 13
              </h3>
              <p className="font-display text-2xl text-transparent leading-snug select-none">
                <span className="bg-[var(--border)] rounded">Curate a definitive list of</span>{" "}
                <span className="bg-[var(--border)] rounded">your favorite pieces.</span>
              </p>
            </div>
            <div className="mt-12 font-body text-[10px] tracking-[0.2em] uppercase text-transparent bg-[var(--border)] rounded w-fit select-none">
              Open Composer →
            </div>
          </div>

          {/* Bracelets card */}
          <div className="flex flex-col justify-between p-8 md:p-10 border border-[var(--border)] min-h-[320px]">
            <div>
              <div className="flex gap-2 mb-8 items-center h-10">
                {["T", "S"].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border border-[var(--border-focus)] bg-[var(--border)] opacity-60" />
                ))}
                <div className="w-8 h-px bg-[var(--border-focus)]" />
              </div>
              <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-transparent bg-[var(--border)] rounded w-fit mb-4 select-none">
                Friendship Bracelets
              </h3>
              <p className="font-display text-2xl text-transparent leading-snug select-none">
                <span className="bg-[var(--border)] rounded">String together virtual beads</span>{" "}
                <span className="bg-[var(--border)] rounded">for your eras and moments.</span>
              </p>
            </div>
            <div className="mt-12 font-body text-[10px] tracking-[0.2em] uppercase text-transparent bg-[var(--border)] rounded w-fit select-none">
              Open Builder →
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
