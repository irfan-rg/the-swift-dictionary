"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ERAS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import type { EraSlug } from "@/lib/types";

interface EraSelectorProps {
  userId: string;
  initialEra: EraSlug | null;
  calculatedEra: EraSlug | null;
}

export default function EraSelector({ userId, initialEra, calculatedEra }: EraSelectorProps) {
  const [currentEra, setCurrentEra] = useState<EraSlug | null>(initialEra);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const calculatedEraInfo = calculatedEra ? ERAS.find((era) => era.slug === calculatedEra) : null;
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialCenterRef = useRef(false);
  const didDragRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    setCurrentEra(initialEra);
  }, [initialEra]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft: currentLeft, scrollWidth, clientWidth } = scrollRef.current;
    const nextMaxScroll = Math.max(scrollWidth - clientWidth, 0);
    setMaxScroll(nextMaxScroll);
    setScrollProgress(nextMaxScroll > 0 ? currentLeft / nextMaxScroll : 0);
  };

  const centerEraCard = (slug: string, behavior: ScrollBehavior) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const card = container.querySelector<HTMLElement>(`[data-era-slug="${slug}"]`);
    if (!card) return;

    const max = Math.max(container.scrollWidth - container.clientWidth, 0);
    const target = Math.min(
      max,
      Math.max(0, card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2)
    );

    container.scrollTo({ left: target, behavior });
  };

  useEffect(() => {
    const syncScrollMetrics = () => {
      if (!scrollRef.current) return;

      const { scrollLeft: currentLeft, scrollWidth, clientWidth } = scrollRef.current;
      const nextMaxScroll = Math.max(scrollWidth - clientWidth, 0);
      setMaxScroll(nextMaxScroll);
      setScrollProgress(nextMaxScroll > 0 ? currentLeft / nextMaxScroll : 0);
    };

    syncScrollMetrics();
    window.addEventListener("resize", syncScrollMetrics);
    return () => window.removeEventListener("resize", syncScrollMetrics);
  }, []);

  useEffect(() => {
    if (hasInitialCenterRef.current) return;

    const targetSlug = currentEra ?? calculatedEra ?? ERAS[Math.floor(ERAS.length / 2)]?.slug;
    if (!targetSlug) return;

    const rafId = window.requestAnimationFrame(() => {
      centerEraCard(targetSlug, "auto");
      hasInitialCenterRef.current = true;
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [currentEra, calculatedEra, maxScroll]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    didDragRef.current = false;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 3) {
      didDragRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!scrollRef.current || maxScroll <= 0) return;
    const nextProgress = Number(e.target.value) / 100;
    scrollRef.current.scrollLeft = nextProgress * maxScroll;
    setScrollProgress(nextProgress);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // If primarily scrolling vertically, translate it to horizontal movement
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleSelect = async (slug: EraSlug | null) => {
    // Prevent accidental selection while dragging across cards.
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    if (slug === currentEra) return;

    setIsLoading(true);
    setCurrentEra(slug);
    
    // Optimistic UI update, database request in background
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ declared_era: slug })
      .eq("id", userId);

    if (!error) {
      router.refresh();
    } else {
      console.error("Error updating era:", error);
      setCurrentEra(initialEra);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative space-y-5">
      <div className="border border-[var(--border)] bg-[var(--background)] px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <span className="font-body text-[10px] tracking-[0.24em] uppercase text-[var(--foreground-muted)]">
              Era Mode
            </span>
            <p className="max-w-[52ch] font-body text-[0.95rem] leading-[1.55] text-[var(--foreground-muted)]">
              {currentEra === null
                ? `Auto is active${calculatedEraInfo ? `, currently deriving ${calculatedEraInfo.label}.` : "."}`
                : "Manual override is active. You can switch back to calculated at any time."}
            </p>
          </div>

          {currentEra === null ? (
            <span className="inline-flex items-center gap-2 self-start border border-[var(--border)] px-3 py-1.5 font-body text-[10px] tracking-[0.18em] uppercase text-[var(--foreground-muted)] sm:self-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)]/80" />
              Auto Active
            </span>
          ) : (
            <button
              onClick={() => handleSelect(null)}
              disabled={isLoading}
              className="self-start border border-dashed border-[var(--border)] px-3 py-1.5 font-body text-[10px] tracking-[0.18em] uppercase text-[var(--foreground-muted)] transition-colors hover:border-[var(--foreground)] hover:text-[var(--foreground)] disabled:opacity-40 sm:self-auto"
            >
              Use Calculated Era
            </button>
          )}
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full select-none overflow-x-auto pb-4 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <div className={`relative flex min-w-max items-stretch gap-4 px-2 pb-6 pt-2 sm:px-3 snap-x ${isDragging ? "snap-none" : "snap-mandatory"}`}>
          {ERAS.map((era) => {
            const isSelected = currentEra === era.slug;
            const isCalculated = currentEra === null && calculatedEra === era.slug;
            const isActive = isSelected || isCalculated;

            return (
              <button
                key={era.slug}
                data-era-card="true"
                data-era-slug={era.slug}
                onClick={() => handleSelect(era.slug as EraSlug)}
                disabled={isLoading}
                className={`group relative snap-start w-[190px] sm:w-[220px] shrink-0 border p-5 text-left transition-all duration-500 ${
                  isActive
                    ? "-translate-y-1 border-[var(--foreground)] bg-[var(--surface)] shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
                    : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--border-focus)]"
                } disabled:opacity-40`}
                aria-pressed={isActive}
              >
                <div
                  className={`absolute left-0 top-0 h-[2px] transition-all duration-500 ${
                    isActive ? "w-full opacity-100" : "w-1/2 opacity-60 group-hover:w-full"
                  }`}
                  style={{ backgroundColor: era.color }}
                />

                <div className="mb-9 flex items-center justify-between">
                  <span
                    className={`font-body text-[10px] tracking-[0.24em] uppercase tabular-nums ${
                      isActive ? "text-[var(--foreground)]" : "text-[var(--foreground-muted)]"
                    }`}
                  >
                    {era.year}
                  </span>
                  <span
                    className={`font-body text-[9px] tracking-[0.18em] uppercase ${
                      isSelected
                        ? "text-[var(--foreground)]"
                        : isCalculated
                          ? "text-[var(--foreground-muted)]"
                          : "text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {isSelected ? "Declared" : isCalculated ? "Calculated" : "Select"}
                  </span>
                </div>

                <span
                  className={`font-display text-[1.5rem] font-semibold leading-[1.1] tracking-[0.01em] sm:text-[1.7rem] ${
                    isActive ? "text-[var(--foreground)]" : "text-[var(--foreground-muted)] group-hover:text-[var(--foreground)]"
                  }`}
                >
                  {era.label}
                </span>

                <div className="mt-8 flex items-center gap-2">
                  <div className="h-px flex-1 bg-[var(--border)]" />
                  <div
                    className={`h-2 w-2 rounded-full transition-all duration-500 ${
                      isActive ? "scale-100" : "scale-75 opacity-60 group-hover:scale-100"
                    }`}
                    style={{ backgroundColor: era.color }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {maxScroll > 0 && (
        <div className="mx-auto mt-5 w-full max-w-[28rem] px-2 sm:px-0">
          <div className="era-scale">
            <div aria-hidden className="era-scale-track" />

            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={scrollProgress * 100}
              onChange={handleScrubberChange}
              aria-label="Scroll eras horizontally"
              className="era-scale-input"
            />
          </div>
        </div>
      )}
    </div>
  );
}
