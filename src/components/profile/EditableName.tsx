"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface EditableNameProps {
  userId: string;
  initialName: string;
  showGreeting?: boolean;
}

export default function EditableName({ userId, initialName, showGreeting = true }: EditableNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSave = async () => {
    if (!name.trim() || name.trim() === initialName) {
      setIsEditing(false);
      setName(initialName);
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: name.trim() })
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
      <div className="flex flex-wrap items-center gap-3">
        {showGreeting && (
          <span className="font-branding text-3xl md:text-4xl font-medium tracking-tight text-[var(--foreground)]">
            Hi,
          </span>
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="font-branding text-3xl md:text-4xl font-medium tracking-tight bg-transparent border-b border-[var(--border-focus)] focus:outline-none text-[var(--foreground)] max-w-[220px] md:max-w-[320px]"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          disabled={isLoading}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-sm border border-[var(--border)] font-body text-[10px] tracking-widest uppercase text-[var(--foreground)] hover:border-[var(--border-focus)] transition-colors disabled:opacity-50"
            aria-label="Save name"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-sm border border-transparent font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors disabled:opacity-50"
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 group">
      <h1 className="font-branding text-3xl md:text-4xl font-medium tracking-tight text-[var(--foreground)] truncate max-w-[200px] md:max-w-[280px]">
        {showGreeting ? `Hi, ${name}` : name}
      </h1>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 px-2 py-1 font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-all"
        aria-label="Edit name"
      >
        Edit
      </button>
    </div>
  );
}
