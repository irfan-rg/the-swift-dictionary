import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default async function AppleIcon() {
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
          background: '#FDFBF7',
          color: '#2A2421',
          border: '1px solid #E6E2D6',
          borderRadius: '40px', // Proper iOS squircle radius for 180px box
          fontFamily: '"Cinzel Decorative"',
          fontWeight: 700,
          fontSize: 60, // Scaled down to create a luxurious margin around the text
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
