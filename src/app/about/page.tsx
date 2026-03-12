import Link from "next/link";

export const metadata = {
  title: "About | The Swift Dictionary",
  description:
    "Learn about The Swift Dictionary — a vocabulary explorer for Taylor Swift's lyrics.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
          Est. 2025
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-[var(--foreground)] mb-6">
          The Swift Dictionary
        </h1>
        <p className="font-body text-base md:text-lg text-[var(--foreground-muted)] max-w-xl mx-auto leading-relaxed">
          An interactive vocabulary explorer built around the words
          Taylor Swift weaves into her songs.
        </p>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-10 opacity-50" />
      </section>

      {/* The Story */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 ">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
          The Idea
        </span>
        <h2 className="font-display text-3xl font-medium text-[var(--foreground)] mb-6">
          Why This Exists
        </h2>
        <div className="font-body text-sm text-[var(--foreground-muted)] leading-[1.9] space-y-4">
          <p>
            Taylor Swift&apos;s songwriting is remarkable not just for its emotional depth,
            but for its vocabulary. Words like <em>iridescent</em>, <em>clandestine</em>,
            and <em>harbored</em> appear naturally in her lyrics, often carrying layers
            of meaning that reward closer reading.
          </p>
          <p>
            The Swift Dictionary was built to surface those words. Every album, every
            song, every era holds vocabulary worth exploring. We extract, define, and
            contextualize the words that make her writing distinctive, turning lyrics
            into a living glossary.
          </p>
          <p>
            Whether you&apos;re a language learner, a curious Swiftie, or someone who
            simply appreciates the craft of songwriting, this project is for you.
          </p>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--border)]">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
          Features
        </span>
        <h2 className="font-display text-3xl font-medium text-[var(--foreground)] mb-8">
          What You Can Do
        </h2>
        <dl className="space-y-6">
          {[
            {
              term: "Browse the Dictionary",
              detail: "Search, filter by era or difficulty, and discover vocabulary extracted from every album.",
            },
            {
              term: "Explore by Album and Song",
              detail: "Navigate through all twelve eras. Read lyrics side-by-side with highlighted vocabulary words.",
            },
            {
              term: "Word of the Day",
              detail: "A new featured word every day at midnight EST. A small daily habit that compounds over time.",
            },
            {
              term: "Save Favorites",
              detail: "Sign in to bookmark words and build your own personal vocabulary collection.",
            },
          ].map(({ term, detail }) => (
            <div key={term} className="border-b border-[var(--border)] pb-6">
              <dt className="font-display text-lg font-medium text-[var(--foreground)] mb-1">
                {term}
              </dt>
              <dd className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed">
                {detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Disclaimer */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--border)]">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
          Note
        </span>
        <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed">
          The Swift Dictionary is a fan-made educational project. It is not
          affiliated with, endorsed by, or officially connected to Taylor Swift
          or her management. All lyrics referenced belong to their respective
          copyright holders and are used under fair-use for educational commentary.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="font-body text-sm text-[var(--foreground-muted)] mb-6">
          ... Ready For It?
        </p>
        <Link
          href="/dictionary"
          className="inline-block px-8 py-3 rounded-sm font-body text-sm tracking-widest uppercase text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors"
        >
          Open the Dictionary
        </Link>
      </section>
    </div>
  );
}
