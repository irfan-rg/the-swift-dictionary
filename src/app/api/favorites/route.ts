import { NextResponse } from "next/server";
import { toggleFavorite } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { mutationLimiter, getClientIp, checkRateLimit } from "@/lib/rate-limit";

const UUID_REGEX = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

export async function POST(request: Request) {
  // Rate limiting
  const ip = getClientIp(request);
  const { success, headers: rlHeaders } = await checkRateLimit(mutationLimiter(), ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: rlHeaders }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: rlHeaders });
  }

  try {
    const { wordId } = await request.json();
    if (!wordId || !UUID_REGEX.test(wordId)) {
      return NextResponse.json(
        { error: "Valid wordId required" },
        { status: 400, headers: rlHeaders }
      );
    }

    const isFavorited = await toggleFavorite(user.id, wordId);
    return NextResponse.json({ favorited: isFavorited }, { headers: rlHeaders });
  } catch (error) {
    console.error("Favorite toggle error:", error);
    return NextResponse.json(
      { error: "Failed to toggle favorite" },
      { status: 500, headers: rlHeaders }
    );
  }
}

