import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const ffmpeg = ffmpegInstaller.path;

async function getFrameSharpness(videoPath, timeSec) {
  const tmpImg = path.resolve(`scratch/tmp_${Date.now()}_${Math.random().toString(36).substring(7)}.png`);
  try {
    execSync(`"${ffmpeg}" -ss ${timeSec} -i "${videoPath}" -vframes 1 -q:v 2 "${tmpImg}" -y 2>&1`, { stdio: 'pipe' });
    if (!fs.existsSync(tmpImg)) return { score: 0, path: null };

    // Laplacian kernel
    const { data, info } = await sharp(tmpImg)
      .greyscale()
      .convolve({
        width: 3,
        height: 3,
        kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0]
      })
      .raw()
      .toBuffer({ resolveWithObject: true });

    let sum = 0;
    let sumSq = 0;
    const len = data.length;
    for (let i = 0; i < len; i++) {
      const v = data[i];
      sum += v;
      sumSq += v * v;
    }
    const mean = sum / len;
    const variance = (sumSq / len) - (mean * mean);

    return { score: Math.round(variance * 10) / 10, tmpImg };
  } catch (err) {
    if (fs.existsSync(tmpImg)) fs.unlinkSync(tmpImg);
    return { score: 0, path: null };
  }
}

async function test() {
  console.log('Testing sharpness on video-1...');
  for (let t = 1; t <= 5; t++) {
    const { score, tmpImg } = await getFrameSharpness('scratch/videos/video-1.mp4', t);
    console.log(`t=${t}s: Laplacian score = ${score}`);
    if (tmpImg && fs.existsSync(tmpImg)) fs.unlinkSync(tmpImg);
  }
}

test();
