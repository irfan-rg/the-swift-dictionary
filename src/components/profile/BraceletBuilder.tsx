"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface BraceletBuilderProps {
  userId: string;
  initialBeads: string[];
}

const PALETTE = ["T", "S", "1", "3", "A", "B", "C", "D", "E", "F"];
const MAX_BEADS = 24;

export default function BraceletBuilder({ userId, initialBeads }: BraceletBuilderProps) {
  const [beads, setBeads] = useState<string[]>(initialBeads);
  const [customBead, setCustomBead] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string>("");

  const canAddMore = beads.length < MAX_BEADS;

  const beadPreview = useMemo(() => {
    if (beads.length === 0) {
      return (
        <p className="font-body text-sm text-[var(--foreground-muted)]">
          Start adding beads to build your bracelet.
        </p>
      );
    }

    return (
      <div className="flex flex-wrap gap-2">
        {beads.map((bead, index) => (
          <span
            key={`${bead}-${index}`}
            className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 font-body text-sm text-[var(--foreground)]"
          >
            {bead}
          </span>
        ))}
      </div>
    );
  }, [beads]);

  const addBead = (value: string) => {
    if (!canAddMore) return;
    setBeads((prev) => [...prev, value]);
    setStatus("");
  };

  const addCustomBead = () => {
    const normalized = customBead.trim().toUpperCase();
    if (!normalized || normalized.length > 2 || !canAddMore) return;
    addBead(normalized);
    setCustomBead("");
  };

  const removeLast = () => {
    setBeads((prev) => prev.slice(0, -1));
    setStatus("");
  };

  const clearAll = () => {
    setBeads([]);
    setStatus("");
  };

  const saveBracelet = async () => {
    setIsSaving(true);
    setStatus("");

    const supabase = createClient();
    const { error } = await supabase.from("bracelets").upsert(
      {
        user_id: userId,
        beads,
      },
      { onConflict: "user_id" }
    );

    if (error) {
      setStatus("Unable to save right now. Make sure the bracelets migration is applied.");
      console.error("Error saving bracelet:", error);
    } else {
      setStatus("Bracelet saved.");
    }

    setIsSaving(false);
  };

  return (
    <div className="relative space-y-8 overflow-hidden">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 z-10 flex min-h-full min-w-full flex-col items-center justify-center bg-[var(--background)]/80 backdrop-blur-sm -mx-4 px-4">
        <div className="polaroid-card px-8 py-6 text-center max-w-sm w-full mx-auto">
          <div className="scrapbook-tape" />
          <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-2 mt-4">
            Coming Soon
          </span>
          <h3 className="font-display text-2xl font-medium tracking-tight text-[var(--foreground)]">
            Custom Bracelets
          </h3>
          <p className="font-body text-xs text-[var(--foreground-muted)] text-balance mt-3 leading-relaxed">
            We are gathering the perfect beads. Check back later to craft and save your digital friendship bracelets.
          </p>
        </div>
      </div>

      <div className="pointer-events-none opacity-40 blur-[2px] transition-all">
        <div>
          <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-3">
            Create
          </span>
          <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--foreground)] mb-3">
            Bracelet Builder
          </h3>
          <p className="font-body text-sm md:text-base text-[var(--foreground-muted)] max-w-xl leading-relaxed">
            String together up to {MAX_BEADS} beads to capture a moment, a lyric, or a feeling.
          </p>
        </div>

        <div className="mt-8 relative mb-12">
          <div className="absolute left-0 top-1/2 w-full h-px border-t-2 border-dashed border-[var(--border-focus)] -z-10" />
          <div className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] mb-4 bg-[var(--background)] inline-block pr-4">
            Preview ({beads.length}/{MAX_BEADS})
          </div>
          {beadPreview}
        </div>

        <div className="space-y-4">
          <div className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] border-b border-[var(--border)] pb-2 mb-4">
            Palette
          </div>
          <div className="flex flex-wrap gap-3">
            {PALETTE.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => addBead(value)}
                disabled={!canAddMore}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface)] font-body text-base font-medium text-[var(--foreground)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] transition-all shadow-sm disabled:opacity-40"
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <input
            type="text"
            maxLength={2}
            value={customBead}
            onChange={(event) => setCustomBead(event.target.value)}
            placeholder="Custom"
            className="w-full sm:w-32 bg-transparent border-b-2 border-[var(--border)] px-2 py-2 font-display italic text-xl text-center text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            type="button"
            onClick={addCustomBead}
            disabled={!canAddMore}
            className="px-4 py-2 border border-[var(--border)] font-body text-[10px] tracking-widest uppercase text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors disabled:opacity-40"
          >
            Add Bead
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={removeLast}
            disabled={beads.length === 0}
            className="px-4 py-2 text-[var(--foreground-muted)] font-body text-[10px] tracking-widest uppercase hover:text-[var(--foreground)] transition-colors disabled:opacity-40"
          >
            Remove Last
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={beads.length === 0}
            className="px-4 py-2 text-red-400 font-body text-[10px] tracking-widest uppercase hover:text-red-500 transition-colors disabled:opacity-40"
          >
            Clear All
          </button>
        </div>

        <div className="pt-8 mt-8 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {status && (
            <span className="font-handwriting text-lg text-[var(--foreground-muted)]">{status}</span>
          )}
          <button
            type="button"
            onClick={saveBracelet}
            disabled={isSaving}
            className="sm:ml-auto px-8 py-3 font-body text-[10px] tracking-[0.2em] uppercase text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--surface)] transition-all disabled:opacity-60"
          >
            {isSaving ? "Stringing..." : "Save Bracelet"}
          </button>
        </div>
      </div>
    </div>
  );
}
