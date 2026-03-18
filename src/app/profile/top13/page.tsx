import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Top13Composer from "@/components/profile/Top13Composer";
import { getUserFavorites } from "@/lib/queries";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Top 13 Selection | The Swift Dictionary",
};

export default async function Top13Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/profile/top13");
  }

  const favorites = await getUserFavorites(user.id);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <Link href="/profile" className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors mb-12">
        <ArrowLeft className="w-3 h-3" /> Back to Profile
      </Link>
      
      <Top13Composer favorites={favorites} />
    </div>
  );
}