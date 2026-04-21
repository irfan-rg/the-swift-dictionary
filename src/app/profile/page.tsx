import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@/lib/types";
import EditableName from "@/components/profile/EditableName";
import EraSelector from "../../components/profile/EraSelector";
import { getCalculatedEra, getUserFavorites } from "@/lib/queries";
import { ERAS } from "@/lib/constants";

export const metadata = {
  title: "My Profile | The Swift Dictionary",
  description: "Manage your Swift Dictionary profile and preferences.",
};

async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data as Profile | null;
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/profile");
  }

  const profile = await getUserProfile(user.id);
  const displayName = profile?.display_name || user.email?.split("@")[0] || "Swiftie";
  const [calculatedEra, favorites] = await Promise.all([
    getCalculatedEra(user.id),
    getUserFavorites(user.id),
  ]);
  const calculatedEraInfo = calculatedEra ? ERAS.find((e) => e.slug === calculatedEra.slug) : null;
  
  const displayEraInfo = profile?.declared_era
    ? ERAS.find((e) => e.slug === profile.declared_era)
    : calculatedEraInfo;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-20 md:space-y-28">
      
      {/* 1. Identity Header: Pure structure, no era colors */}
      <header className="flex flex-col gap-12 border-b border-[var(--border-focus)] pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
        <div className="max-w-2xl">
          <span className="mb-10 block font-body text-[10px] tracking-[0.28em] uppercase text-[var(--accent)]">
            Curator Identity
          </span>
          <div className="mb-4 font-handwriting text-[1.75rem] leading-none text-[var(--foreground-muted)] md:text-[2rem]">
            Oh, hi.
          </div>
          <EditableName userId={user.id} initialName={displayName} showGreeting={false} centered={false} />
          <div className="mt-4 break-all font-body text-xs tracking-[0.08em] text-[var(--foreground-muted)] md:text-sm">
            {user.email}
          </div>
        </div>
        
        <div className="shrink-0 border-l border-[var(--border)] pl-8 text-left md:pl-10">
          <div className="flex gap-10 md:gap-16">
          <div className="flex flex-col">
            <span className="mb-2 font-body text-[10px] tracking-[0.2em] uppercase text-[var(--foreground-muted)]">Member Since</span>
            <span className="font-display text-[1.9rem] leading-none text-[var(--foreground)]">
              {new Date(profile?.created_at || user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="mb-2 font-body text-[10px] tracking-[0.2em] uppercase text-[var(--foreground-muted)]">Kept Words</span>
            <span className="font-display text-[1.9rem] leading-none text-[var(--foreground)] tabular-nums">
              {favorites.length}
            </span>
          </div>
          </div>
        </div>
      </header>

      {/* 2. The Era Timeline Selector */}
      <section className="space-y-12">
        <div className="flex flex-col justify-between gap-6 px-2 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="mb-4 -mt-14 font-display text-4xl leading-[0.95] tracking-tight text-[var(--foreground)] md:text-5xl">
              Aesthetic Chronology
            </h2>
            <p className="max-w-[46ch] font-body text-[0.95rem] leading-[1.55] text-[var(--foreground-muted)]">
              Select an era to establish your visual identity, or allow your saved words to naturally dictate your current alignment. 
              {profile?.declared_era ? " Currently manually overridden." : " Currently calculated organically."}
            </p>
          </div>
          
          <div className="text-left md:text-right">
            <span className="mb-2 block font-body text-[10px] tracking-[0.2em] uppercase text-[var(--foreground-muted)]">Current Alignment</span>
            <span
              className="font-display text-[2.05rem] leading-none md:text-[2.3rem]"
              style={{ color: displayEraInfo?.color || "var(--foreground)" }}
            >
              {displayEraInfo?.label || "Undiscovered"}
            </span>
          </div>
        </div>

        {/* Timeline Component Wrapper */}
        <div className="w-full">
          <EraSelector
            userId={user.id}
            initialEra={profile?.declared_era || null}
            calculatedEra={calculatedEraInfo?.slug || null}
          />
        </div>
      </section>

      {/* 3. Interactive Experiences Section */}
      <section className="pt-12 md:pt-20 border-t border-[var(--border)] overflow-hidden">
        <header className="mb-10 md:mb-16">
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] block mb-4">
            Your Studio
          </span>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight text-[var(--foreground)]">
            Interactive Experiences
          </h2>
          <p className="font-body text-base text-[var(--foreground-muted)] max-w-xl leading-relaxed mx-auto ml-0 mt-4">
            Extend the narrative of the pieces you&apos;ve curated into something tangibly yours.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          
          {/* Top 13 Teaser */}
          <Link 
            href="/profile/top13"
            className="group flex flex-col justify-between p-6 md:p-10 border border-[var(--border)] bg-transparent hover:bg-[var(--surface-raised)] transition-all duration-500 min-h-[220px] md:min-h-[320px]"
          >
            <div>
              <div className="font-display text-4xl text-[var(--border-focus)] mb-8 transition-colors group-hover:text-[var(--accent)]">
                13
              </div>
              <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-[var(--foreground)] mb-4">
                Your Top 13
              </h3>
              <p className="font-body text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed group-hover:text-[var(--foreground)] transition-colors">
                Curate a definitive list of your favorite pieces and generate a typographic dossier.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-3 font-body text-[10px] tracking-[0.2em] uppercase text-[var(--foreground-muted)] group-hover:text-[var(--accent)] transition-colors">
              Open Composer <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </Link>

          {/* Bracelet Builder Teaser */}
          <Link 
            href="/profile/bracelets"
            className="group flex flex-col justify-between p-6 md:p-10 border border-[var(--border)] bg-transparent hover:bg-[var(--surface-raised)] transition-all duration-500 min-h-[220px] md:min-h-[320px]"
          >
            <div>
              <div className="flex gap-2 mb-8 items-center h-10">
                {['T', 'S'].map((bead, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border border-[var(--border-focus)] bg-[var(--surface)] flex items-center justify-center font-body text-[10px] font-medium text-[var(--foreground)] group-hover:border-[var(--accent)] transition-colors">
                    {bead}
                  </div>
                ))}
                <div className="w-8 h-[1px] bg-[var(--border-focus)] group-hover:bg-[var(--accent)] transition-colors" />
              </div>
              <h3 className="font-body text-[10px] tracking-[0.2em] uppercase text-[var(--foreground)] mb-4">
                Friendship Bracelets
              </h3>
              <p className="font-body text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed group-hover:text-[var(--foreground)] transition-colors">
                String together virtual beads for the eras, songs, and moments that matter.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-3 font-body text-[10px] tracking-[0.2em] uppercase text-[var(--foreground-muted)] group-hover:text-[var(--accent)] transition-colors">
              Open Builder <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
}
