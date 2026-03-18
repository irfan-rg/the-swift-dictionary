import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BraceletBuilder from "@/components/profile/BraceletBuilder";
import { getUserBracelet } from "@/lib/queries";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Friendship Bracelets | The Swift Dictionary",
};

export default async function BraceletsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/profile/bracelets");
  }

  const braceletBeads = await getUserBracelet(user.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <Link href="/profile" className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors mb-12">
        <ArrowLeft className="w-3 h-3" /> Back to Profile
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <BraceletBuilder userId={user.id} initialBeads={braceletBeads ?? []} />
      </div>
    </div>
  );
}