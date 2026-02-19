'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, ArrowLeft, User, LogOut, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { SearchResult } from '@/lib/types';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [afterThreshold, setAfterThreshold] = useState(false);
  const lastScrollYRef = useRef(0);
  const reachedThresholdRef = useRef(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auth state
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  // Debounced search
  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSearchResults(data.results ?? []);
      setShowResults(true);
    } catch {
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const last = lastScrollYRef.current;
      const threshold = Math.max(window.innerHeight * 0.5, 160);
      reachedThresholdRef.current = y > threshold;
      setAfterThreshold(reachedThresholdRef.current);

      if (!reachedThresholdRef.current) {
        // While within hero: keep header visible (pinned look)
        setIsVisible(true);
      } else {
        if (y < last - 4) {
          // Slight scroll up shows header
          setIsVisible(true);
        } else if (y > last + 4) {
          // Scroll down hides header
          setIsVisible(false);
        }
      }
      lastScrollYRef.current = y;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    // Compute initial state on mount
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isSearching) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isSearching]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearching && !(event.target as Element).closest('.search-container')) {
        setIsSearching(false);
      }
    };

    if (isSearching) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearching]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      setIsSearching(false);
      router.push(`/dictionary?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(value), 300);
  };

  return (
    <div className="pointer-events-none sticky top-9 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: isVisible ? 0 : -20, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className={`search-container mx-auto w-full max-w-2xl md:max-w-3xl lg:max-w-3xl h-14 flex items-center justify-between rounded-full border border-neutral-200 dark:border-neutral-800 backdrop-blur px-3 sm:px-4 relative overflow-hidden shadow-lg ${afterThreshold ? 'bg-neutral-900/15 dark:bg-neutral-900/60 shadow-neutral-900/10 dark:shadow-black/20' : 'bg-neutral-900/10 dark:bg-neutral-900/40 shadow-neutral-900/0'}`}
        >
          {/* Left: Logo only (no title) */}
          <Link href="/" className={`flex items-center space-x-3 ${isSearching ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 grid place-items-center">
              <span className="text-neutral-700 dark:text-neutral-200 text-lg">🎵</span>
            </div>
          </Link>

          {/* Center: Nav (hidden on small, hidden when searching) */}
          <nav className={`hidden md:flex items-center space-x-8 ${isSearching ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Link href="/" className="text-neutral-700 dark:text-neutral-300 hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <Link href="/dictionary" className="text-neutral-700 dark:text-neutral-300 hover:text-[var(--accent)] transition-colors">
              Dictionary
            </Link>
            <Link href="/explorer" className="text-neutral-700 dark:text-neutral-300 hover:text-[var(--accent)] transition-colors">
              Explorer
            </Link>
            <Link href="/about" className="text-neutral-700 dark:text-neutral-300 hover:text-[var(--accent)] transition-colors">
              About
            </Link>
          </nav>

          {/* Right: Icons */}
          <div className={`flex items-center space-x-1 ${isSearching ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <button
              onClick={() => { setIsSearching(true); setShowResults(false); }}
              aria-label="Search"
              className="p-2 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            {user ? (
              <>
                <Link
                  href="/favorites"
                  aria-label="Favorites"
                  className="hidden md:flex p-2 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label="Sign out"
                  className="hidden md:flex p-2 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* In-place Search Overlay occupying the header */}
          <AnimatePresence>
            {isSearching && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center"
              >
                <form onSubmit={handleSearchSubmit} className="w-full flex items-center gap-2 px-2 sm:px-3">
                  <button
                    type="button"
                    onClick={() => setIsSearching(false)}
                    className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    aria-label="Close search"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 w-4 h-4" />
              <input
                      ref={inputRef}
                type="text"
                placeholder="Search words or songs..."
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                      className="w-full h-10 pl-10 pr-4 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 focus:border-transparent text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
                  </div>
            </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {isSearching && showResults && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="mx-auto w-full max-w-2xl md:max-w-3xl lg:max-w-3xl mt-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur shadow-lg overflow-hidden"
            >
              {searchResults.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={result.href}
                  onClick={() => { setIsSearching(false); setShowResults(false); setSearchQuery(''); }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                >
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                    {result.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{result.title}</p>
                    <p className="text-xs text-neutral-500 truncate">{result.subtitle}</p>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation dropdown under the pill */}
        <AnimatePresence initial={false}>
          {isMenuOpen && !isSearching && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 py-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur"
            >
              <nav className="flex flex-col space-y-4 px-4">
                <Link href="/" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
                Home
              </Link>
                <Link href="/dictionary" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
                Dictionary
              </Link>
                <Link href="/explorer" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Explorer
              </Link>
                <Link href="/about" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
                About
              </Link>
                <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
                {user ? (
                  <>
                    <Link href="/favorites" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2">
                      <Heart className="w-4 h-4" /> Favorites
                    </Link>
                    <button onClick={handleLogout} className="text-left text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/auth/login" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2">
                    <User className="w-4 h-4" /> Sign In
                  </Link>
                )}
            </nav>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
      </div>
  );
}

