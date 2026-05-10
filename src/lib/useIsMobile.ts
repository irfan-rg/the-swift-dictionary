'use client';

import { useState, useEffect } from 'react';

/**
 * Lightweight hook that returns `true` on mobile-width viewports (≤ 768px).
 * Also respects the OS-level `prefers-reduced-motion` setting.
 *
 * Used to conditionally simplify heavy Framer Motion animations on phones
 * without touching the desktop experience.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Returns true when animations should be simplified —
 * either on mobile viewports or when the user prefers reduced motion.
 */
export function useLiteAnimations(breakpoint = 768): boolean {
  const isMobile = useIsMobile(breakpoint);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile || prefersReduced;
}
