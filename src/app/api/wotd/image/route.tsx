import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { ERA_MAP } from "@/lib/constants";
import type { EraSlug } from "@/lib/types";

import { readFile } from "fs/promises";
import path from "path";

// Load fonts using fs for the Node.js runtime
const fontsDir = path.join(process.cwd(), "src/app/api/wotd/image/fonts");
const cormorantRegular = readFile(path.join(fontsDir, "CormorantGaramond-Regular.ttf"));
const cormorantItalic = readFile(path.join(fontsDir, "CormorantGaramond-Italic.ttf"));
const cormorantSemiBold = readFile(path.join(fontsDir, "CormorantGaramond-SemiBold.ttf"));
const nothingYouCouldDo = readFile(path.join(fontsDir, "NothingYouCouldDo.ttf"));
const cinzelDecorative = readFile(path.join(fontsDir, "CinzelDecorative-Regular.ttf"));
const bricolageGrotesque = readFile(path.join(fontsDir, "BricolageGrotesque-Regular.ttf"));

// Instagram square format
const WIDTH = 1080;
const HEIGHT = 1080;

// Dark theme colors (matching your globals.css)
const COLORS = {
  background: "#0a0a0a",
  surface: "#141414",
  surfaceRaised: "#1f1f1f",
  foreground: "#F5EFE6",
  foregroundMuted: "#A39B93",
  border: "rgba(255, 255, 255, 0.08)",
  accent: "#C9A87C", // warm gold for dark mode
};

interface WordData {
  word: string;
  definition: string;
  lyric_snippet: string;
  difficulty: string;
  album_title: string;
  album_slug: EraSlug;
  context: string;
  song_title: string;
}

async function getWordOfTheDayData(): Promise<WordData | null> {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("word_of_the_day")
    .select(
      `
      word_id,
      words (
        word,
        definition,
        lyric_snippet,
        difficulty,
        context,
        albums ( slug, title ),
        songs ( title )
      )
    `
    )
    .eq("featured_date", today)
    .single();

  if (error || !data?.words) return null;

  const w = data.words as unknown as Record<string, unknown>;
  const albums = w.albums as Record<string, unknown>;
  const songs = w.songs as Record<string, unknown>;

  return {
    word: w.word as string,
    definition: w.definition as string,
    lyric_snippet: w.lyric_snippet as string,
    difficulty: w.difficulty as string,
    context: (w.context as string) || "",
    album_title: albums.title as string,
    album_slug: albums.slug as EraSlug,
    song_title: songs.title as string,
  };
}

// Front face of the polaroid
function FrontFace({ wotd, eraColor }: { wotd: WordData; eraColor: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
        padding: 60,
      }}
    >
      {/* Polaroid Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: COLORS.surface,
          borderRadius: 4,
          boxShadow: "0 10px 40px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.6)",
          padding: 32,
          paddingBottom: 80,
          width: 820,
          border: `1px solid ${COLORS.border}`,
          position: "relative",
        }}
      >
        {/* Scrapbook Tape */}
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%) rotate(-2deg)",
            width: 120,
            height: 28,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
          }}
        />

        {/* Inner Photo Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.surfaceRaised,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 2,
            padding: 48,
            position: "relative",
          }}
        >
          {/* TSD Watermark */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              fontSize: 48,
              fontWeight: 400,
              fontFamily: 'Cinzel Decorative',
              color: COLORS.foreground,
              opacity: 0.05,
              display: "flex",
            }}
          >
            TSD
          </div>

          {/* Header */}
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: 'Bricolage Grotesque',
              color: COLORS.foregroundMuted,
              marginBottom: 32,
            }}
          >
            — Word of the Day —
          </span>

          {/* Main Word */}
          <span
            style={{
              fontSize: 88,
              fontWeight: 600,
              fontFamily: 'Cormorant Garamond',
              color: COLORS.foreground,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {wotd.word}
          </span>

          {/* Album & Difficulty */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontSize: 18,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: 'Bricolage Grotesque',
                color: eraColor,
              }}
            >
              {wotd.album_title}
            </span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: COLORS.foregroundMuted,
                opacity: 0.5,
              }}
            />
            <span
              style={{
                fontSize: 18,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: 'Bricolage Grotesque',
                color: COLORS.foregroundMuted,
              }}
            >
              {wotd.difficulty}
            </span>
          </div>

          {/* Definition */}
          <span
            style={{
              fontSize: 24,
              fontFamily: 'Bricolage Grotesque',
              color: COLORS.foregroundMuted,
              textAlign: "center",
              lineHeight: 1.6,
              maxWidth: 650,
            }}
          >
            {wotd.definition}
          </span>
        </div>

        {/* Polaroid Chin - Lyric Quote */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 40,
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontStyle: "italic",
              fontFamily: 'Nothing You Could Do',
              color: COLORS.foreground,
              textAlign: "center",
            }}
          >
            &quot;{wotd.lyric_snippet}&quot;
          </span>
        </div>
      </div>

      {/* Footer Branding */}
      <span
        style={{
          marginTop: 36,
          fontSize: 20,
          fontFamily: 'Bricolage Grotesque',
          letterSpacing: "0.1em",
          color: COLORS.foregroundMuted,
          opacity: 0.6,
        }}
      >
        the-swift-dictionary.me
      </span>
    </div>
  );
}

