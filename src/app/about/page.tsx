import { BookOpen, Heart, Music, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About | The Swift Dictionary",
  description:
    "Learn about The Swift Dictionary — a vocabulary explorer for Taylor Swift's lyrics.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
          About
        </h1>
        <div className="h-[2px] w-28 accent-gradient rounded-full opacity-80" />
      </div>

      {/* Intro */}
      <section className="prose prose-neutral dark:prose-invert max-w-none mb-12">
        <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
          <strong className="font-playfair text-neutral-900 dark:text-white">
            The Swift Dictionary
          </strong>{" "}
          is an interactive vocabulary explorer built around Taylor Swift&apos;s
          lyrics. We surface the sophisticated, poetic, and unexpected words
          woven into her songs — so fans can learn new vocabulary while
          appreciating the artistry behind every lyric.
        </p>
      </section>

      {/* Features grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
        {[
          {
            icon: BookOpen,
            title: "Dictionary",
            desc: "Browse, search, and filter vocabulary words extracted from every era.",
          },
          {
            icon: Music,
            title: "Explorer",
            desc: "Navigate by album and song to see lyrics alongside highlighted vocab.",
          },
          {
            icon: Sparkles,
            title: "Word of the Day",
            desc: "A new featured word every day at midnight EST to keep learning fresh.",
          },
          {
            icon: Heart,
            title: "Favorites",
            desc: "Sign in to bookmark words and build your personal vocabulary list.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur p-6"
          >
            <div className="w-10 h-10 rounded-xl grid place-items-center border border-neutral-200 dark:border-neutral-800 mb-4">
              <Icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
              {title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </section>

      {/* Disclaimer */}
      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur p-6 mb-14">
        <h2 className="font-playfair text-xl font-bold text-neutral-900 dark:text-white mb-3">
          Disclaimer
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The Swift Dictionary is a fan-made educational project and is not
          affiliated with, endorsed by, or officially connected to Taylor Swift
          or her management. All lyrics referenced belong to their respective
          copyright holders and are used here under fair-use for educational
          commentary.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/dictionary"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:shadow transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <BookOpen className="w-5 h-5" />
          Start Exploring
        </Link>
      </div>
    </div>
  );
}
