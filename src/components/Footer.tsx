import Link from 'next/link';
import { Heart, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 grid place-items-center shadow-sm">
                <span className="text-neutral-700 dark:text-neutral-200 text-lg">🎵</span>
              </div>
              <span className="font-playfair text-xl font-bold text-neutral-900 dark:text-neutral-100">
                The Swift Dictionary
              </span>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
              Discover Taylor Swift's sophisticated vocabulary through her lyrics. 
              A fan-made educational project celebrating the artistry of her words.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dictionary" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  Word Dictionary
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  Song Explorer
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Albums */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Albums</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explorer?album=folklore" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  Folklore
                </Link>
              </li>
              <li>
                <Link href="/explorer?album=evermore" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  Evermore
                </Link>
              </li>
              <li>
                <Link href="/explorer?album=midnights" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  Midnights
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                  View All
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top mt-8 pt-8 flex flex-col md:flex-row justify-between items-center border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Made with <Heart className="inline w-4 h-4 text-violet-500" /> by Swifties, for Swifties
          </p>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-2 md:mt-0">
            © 2024 The Swift Dictionary. Fan-made project, not affiliated with Taylor Swift.
          </p>
        </div>
      </div>
    </footer>
  );
}