// Back face of the polaroid
function BackFace({ wotd, eraColor }: { wotd: WordData; eraColor: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
        padding: 60,
      }}
    >
      {/* Polaroid Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: COLORS.surface,
          borderRadius: 4,
          boxShadow: "0 10px 40px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.6)",
          padding: 48,
          width: 820,
          minHeight: 700,
          border: `1px solid ${COLORS.border}`,
          position: "relative",
        }}
      >
        {/* Scrapbook Tape */}
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%) rotate(-2deg)",
            width: 120,
            height: 28,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            opacity: 0.6,
            display: "flex",
          }}
        />

        {/* Lined paper texture overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 27px, rgba(255,255,255,0.03) 28px)",
            backgroundSize: "100% 28px",
            backgroundPositionY: 48,
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            flex: 1,
          }}
        >
          {/* Handwritten heading */}
          <span
            style={{
              fontSize: 60,
              fontStyle: "italic",
              fontFamily: 'Nothing You Could Do',
              color: eraColor,
              marginBottom: 16,
            }}
          >
            about this word...
          </span>

          {/* Accent line */}
          <div
            style={{
              width: 60,
              height: 2,
              backgroundColor: eraColor,
              opacity: 0.4,
              marginBottom: 40,
              display: "flex",
            }}
          />

          {/* Context body */}
          <span
            style={{
              fontSize: 28,
              fontFamily: 'Bricolage Grotesque',
              color: COLORS.foreground,
              lineHeight: 1.8,
              letterSpacing: "0.02em",
              flex: 1,
            }}
          >
            {wotd.context || "No additional context available for this word."}
          </span>

          {/* Bottom meta strip */}
          <div
            style={{
              marginTop: 40,
              paddingTop: 24,
              borderTop: `1px dashed ${COLORS.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontStyle: "italic",
                  fontFamily: 'Nothing You Could Do',
                  color: COLORS.foreground,
                }}
              >
                {wotd.song_title}
              </span>
              <span
                style={{
                  fontSize: 14,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontFamily: 'Bricolage Grotesque',
                  color: COLORS.foreground,
                  opacity: 0.5,
                  marginTop: 4,
                }}
              >
                {wotd.album_title}
              </span>
            </div>
            <span
              style={{
                fontSize: 14,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: 'Bricolage Grotesque',
                color: COLORS.foregroundMuted,
              }}
            >
              the-swift-dictionary.me
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const side = searchParams.get("side") || "front"; // 'front' or 'back'

  const wotd = await getWordOfTheDayData();

  if (!wotd) {
    return new Response("No Word of the Day found", { status: 404 });
  }

  const eraColor = ERA_MAP[wotd.album_slug]?.colorDark ?? "#C8C8C8";

  const content =
    side === "back" ? (
      <BackFace wotd={wotd} eraColor={eraColor} />
    ) : (
      <FrontFace wotd={wotd} eraColor={eraColor} />
    );

  const [
    cormorantRegularData,
    cormorantItalicData,
    cormorantSemiBoldData,
    nothingData,
    cinzelData,
    bricolageData,
  ] = await Promise.all([
    cormorantRegular,
    cormorantItalic,
    cormorantSemiBold,
    nothingYouCouldDo,
    cinzelDecorative,
    bricolageGrotesque,
  ]);

  return new ImageResponse(content, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      {
        name: 'Cormorant Garamond',
        data: cormorantRegularData,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Cormorant Garamond',
        data: cormorantItalicData,
        style: 'italic',
        weight: 400,
      },
      {
        name: 'Cormorant Garamond',
        data: cormorantSemiBoldData,
        style: 'normal',
        weight: 600,
      },
      {
        name: 'Nothing You Could Do',
        data: nothingData,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Cinzel Decorative',
        data: cinzelData,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Bricolage Grotesque',
        data: bricolageData,
        style: 'normal',
        weight: 400,
      },
    ],
  });
}
