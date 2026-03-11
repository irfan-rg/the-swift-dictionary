import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'The Swift Dictionary';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const fontData = await readFile(join(process.cwd(), 'src/app/CinzelDecorative-Bold.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FDFBF7', // Light theme background
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Faint TSD Watermark in the background */}
        <div 
          style={{ 
            position: 'absolute', 
            top: 200, 
            left: '50%', 
            transform: 'translateX(-50%)', 
            fontFamily: '"Cinzel Decorative"', 
            fontSize: 500, 
            color: '#8B5E3C', 
            opacity: 0.03, 
            letterSpacing: '-0.1em',
            zIndex: 0
          }}
        >
          TSD
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 120,
              color: '#2A2421', // Primary Foreground text
              fontFamily: '"Cinzel Decorative"',
              fontWeight: 700,
              letterSpacing: '0',
              textAlign: 'center',
              lineHeight: 1.1,
              textShadow: '0px 0px 2px #2A2421', // Embolden stroke
            }}
          >
            The Swift<br/>Dictionary
          </div>
          
          <div
            style={{
              marginTop: 40,
              fontSize: 36,
              color: '#8B5E3C', // Accent text
              fontStyle: 'italic', // Uses standard serif font fallback for subtitle to contrast branding
            }}
          >
            A curated scrapbook of every lyric & lore...
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Cinzel Decorative',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}
