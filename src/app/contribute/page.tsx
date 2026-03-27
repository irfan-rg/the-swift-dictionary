import Link from "next/link";

export const metadata = {
  title: "Contribute",
  description: "Help grow The Swift Dictionary — contribute words, report issues, or suggest features for Taylor Swift's lyrics.",
  keywords: ["contribute to The Swift Dictionary", "suggest Taylor Swift words", "Swiftie community"],
};

export default function ContributePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
          Join the Effort
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-[var(--foreground)] mb-6">
          Contribute
        </h1>
        <p className="font-body text-base md:text-lg text-[var(--foreground-muted)] max-w-xl mx-auto leading-relaxed">
          The Swift Dictionary is a community-driven project. There are many
          ways to help it grow.
        </p>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-10 opacity-50" />
      </section>

      {/* Ways to Contribute */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
          How to Help
        </span>
        <h2 className="font-display text-3xl font-medium text-[var(--foreground)] mb-8">
          Ways to Contribute
        </h2>
        <dl className="space-y-6">
          {[
            {
              term: "Suggest Missing Words",
              detail:
                "Spotted a word in Taylor&apos;s lyrics that should be in our dictionary? Let us know the word, the song it appears in, and why you think it belongs.",
            },
            {
              term: "Improve Definitions",
              detail:
                "Some definitions could be sharper, more nuanced, or better connected to the lyrical context. Help us refine the glossary.",
            },
            {
              term: "Report Issues",
              detail:
                "Found a typo, a misattributed lyric, or a broken page? Report it so we can fix it quickly.",
            },
            {
              term: "Spread the Word",
              detail:
                "Share The Swift Dictionary with fellow Swifties, language learners, and anyone who appreciates the intersection of music and vocabulary.",
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

      {/* Get in Touch */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--border)]">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
          Get in Touch
        </span>
        <h2 className="font-display text-3xl font-medium text-[var(--foreground)] mb-4">
          Reach Out
        </h2>
        <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed mb-8">
          The best way to contribute is through our GitHub repository. Open an
          issue, submit a pull request, or start a discussion. All contributions
          are welcome, no matter how small.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://www.instagram.com/the.swift.dictionary/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-sm font-body text-sm tracking-widest uppercase text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors text-center"
          >
            Follow on Instagram
          </a>
          <Link
            href="/about"
            className="inline-block px-8 py-3 rounded-sm font-body text-sm tracking-widest uppercase border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] transition-colors text-center"
          >
            About the Project
          </Link>
        </div>
      </section>

      {/* Note */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--border)]">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
          Guidelines
        </span>
        <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed">
          Please keep contributions respectful and on-topic. This is an
          educational project celebrating Taylor Swift&apos;s artistry through
          language. We welcome constructive feedback, corrections, and new
          vocabulary suggestions that maintain the quality and intent of the
          dictionary.
        </p>
      </section>
    </div>
  );
}
