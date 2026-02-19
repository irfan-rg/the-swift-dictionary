import { NextResponse } from "next/server";
import { toggleFavorite } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { wordId } = await request.json();
    if (!wordId) {
      return NextResponse.json({ error: "wordId required" }, { status: 400 });
    }

    const isFavorited = await toggleFavorite(user.id, wordId);
    return NextResponse.json({ favorited: isFavorited });
  } catch (error) {
    console.error("Favorite toggle error:", error);
    return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 });
  }
}
