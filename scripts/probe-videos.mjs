import { execSync } from 'child_process';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const ffmpeg = ffmpegInstaller.path;

for (let i = 1; i <= 6; i++) {
  const file = `scratch/videos/video-${i}.mp4`;
  try {
    execSync(`"${ffmpeg}" -i "${file}" 2>&1`, { encoding: 'utf8' });
  } catch (err) {
    const out = err.stdout || err.stderr || err.message;
    const durMatch = out.match(/Duration: ([^,]+)/);
    const streamMatch = out.match(/Stream #0:0.*?Video: ([^\n]+)/);
    console.log(`=== Video ${i} ===`);
    console.log('Duration:', durMatch ? durMatch[1].trim() : 'unknown');
    console.log('Stream:', streamMatch ? streamMatch[1].trim() : 'unknown');
  }
}
