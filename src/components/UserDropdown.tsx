"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, Heart, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    setIsOpen(false);
    router.refresh();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex p-2 rounded-full text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-raised)] transition-all duration-500"
        aria-label="User menu"
      >
        <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-[var(--surface)] border border-[var(--border)] rounded-md shadow-lg overflow-hidden z-50 font-body"
          >
            <div className="py-2 flex flex-col">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-raised)] transition-colors duration-500"
              >
                <Sparkles className="w-[16px] h-[16px]" strokeWidth={1.5} />
                My Profile
              </Link>
              <Link
                href="/favorites"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-raised)] transition-colors duration-500"
              >
                <Heart className="w-[16px] h-[16px]" strokeWidth={1.5} />
                Favorites
              </Link>
              <div className="h-px bg-[var(--border)] my-1" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-[var(--foreground-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-500"
              >
                <LogOut className="w-[16px] h-[16px]" strokeWidth={1.5} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
