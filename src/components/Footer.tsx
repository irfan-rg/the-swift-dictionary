import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Brand */}
          <Link href="/" className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 grid place-items-center">
              <span className="text-neutral-700 dark:text-neutral-200 text-lg">🎵</span>
            </div>
            <span className="font-playfair text-xl font-bold text-neutral-900 dark:text-neutral-100">
              The Swift Dictionary
            </span>
          </Link>
          
          {/* Tagline */}
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
            Every Word has a Meaning and Every Lyric tells a Story.
          </p>
          
          {/* Key Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <Link href="/dictionary" className="text-neutral-600 dark:text-neutral-400 hover:text-[var(--accent)] transition-colors">
              Dictionary
            </Link>
            <Link href="/explorer" className="text-neutral-600 dark:text-neutral-400 hover:text-[var(--accent)] transition-colors">
              Explorer
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Made with <Heart className="inline w-4 h-4" style={{ color: 'var(--accent)' }} /> by Swifties, for Swifties
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-2">
              © {new Date().getFullYear()} The Swift Dictionary.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

