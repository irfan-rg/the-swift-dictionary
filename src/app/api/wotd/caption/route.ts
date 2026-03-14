import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function GET() {
  const supabase = await createClient();
  // Get today's UTC date which matches the CRON run
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("word_of_the_day")
    .select(
      `
      words (
        word,
        definition,
        lyric_snippet,
        difficulty,
        albums ( title ),
        songs ( title )
      )
    `
    )
    .eq("featured_date", today)
    .single();

  if (error || !data?.words) {
    return new Response(JSON.stringify({ error: "No word found" }), { 
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  const w = data.words as unknown as Record<string, any>;
  const word = w.word as string;
  const album = w.albums.title as string;
  const song = w.songs.title as string;

  const albumHashtag = album.replace(/[^a-zA-Z0-9]/g, "");
  const wordHashtag = word.replace(/[^a-zA-Z0-9]/g, "");

  const caption = `Today's Swift Dictionary word: ${word.toUpperCase()} ✨

"${w.lyric_snippet}"
— Taylor Swift, ${song} (${album})

📖 ${w.definition}

Did you know the meaning of this word? Which era does it fit best? Let us know in the comments! 🤍

#TaylorSwift #TheSwiftDictionary #${albumHashtag} #Swifties #${wordHashtag} #WordOfTheDay #Vocabulary
`;

  return new Response(JSON.stringify({ caption }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
