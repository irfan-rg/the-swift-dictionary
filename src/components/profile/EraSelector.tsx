"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    setCurrentEra(initialEra);
  }, [initialEra]);

  const handleSelect = async (slug: EraSlug | null) => {
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <span className="font-body text-sm text-[var(--foreground-muted)]">
          Choose the era that feels most true to you.
        </span>
        <button
          onClick={() => handleSelect(null)}
          disabled={isLoading || currentEra === null}
          className="font-body text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors disabled:opacity-30"
        >
          Use Calculated Era
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {ERAS.map((era) => {
          const isSelected = currentEra === era.slug;
          const isCalculated = currentEra === null && calculatedEra === era.slug;
          const isActive = isSelected || isCalculated;
          
          return (
            <button
              key={era.slug}
              onClick={() => handleSelect(era.slug as EraSlug)}
              disabled={isLoading}
              className={`
                relative flex flex-col items-start p-4 md:p-5 rounded-sm border transition-all duration-300 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]
                ${isActive 
                  ? 'border-[var(--foreground)] bg-[var(--surface)] shadow-sm' 
                  : 'border-[var(--border)] hover:border-[var(--border-focus)] bg-transparent'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: era.color }}
                />
                <span className={`font-body text-[10px] tracking-[0.2em] uppercase ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)]'}`}>
                  {era.year}
                </span>
              </div>
              
              <span className={`font-branding text-lg md:text-xl leading-tight ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)]'}`}>
                {era.label}
              </span>

              <span className="font-body text-[10px] tracking-[0.18em] uppercase text-[var(--foreground-muted)] mt-2">
                {era.year}
              </span>

              {isSelected && <span className="absolute top-4 right-4 font-body text-[10px] tracking-widest uppercase text-[var(--foreground)]">Selected</span>}
              {!isSelected && isCalculated && <span className="absolute top-4 right-4 font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)]">Calculated</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}