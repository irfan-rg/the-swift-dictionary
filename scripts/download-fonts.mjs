import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontsDir = path.join(__dirname, '..', 'src', 'app', 'api', 'wotd', 'image', 'fonts');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fontsToDownload = [
  { name: 'CormorantGaramond-Regular.ttf', family: 'Cormorant Garamond', weight: 400, style: 'normal' },
  { name: 'CormorantGaramond-Italic.ttf', family: 'Cormorant Garamond', weight: 400, style: 'italic' },
  { name: 'CormorantGaramond-SemiBold.ttf', family: 'Cormorant Garamond', weight: 600, style: 'normal' },
  { name: 'NothingYouCouldDo.ttf', family: 'Nothing You Could Do', weight: 400, style: 'normal' },
  { name: 'CinzelDecorative-Regular.ttf', family: 'Cinzel Decorative', weight: 400, style: 'normal' },
  { name: 'BricolageGrotesque-Regular.ttf', family: 'Bricolage Grotesque', weight: 400, style: 'normal' },
];

async function downloadFont(font) {
  const familyUrl = font.family.replace(/ /g, '+');
  const style = font.style === 'italic' ? '1' : '0';
  const weight = font.weight;
  
  // Create Google Fonts API URL matching the specific weight/style
  // We use an old User-Agent so we get TTF format instead of WOFF2
  let url = `https://fonts.googleapis.com/css2?family=${familyUrl}:ital,wght@${style},${weight}&display=swap`;
  if (['Nothing You Could Do', 'Cinzel Decorative'].includes(font.family)) {
    url = `https://fonts.googleapis.com/css2?family=${familyUrl}&display=swap`;
  }

  console.log(`Fetching CSS for ${font.name}...`);
  
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.10 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.10'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/url\((https:\/\/[^)]+)\)/);
        if (match && match[1]) {
          const ttfUrl = match[1];
          console.log(`Downloading ${font.name} from ${ttfUrl}...`);
          
          https.get(ttfUrl, (ttfRes) => {
            if (ttfRes.statusCode !== 200) {
              reject(new Error(`Failed to download ${ttfUrl} (${ttfRes.statusCode})`));
              return;
            }
            const file = fs.createWriteStream(path.join(fontsDir, font.name));
            ttfRes.pipe(file);
            file.on('finish', () => {
              file.close();
              console.log(`Saved ${font.name}`);
              resolve();
            });
          }).on('error', reject);
        } else {
          console.log(`RAW CSS:\n${data}`);
          reject(new Error(`Could not find TTF URL in CSS for ${font.name}`));
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const font of fontsToDownload) {
    try {
      await downloadFont(font);
    } catch (e) {
      console.error(`Error with ${font.name}:`, e.message);
    }
  }
}

main();
