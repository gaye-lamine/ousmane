import fs from 'fs';
import path from 'path';
import https from 'https';

const videos = [
  { id: 1, name: 'video-1', url: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356215/2_loso2d.mp4' },
  { id: 2, name: 'video-2', url: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356212/5_jtsrf6.mp4' },
  { id: 3, name: 'video-3', url: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356202/7_rm3dsz.mp4' },
  { id: 4, name: 'video-4', url: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356202/8_qdj85c.mp4' },
  { id: 5, name: 'video-5', url: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356201/10_vtcf8t.mp4' },
  { id: 6, name: 'video-6', url: 'https://res.cloudinary.com/dygcctw10/video/upload/v1776356198/3_ldzzqr.mp4' }
];

const destDir = path.resolve('scratch/videos');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  console.log('Downloading 6 videos from Cloudinary...');
  for (const v of videos) {
    const outPath = path.join(destDir, `${v.name}.mp4`);
    console.log(`Downloading ${v.name} from ${v.url}...`);
    await download(v.url, outPath);
    const stat = fs.statSync(outPath);
    console.log(`Saved ${v.name}.mp4 (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
  }
  console.log('All downloads completed!');
}

main().catch(console.error);
