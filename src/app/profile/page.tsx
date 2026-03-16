import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Profile } from "@/lib/types";
import EditableName from "@/components/profile/EditableName";
import EraSelector from "../../components/profile/EraSelector";
import Top13Composer from "@/components/profile/Top13Composer";
import BraceletBuilder from "@/components/profile/BraceletBuilder";
import { getCalculatedEra, getUserBracelet, getUserFavorites } from "@/lib/queries";
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
  const [calculatedEra, favorites, braceletBeads] = await Promise.all([
    getCalculatedEra(user.id),
    getUserFavorites(user.id),
    getUserBracelet(user.id),
  ]);
  const calculatedEraInfo = calculatedEra ? ERAS.find((e) => e.slug === calculatedEra.slug) : null;
  
  const displayEraInfo = profile?.declared_era
    ? ERAS.find((e) => e.slug === profile.declared_era)
    : calculatedEraInfo;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-2">
          Your Collection
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-[var(--foreground)] mb-4">
          Profile
        </h1>
        <p className="font-body text-sm text-[var(--foreground-muted)] max-w-md mx-auto">
          Manage your profile details and choose the era that feels most like home.
        </p>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-6 opacity-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <section className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-6 md:p-8">
          <span className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] block mb-4">
            Display Name
          </span>
          <EditableName userId={user.id} initialName={displayName} showGreeting={false} />

          <div className="h-px bg-[var(--border)] my-6" />

          <div className="space-y-4 font-body text-sm">
            <div>
              <span className="block text-[var(--foreground-muted)] mb-1">Email</span>
              <span className="text-[var(--foreground)] break-all">{user.email}</span>
            </div>
            <div>
              <span className="block text-[var(--foreground-muted)] mb-1">Joined</span>
              <span className="text-[var(--foreground)]">
                {new Date(profile?.created_at || user.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-6 md:p-8">
          <span className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] block mb-4">
            Current Era
          </span>

          <div className="font-branding text-4xl md:text-5xl mb-3" style={{ color: displayEraInfo?.color || "var(--foreground)" }}>
            {displayEraInfo?.label || "Undiscovered"}
          </div>

          <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed">
            {profile?.declared_era
              ? "You manually selected this era."
              : "This era is calculated from your saved words."}
          </p>

          <div className="h-px bg-[var(--border)] my-6" />

          {calculatedEra && calculatedEraInfo ? (
            <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed">
              {calculatedEra.count} favorite word{calculatedEra.count !== 1 ? "s" : ""} currently map to {calculatedEraInfo.label}.
            </p>
          ) : (
            <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed">
              You have not saved enough words yet for a calculated era.
            </p>
          )}
        </section>
      </div>

      <section className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-6 md:p-8">
        <div className="mb-6">
          <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-2">
            Era Preference
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--foreground)] mb-3">
            Declare Your Era
          </h2>
          <p className="font-body text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
            Select an era to set it manually, or return to your calculated era at any time.
          </p>
        </div>

        <EraSelector
          userId={user.id}
          initialEra={profile?.declared_era || null}
          calculatedEra={calculatedEraInfo?.slug || null}
        />
      </section>

      <section className="mt-10">
        <Top13Composer favorites={favorites} />
      </section>

      <section className="mt-10">
        <BraceletBuilder userId={user.id} initialBeads={braceletBeads ?? []} />
      </section>
    </div>
  );
}