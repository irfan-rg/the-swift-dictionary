import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { ERAS } from "@/lib/constants";

export const runtime = "edge";

const cormorantRegular = fetch(new URL('../../wotd/image/fonts/CormorantGaramond-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer());
const cormorantItalic = fetch(new URL('../../wotd/image/fonts/CormorantGaramond-Italic.ttf', import.meta.url)).then(res => res.arrayBuffer());
const cormorantSemiBold = fetch(new URL('../../wotd/image/fonts/CormorantGaramond-SemiBold.ttf', import.meta.url)).then(res => res.arrayBuffer());
const bricolageGrotesque = fetch(new URL('../../wotd/image/fonts/BricolageGrotesque-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer());
const nothingYouCouldDo = fetch(new URL('../../wotd/image/fonts/NothingYouCouldDo.ttf', import.meta.url)).then(res => res.arrayBuffer());
const cinzelDecorative = fetch(new URL('../../wotd/image/fonts/CinzelDecorative-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer());

const WIDTH = 1080;
const HEIGHT = 1350;

const COLORS = {
  background: "#080808",
  foreground: "#F5EFE6",
  foregroundMuted: "#A39B93",
  border: "rgba(255, 255, 255, 0.12)",
  accent: "#C9A87C",
};
const MAX_WORDS = 13;
const MIN_WORDS = 6;

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

  if (ids.length < MIN_WORDS) {
    return new Response(`Minimum ${MIN_WORDS} words required`, { status: 400 });
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
        albums ( title, slug )
      )
    `
    )
    .eq("user_id", user.id)
    .in("word_id", ids);

  if (error || !data) {
    return new Response("Unable to fetch favorites", { status: 500 });
  }

  const lookup = new Map<string, { word: string; albumTitle: string; albumSlug: string }>();

  for (const row of data as Array<Record<string, unknown>>) {
    const wordId = row.word_id as string;
    const words = row.words as Record<string, unknown> | null;
    if (!words) continue;

    const albums = words.albums as Record<string, unknown> | null;
    lookup.set(wordId, {
      word: (words.word as string) || "",
      albumTitle: (albums?.title as string) || "Unknown Era",
      albumSlug: (albums?.slug as string) || "",
    });
  }

  const ordered = ids
    .map((id) => lookup.get(id))
    .filter((item): item is { word: string; albumTitle: string; albumSlug: string } => Boolean(item));

  if (ordered.length === 0) {
    return new Response("No matching favorites found", { status: 404 });
  }

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [regularFont, italicFont, semiBoldFont, bricolageFont, nycFont, cinzelFont] = await Promise.all([
    cormorantRegular,
    cormorantItalic,
    cormorantSemiBold,
    bricolageGrotesque,
    nothingYouCouldDo,
    cinzelDecorative
  ]);

  const numWords = ordered.length;
  
  // Static consistent sizes so layout feels identical regardless of selection count
  const titleSize = numWords > 10 ? 44 : 48; // Slight scale down just to guarantee 13 easily fits
  const numSize = numWords > 10 ? 32 : 36;
  const albumSize = 14;

  const rowPadding = numWords > 10 ? "10px" : numWords > 7 ? "14px" : "20px";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: COLORS.background,
          color: COLORS.foreground,
          padding: "80px 100px",
          fontFamily: '"Cormorant Garamond"',
        }}
      >
        {/* Header Block */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 56, width: "100%" }}>
          <span style={{ fontSize: 92, fontFamily: '"Cormorant Garamond"', color: COLORS.foreground, lineHeight: 1 }}>
            Top {numWords} Words
          </span>
          <span style={{ fontSize: 32, letterSpacing: "-0.05em", color: COLORS.foreground, opacity: 0.25, fontFamily: '"Cinzel Decorative"' }}>
            TSD
          </span>
        </div>

        {/* List Block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center", // will auto-height perfectly
          }}
        >
          {ordered.map((item, index) => {
            const eraDef = ERAS.find((e) => e.slug === item.albumSlug);
            const eraColor = eraDef ? eraDef.colorDark : COLORS.foregroundMuted;

            return (
              <div
                key={`${item.word}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: index === numWords - 1 ? "none" : `1px solid rgba(255, 255, 255, 0.04)`,
                  paddingTop: rowPadding,
                  paddingBottom: rowPadding,
                  width: "100%",
                }}
              >
                {/* Left: Number and Word */}
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span style={{ fontSize: numSize, color: COLORS.accent, fontFamily: '"Nothing You Could Do"', width: "80px", opacity: 0.9 }}>
                    {index + 1}.
                  </span>
                  <span style={{ fontSize: titleSize, color: COLORS.foreground, fontFamily: '"Cormorant Garamond"' }}>
                    {item.word}
                  </span>
                </div>
                
                {/* Right: Album Title */}
                <span style={{ fontSize: albumSize, color: eraColor, fontFamily: '"Bricolage Grotesque"', letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {item.albumTitle}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer Block */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 48 }}>
          <span style={{ fontSize: 16, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.accent, fontFamily: '"Bricolage Grotesque"' }}>
            CURATED COLLECTION
          </span>
          <span style={{ fontSize: 18, color: COLORS.foregroundMuted, fontFamily: '"Bricolage Grotesque"', opacity: 0.8 }}>
            the-swift-dictionary.me
          </span>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: regularFont,
          style: "normal",
          weight: 400,
        },
        {
          name: "Cormorant Garamond Italic",
          data: italicFont,
          style: "italic",
          weight: 400,
        },
        {
          name: "Cormorant Garamond SemiBold",
          data: semiBoldFont,
          style: "normal",
          weight: 600,
        },
        {
          name: "Bricolage Grotesque",
          data: bricolageFont,
          style: "normal",
          weight: 400,
        },
        {
          name: "Nothing You Could Do",
          data: nycFont,
          style: "normal",
          weight: 400,
        },
        {
          name: "Cinzel Decorative",
          data: cinzelFont,
          style: "normal",
          weight: 400,
        },
      ],
      headers: {
        "content-type": "image/png",
        "content-disposition": "inline; filename=top13.png",
      },
    }
  );
}
