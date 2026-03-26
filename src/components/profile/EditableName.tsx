"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface EditableNameProps {
  userId: string;
  initialName: string;
  showGreeting?: boolean;
}

export default function EditableName({ userId, initialName, showGreeting = true, centered = false }: EditableNameProps & { centered?: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSave = async () => {
    // Sanitize: strip HTML tags and limit length
    const sanitized = name.replace(/<[^>]*>/g, "").trim().slice(0, 50);
    if (!sanitized || sanitized === initialName) {
      setIsEditing(false);
      setName(initialName);
      return;
    }

    setName(sanitized);
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: sanitized })
      .eq("id", userId);

    if (!error) {
      setIsEditing(false);
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(initialName);
  };

  if (isEditing) {
    return (
      <div className={`flex flex-col gap-4 w-full ${centered ? 'items-center' : 'items-start'}`}>
        <div className={`flex flex-col md:flex-row gap-3 ${centered ? 'items-center' : 'items-baseline'}`}>
          {showGreeting && (
            <span className="font-display text-4xl leading-none tracking-tight text-[var(--foreground)] md:text-5xl lg:text-6xl">
              Hi,
            </span>
          )}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className={`max-w-full border-b border-[var(--border-focus)] bg-transparent pb-1 font-display text-4xl leading-[0.92] tracking-[-0.01em] text-[var(--foreground)] focus:outline-none md:text-5xl lg:text-6xl ${centered ? 'text-center' : 'text-left'}`}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="-mt-2 font-body text-[10px] tracking-[0.22em] uppercase text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)] disabled:opacity-50"
            aria-label="Cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="-mt-2 font-body text-[10px] tracking-[0.22em] uppercase text-[var(--foreground)] transition-colors hover:text-[var(--accent)] disabled:opacity-50"
            aria-label="Save name"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group w-full ${centered ? 'text-center' : 'text-left'}`}>
      <div className={`flex items-end gap-3 ${centered ? 'justify-center' : 'justify-start'}`}>
        <h2 className={`font-display text-5xl leading-[0.92] tracking-[-0.01em] text-[var(--foreground)] md:text-6xl lg:text-7xl ${centered ? 'max-w-[200px] md:max-w-[280px] truncate' : 'break-words'}`}>
          {showGreeting ? `Hi, ${name}` : name}
        </h2>
        <button
          onClick={() => setIsEditing(true)}
          className="mb-1 shrink-0 font-body text-[10px] tracking-[0.22em] uppercase text-[var(--foreground-muted)] opacity-0 transition-opacity hover:text-[var(--accent)] group-hover:opacity-100 focus:opacity-100"
          aria-label="Edit name"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
