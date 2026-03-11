import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

export default async function Icon() {
  const fontData = await readFile(join(process.cwd(), 'src/app/CinzelDecorative-Bold.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FDFBF7', // Premium parchment background
          color: '#2A2421', // Deep, rich ink text
          border: '1px solid #E6E2D6', // Very subtle edge
          borderRadius: '16px', // Smooth squircle corner
          fontFamily: '"Cinzel Decorative"',
          fontWeight: 700,
          fontSize: 22, // Reduced to give the letters breathing room and stop clipping
        }}
      >
        TSD
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
