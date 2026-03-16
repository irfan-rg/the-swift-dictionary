import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

const WIDTH = 1080;
const HEIGHT = 1350;
const MAX_WORDS = 13;

function sanitizeIds(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter((item) => /^[a-f0-9-]{36}$/i.test(item))
    .slice(0, MAX_WORDS);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = sanitizeIds(searchParams.get("ids"));

  if (ids.length === 0) {
    return new Response("No valid word ids provided", { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
      word_id,
      words (
        word,
        albums ( title )
      )
    `
    )
    .eq("user_id", user.id)
    .in("word_id", ids);

  if (error || !data) {
    return new Response("Unable to fetch favorites", { status: 500 });
  }

  const lookup = new Map<string, { word: string; albumTitle: string }>();

  for (const row of data as Array<Record<string, unknown>>) {
    const wordId = row.word_id as string;
    const words = row.words as Record<string, unknown> | null;
    if (!words) continue;

    const albums = words.albums as Record<string, unknown> | null;
    lookup.set(wordId, {
      word: (words.word as string) || "",
      albumTitle: (albums?.title as string) || "Unknown Era",
    });
  }

  const ordered = ids
    .map((id) => lookup.get(id))
    .filter((item): item is { word: string; albumTitle: string } => Boolean(item));

  if (ordered.length === 0) {
    return new Response("No matching favorites found", { status: 404 });
  }

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0f0f10",
          color: "#f5efe6",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "34px" }}>
          <span style={{ fontSize: 18, letterSpacing: "0.26em", textTransform: "uppercase", opacity: 0.7 }}>
            The Swift Dictionary
          </span>
          <span style={{ fontSize: 72, lineHeight: 1.02 }}>Top 13 Words</span>
          <span style={{ fontSize: 24, opacity: 0.75 }}>{today}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "28px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          {ordered.map((item, index) => (
            <div
              key={`${item.word}-${index}`}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "8px",
              }}
            >
              <span style={{ fontSize: 36 }}>
                {index + 1}. {item.word}
              </span>
              <span style={{ fontSize: 18, opacity: 0.72, marginLeft: "20px" }}>
                {item.albumTitle}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.65 }}>
          <span>Generated from your saved words</span>
          <span>theswiftdictionary.com</span>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        "content-type": "image/png",
        "content-disposition": "inline; filename=top13.png",
      },
    }
  );
}
