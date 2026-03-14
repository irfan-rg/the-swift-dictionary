/**
 * Download today's Word of the Day images (front & back)
 * 
 * Usage:
 *   node scripts/download-wotd-image.mjs
 *   node scripts/download-wotd-image.mjs --url https://www.the-swift-dictionary.me
 */

import fs from 'fs';
import path from 'path';

const BASE_URL = process.argv.includes('--url') 
  ? process.argv[process.argv.indexOf('--url') + 1]
  : 'http://localhost:3000';

const OUTPUT_DIR = './wotd-images';

async function downloadImage(side) {
  const today = new Date().toISOString().split('T')[0];
  const filename = `wotd-${today}-${side}.png`;
  const outputPath = path.join(OUTPUT_DIR, filename);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Fetching ${side} side from ${BASE_URL}/api/wotd/image?side=${side} ...`);

  try {
    const response = await fetch(`${BASE_URL}/api/wotd/image?side=${side}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));

    console.log(`  ✓ Saved: ${outputPath} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
    
    return outputPath;
  } catch (error) {
    console.error(`  ✗ Failed to download ${side}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('\n📸 Downloading Word of the Day images...\n');
  
  const front = await downloadImage('front');
  const back = await downloadImage('back');
  
  if (front && back) {
    console.log('\n✅ Done! Both sides downloaded.\n');
    console.log('For Instagram carousel:');
    console.log(`  1. ${front}`);
    console.log(`  2. ${back}`);
  } else {
    console.log('\n⚠️  Some downloads failed.\n');
    process.exit(1);
  }
}

main();
