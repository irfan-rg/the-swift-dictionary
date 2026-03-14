import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "The Swift Dictionary";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Load fonts using relative paths
const cormorantSemiBold = fetch(
  new URL('./api/wotd/image/fonts/CormorantGaramond-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const bricolageGrotesque = fetch(
  new URL('./api/wotd/image/fonts/BricolageGrotesque-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const nothingYouCouldDo = fetch(
  new URL('./api/wotd/image/fonts/NothingYouCouldDo.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const cinzelDecorative = fetch(
  new URL('./api/wotd/image/fonts/CinzelDecorative-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const COLORS = {
  background: "#0a0a0a",
  surface: "#141414",
  foreground: "#F5EFE6",
  foregroundMuted: "#A39B93",
  accent: "#C9A87C",
  border: "rgba(255, 255, 255, 0.08)",
};

export default async function Image() {
  const [cormorantData, bricolageData, nothingData, cinzelData] = await Promise.all([
    cormorantSemiBold,
    bricolageGrotesque,
    nothingYouCouldDo,
    cinzelDecorative,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.background,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft radial glow in background */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "80%",
            background: "radial-gradient(circle, rgba(201,168,124,0.15) 0%, rgba(10,10,10,0) 70%)",
            display: "flex",
          }}
        />

        {/* Inner Card representing a scrapbook polaroid/book cover */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 20px 80px rgba(0,0,0,0.9)",
            padding: "40px",
            width: 1000,
            height: 480,
            borderRadius: 4,
            position: "relative",
          }}
        >
          {/* Big Watermark Moved Inside The Card! */}
          <div
            style={{
              position: "absolute",
              top: -10,
              left: 30,
              fontSize: 270,
              fontFamily: 'Cinzel Decorative',
              color: COLORS.foreground,
              opacity: 0.02,
              display: "flex",
              zIndex: 0,
            }}
          >
            TSD
          </div>

          {/* Scrapbook Tape */}
          <div
            style={{
              position: "absolute",
              top: -16,
              left: "50%",
              transform: "translateX(-50%) rotate(-2deg)",
              width: 140,
              height: 36,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              display: "flex",
              zIndex: 10,
            }}
          />

          {/* Subtle line decorations */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              right: 24,
              bottom: 24,
              border: `1px solid ${COLORS.border}`,
              display: "flex",
              opacity: 0.5,
              zIndex: 1,
            }}
          />

          <span
            style={{
              fontSize: 20,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: 'Bricolage Grotesque',
              color: COLORS.foregroundMuted,
              marginBottom: 20,
              textAlign: "center",
              zIndex: 2,
            }}
          >
            A Curated Scrapbook Of
          </span>

          {/* Fixed text wrap: using flex column instead of <br/> which breaks in Satori */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 16,
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: 90, // Slightly bigger, and safely fits within 80% width!
                fontFamily: 'Cinzel Decorative',
                color: COLORS.foreground,
                lineHeight: 1,
                textShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              The Swift
            </span>
            <span
              style={{
                fontSize: 90,
                fontFamily: 'Cinzel Decorative',
                color: COLORS.foreground,
                lineHeight: 1,
                textShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              Dictionary
            </span>
          </div>

          <div
            style={{
              width: 80,
              height: 2,
              backgroundColor: COLORS.accent,
              marginTop: 24,
              marginBottom: 24,
              display: "flex",
              zIndex: 2,
            }}
          />

          <span
            style={{
              fontSize: 48,
              fontFamily: 'Nothing You Could Do',
              color: COLORS.accent,
              textAlign: "center",
              zIndex: 2,
            }}
          >
            Discover the lyrical vocabulary
          </span>
        </div>

        {/* Bottom branding footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: 'Bricolage Grotesque',
              color: COLORS.foregroundMuted,
            }}
          >
            the-swift-dictionary.me
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Cormorant Garamond',
          data: cormorantData,
          style: 'normal',
          weight: 600,
        },
        {
          name: 'Bricolage Grotesque',
          data: bricolageData,
          style: 'normal',
          weight: 400,
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
      ],
    }
  );
}


