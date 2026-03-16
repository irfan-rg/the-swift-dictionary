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
    <div className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-6 md:p-8 space-y-6">
      <div>
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-2">
          Create
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[var(--foreground)]">
          Bracelet Builder
        </h3>
        <p className="font-body text-sm text-[var(--foreground-muted)] mt-2 max-w-2xl">
          Build your bracelet with up to {MAX_BEADS} beads, then save it to your profile.
        </p>
      </div>

      <div className="space-y-3">
        <div className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)]">
          Preview ({beads.length}/{MAX_BEADS})
        </div>
        {beadPreview}
      </div>

      <div className="h-px bg-[var(--border)]" />

      <div className="space-y-3">
        <div className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)]">
          Palette
        </div>
        <div className="flex flex-wrap gap-2">
          {PALETTE.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => addBead(value)}
              disabled={!canAddMore}
              className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 font-body text-sm text-[var(--foreground)] hover:border-[var(--border-focus)] transition-colors disabled:opacity-40"
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          maxLength={2}
          value={customBead}
          onChange={(event) => setCustomBead(event.target.value)}
          placeholder="Custom"
          className="w-full sm:w-36 rounded-sm border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-body text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--border-focus)]"
        />
        <button
          type="button"
          onClick={addCustomBead}
          disabled={!canAddMore}
          className="px-3 py-2 rounded-sm border border-[var(--border)] font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-focus)] transition-colors disabled:opacity-40"
        >
          Add Custom
        </button>
        <button
          type="button"
          onClick={removeLast}
          disabled={beads.length === 0}
          className="px-3 py-2 rounded-sm border border-transparent font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors disabled:opacity-40"
        >
          Remove Last
        </button>
        <button
          type="button"
          onClick={clearAll}
          disabled={beads.length === 0}
          className="px-3 py-2 rounded-sm border border-transparent font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors disabled:opacity-40"
        >
          Clear
        </button>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="button"
          onClick={saveBracelet}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-sm font-body text-[10px] tracking-widest uppercase text-white bg-[var(--accent)] hover:opacity-90 transition-colors disabled:opacity-60"
        >
          {isSaving ? "Saving" : "Save Bracelet"}
        </button>
        {status && (
          <span className="font-body text-sm text-[var(--foreground-muted)]">{status}</span>
        )}
      </div>
    </div>
  );
}
