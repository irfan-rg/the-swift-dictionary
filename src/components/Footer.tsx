import Link from 'next/link';
import { ERAS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="mt-20 pt-16 pb-8 border-t border-[var(--border)] bg-transparent relative overflow-hidden">

      {/* Background glow base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[var(--accent)] opacity-5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* Ornate Dictionary Title */}
        <div className="text-center mb-12">
          <h2 className="font-branding text-4xl sm:text-5xl lg:text-6xl font-medium tracking-wide text-[var(--foreground)] mb-4">
            The Swift Dictionary
          </h2>
          <p className="font-handwriting text-xl sm:text-2xl text-[var(--foreground-muted)] opacity-80">
            A curated scrapbook of every lyric & lore...
          </p>
        </div>

        {/* Elegant Links Grid */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16 px-4">

          <div className="flex flex-col gap-4 items-center">
            <h3 className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] font-semibold mb-2">Volumes</h3>
            <Link href="/" className="font-body text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">Home Page</Link>
            <Link href="/dictionary" className="font-body text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">The Full Index</Link>
            <Link href="/explorer" className="font-body text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">Era Explorer</Link>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <h3 className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] font-semibold mb-2">Featured Eras</h3>
            {ERAS.slice(0, 3).map(era => (
              <Link key={era.slug} href={`/explorer/${era.slug}`} className="font-body text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">
                {era.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4 items-center">
            <h3 className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] font-semibold mb-2">The Project</h3>
            <Link href="/about" className="font-body text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">About Us</Link>
            <Link href="/contribute" className="font-body text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">Contribute</Link>
            <a href="https://www.instagram.com/the.swift.dictionary/" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">Instagram</a>
          </div>

        </div>

        {/* End Mark & Copyright */}
        <div className="w-full flex flex-col items-center pt-8 border-t border-[var(--border)] border-opacity-50 text-center">
          <p className="font-body text-[10px] tracking-wider uppercase text-[var(--foreground-muted)] opacity-60 leading-relaxed max-w-md">
            Built for the fandom. <br />
            Not affiliated with, endorsed by, or sponsored by Taylor Swift or TAS Rights Management.
          </p>
        </div>

      </div>
    </footer>
  );
}
