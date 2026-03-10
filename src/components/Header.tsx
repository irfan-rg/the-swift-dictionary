'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, ArrowLeft, User, LogOut, Heart, Sun, MoonStar } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { useTheme } from 'next-themes';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { SearchResult } from '@/lib/types';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.refresh();
  };

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim() || q.trim().length < 2) { setSearchResults([]); setShowResults(false); return; }
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSearchResults(data.results ?? []);
      setShowResults(true);
    } catch { setSearchResults([]); }
  }, []);

  useEffect(() => {
    if (isSearching) {
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [isSearching]);

  // Close search on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearching) {
        setIsSearching(false);
        setSearchQuery('');
        setShowResults(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
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
    debounceRef.current = setTimeout(() => doSearch(value), 250);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dictionary', label: 'Dictionary' },
    { href: '/explorer', label: 'The Eras' },
    { href: '/about', label: 'About' },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled || isSearching || isMenuOpen ? 'px-4 sm:px-6 py-4' : 'px-0 py-0'
      }`}>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: scrolled || isSearching || isMenuOpen ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: scrolled || isSearching || isMenuOpen ? 'blur(12px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled || isSearching || isMenuOpen ? 'blur(12px)' : 'blur(0px)',
          transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`pointer-events-auto border ${scrolled || isSearching || isMenuOpen
          ? 'shadow-md rounded-full w-full max-w-3xl border-[var(--border)]'
          : 'shadow-none w-full max-w-7xl rounded-none border-transparent'
          }`}
      >
        <div className={`relative transition-all duration-700  flex items-center h-14 w-full ${scrolled || isSearching || isMenuOpen ? 'px-5 sm:px-6' : 'px-6 sm:px-8 lg:px-12'}`}>
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div
                key="search-mode"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex items-center w-full"
              >
                <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-3 w-full">
                  <button type="button" onClick={() => { setIsSearching(false); setSearchQuery(''); }} className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">
                    <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for a lyric, word, or era..."
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    className="flex-1 bg-transparent font-body text-sm sm:text-base outline-none text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] placeholder:font-light"
                  />
                  <div className="hidden sm:flex items-center text-[var(--foreground-muted)] opacity-50 space-x-1">
                    <kbd className="font-sans text-[10px] border border-[var(--border)] rounded px-1.5 py-0.5">ESC</kbd>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="nav-mode"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 items-center w-full relative"
              >
                {/* Logo */}
                <Link href="/" className="shrink-0 flex items-center gap-2">
                  <span className="font-branding font-semibold text-2xl tracking-wide text-[var(--accent)]">
                    TSD
                  </span>
                </Link>

                {/* Desktop Nav — absolutely centered in the bar */}
                <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
                  {navLinks.map(({ href, label }) => (
                    <Link key={href} href={href} className="font-body text-sm font-medium tracking-wide text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors relative group">
                      {label}
                      <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-[var(--accent)] group-hover:w-full group-hover:transition-all group-hover:left-0 duration-300" />
                    </Link>
                  ))}
                </nav>

                {/* Right Controls */}
                <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="p-2 rounded-full text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-raised)] transition-all"
                      aria-label="Toggle theme"
                    >
                      {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" strokeWidth={1.5} /> : <MoonStar className="w-[18px] h-[18px]" strokeWidth={1.5} />}
                    </button>
                  )}

                  <button
                    onClick={() => { setIsSearching(true); setShowResults(false); }}
                    className="p-2 rounded-full text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-raised)] transition-all"
                    aria-label="Search"
                  >
                    <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </button>

                  {user ? (
                    <>
                      <Link href="/favorites" className="hidden sm:flex p-2 rounded-full text-[var(--foreground-muted)] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all">
                        <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                      </Link>
                      <button onClick={handleLogout} className="hidden sm:flex p-2 rounded-full text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-raised)] transition-all">
                        <LogOut className="w-[18px] h-[18px]" strokeWidth={1.5} />
                      </button>
                    </>
                  ) : scrolled ? (
                    <Link href="/auth/login" className="hidden sm:flex p-2 rounded-full text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-raised)] transition-all" aria-label="Login">
                      <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </Link>
                  ) : (
                    <Link href="/auth/login" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] font-body text-xs font-medium tracking-wide text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-all">
                      <User className="w-[14px] h-[14px]" /> Login
                    </Link>
                  )}

                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-full text-[var(--foreground)]">
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && !isSearching && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[var(--border)] overflow-hidden"
            >
              <nav className="flex flex-col p-6 gap-5">
                {navLinks.map(({ href, label }) => (
                  <Link key={href} href={href} onClick={() => setIsMenuOpen(false)} className="font-display italic text-2xl text-[var(--foreground)]">
                    {label}
                  </Link>
                ))}
                <div className="h-px bg-[var(--border)] my-1" />
                {user ? (
                  <>
                    <Link href="/favorites" onClick={() => setIsMenuOpen(false)} className="font-body text-sm font-medium flex items-center gap-3 text-[var(--foreground-muted)]">
                      <Heart className="w-[18px] h-[18px]" /> Favorites
                    </Link>
                    <button onClick={handleLogout} className="font-body text-sm font-medium flex items-center gap-3 text-[var(--foreground-muted)]">
                      <LogOut className="w-[18px] h-[18px]" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="font-body text-sm font-medium flex items-center gap-3 text-[var(--foreground-muted)]">
                    <User className="w-[18px] h-[18px]" /> Login / Register
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating Search Results */}
      <AnimatePresence>
        {isSearching && showResults && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 sm:left-auto sm:right-auto sm:w-[32rem] glass-panel rounded-sm overflow-hidden z-40"
          >
            {searchResults.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={result.href}
                onClick={() => { setIsSearching(false); setShowResults(false); setSearchQuery(''); }}
                className="flex items-center gap-4 p-4 hover:bg-[var(--surface-raised)] transition-colors border-b border-[var(--border)] last:border-b-0"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--surface-raised)] flex items-center justify-center border border-[var(--border)] shrink-0">
                  <span className="font-body text-[10px] uppercase font-semibold text-[var(--accent)]">
                    {result.type[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-medium text-lg leading-snug truncate text-[var(--foreground)]">{result.title}</p>
                  <p className="font-body text-xs text-[var(--foreground-muted)] truncate">{result.subtitle}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
