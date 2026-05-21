import { createClient } from "@/lib/supabase/server";
import { apiLimiter, getClientIp, checkRateLimit } from "@/lib/rate-limit";

export const runtime = "edge";

export async function GET(request: Request) {
  // Rate limiting
  const ip = getClientIp(request);
  const { success, headers: rlHeaders } = await checkRateLimit(apiLimiter(), ip);
  if (!success) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json", ...rlHeaders },
    });
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc("assign_wotd_today").single();

  if (error || !data) {
    return new Response(JSON.stringify({ error: "No word found" }), { 
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  const w = data as Record<string, any>;
  const word = w.word as string;
  const album = w.album_title as string;
  const song = w.song_title as string;

  const albumHashtag = album.replace(/[^a-zA-Z0-9]/g, "");
  const wordHashtag = word.replace(/[^a-zA-Z0-9]/g, "");

  const caption = `Today's Swift Dictionary word: ${word.toUpperCase()} ✨

"${w.lyric_snippet}"
- Taylor Swift, ${song} (${album})

📖 ${w.definition}

Did you know the meaning of this word? Which era does it fit best? Let us know in the comments! 🤍

#TaylorSwift #TheSwiftDictionary #${albumHashtag} #Swifties #${wordHashtag}
`;

  return new Response(JSON.stringify({ caption }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
