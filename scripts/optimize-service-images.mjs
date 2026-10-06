import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const brainDir = 'C:\\Users\\lamine\\.gemini\\antigravity\\brain\\1ac0e357-8ac3-48e8-a826-1132fc25f740';
const outDir = path.resolve('public/assets');

const files = [
  { prefix: 'pompe_eau_technique', out: 'service-pompe.webp' },
  { prefix: 'climatiseur_split_moderne', out: 'service-clim.webp' },
  { prefix: 'electricite_tableau_pro', out: 'service-electricite.webp' },
  { prefix: 'camera_surveillance_pro', out: 'service-camera.webp' },
  { prefix: 'plomberie_sanitaire_pro', out: 'service-plomberie.webp' },
];

async function main() {
  const brainFiles = fs.readdirSync(brainDir);
  for (const item of files) {
    const match = brainFiles.find(f => f.startsWith(item.prefix) && f.endsWith('.jpg'));
    if (!match) {
      console.error(`Not found: ${item.prefix}`);
      continue;
    }
    const srcPath = path.join(brainDir, match);
    const destPath = path.join(outDir, item.out);
    
    // Resize to max 960px width, encode to high quality WebP
    await sharp(srcPath)
      .resize({ width: 960, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(destPath);
      
    const stat = fs.statSync(destPath);
    console.log(`Saved ${item.out}: ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

main().catch(console.error);
