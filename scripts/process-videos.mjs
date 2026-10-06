import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const ffmpeg = ffmpegInstaller.path;

const videos = [
  { id: 1, file: 'scratch/videos/video-1.mp4', label: 'Vidéo 1 (Dépannage / Pompe)' },
  { id: 2, file: 'scratch/videos/video-2.mp4', label: 'Vidéo 2 (Installation Clim)' },
  { id: 3, file: 'scratch/videos/video-3.mp4', label: 'Vidéo 3 (Intervention Électricité)' },
  { id: 4, file: 'scratch/videos/video-4.mp4', label: 'Vidéo 4 (Câblage & Sécurité)' },
  { id: 5, file: 'scratch/videos/video-5.mp4', label: 'Vidéo 5 (Maintenance)' },
  { id: 6, file: 'scratch/videos/video-6.mp4', label: 'Vidéo 6 (Chantier / Réparation)' },
];

const outDir = path.resolve('public/assets');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function getFrameSharpness(videoPath, timeSec) {
  const tmpImg = path.resolve(`scratch/tmp_${Date.now()}_${Math.random().toString(36).substring(7)}.png`);
  try {
    execSync(`"${ffmpeg}" -ss ${timeSec} -i "${videoPath}" -vframes 1 -q:v 2 "${tmpImg}" -y 2>&1`, { stdio: 'pipe' });
    if (!fs.existsSync(tmpImg)) return { score: 0, tmpImg: null };

    const { data } = await sharp(tmpImg)
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
    return { score: 0, tmpImg: null };
  }
}

async function findBestFrame(videoPath, maxScanSec = 15) {
  let bestScore = -1;
  let bestTime = 1;
  let bestTmpPath = null;

  for (let t = 1; t <= maxScanSec; t += 1.0) {
    const { score, tmpImg } = await getFrameSharpness(videoPath, t);
    if (score > bestScore && tmpImg) {
      if (bestTmpPath && fs.existsSync(bestTmpPath)) fs.unlinkSync(bestTmpPath);
      bestScore = score;
      bestTime = t;
      bestTmpPath = tmpImg;
    } else {
      if (tmpImg && fs.existsSync(tmpImg)) fs.unlinkSync(tmpImg);
    }
  }

  return { bestScore, bestTime, bestTmpPath };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function main() {
  console.log('=== TRAITEMENT DES 6 VIDÉOS ===\n');
  const results = [];

  for (const v of videos) {
    console.log(`--- Traitement de ${v.label} (${v.file}) ---`);
    if (!fs.existsSync(v.file)) {
      console.error(`Fichier introuvable: ${v.file}`);
      continue;
    }

    // 1. Trouver la frame la plus nette
    console.log(`Scan de netteté en cours...`);
    const { bestScore, bestTime, bestTmpPath } = await findBestFrame(v.file, 15);
    console.log(`> Meilleure netteté: score = ${bestScore} à t=${bestTime}s`);

    // 2. Exporter le poster WebP
    const posterPath = path.join(outDir, `video-${v.id}-poster.webp`);
    if (bestTmpPath && fs.existsSync(bestTmpPath)) {
      await sharp(bestTmpPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(posterPath);
      fs.unlinkSync(bestTmpPath);
    } else {
      // Fallback
      execSync(`"${ffmpeg}" -ss 1 -i "${v.file}" -vframes 1 -vf "scale='min(720,iw)':-2" "${posterPath}" -y 2>&1`, { stdio: 'pipe' });
    }
    const posterSize = fs.statSync(posterPath).size;
    console.log(`> Poster généré: ${posterPath} (${formatBytes(posterSize)})`);

    // 3. Version compressée MP4 (H.264, max 720p, sans audio)
    const previewPath = path.join(outDir, `video-${v.id}-preview.mp4`);
    console.log(`Compression MP4 (H.264 max 720p sans audio)...`);
    execSync(
      `"${ffmpeg}" -i "${v.file}" -an -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 26 -preset slow -movflags +faststart "${previewPath}" -y 2>&1`,
      { stdio: 'pipe' }
    );
    const previewSize = fs.statSync(previewPath).size;
    console.log(`> Aperçu MP4 généré: (${formatBytes(previewSize)})`);

    // 4. Boucle muette de 3.5 secondes
    const loopPath = path.join(outDir, `video-${v.id}-loop.mp4`);
    console.log(`Génération de la boucle 3.5s...`);
    execSync(
      `"${ffmpeg}" -ss ${bestTime} -i "${v.file}" -t 3.5 -an -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 28 -preset fast -movflags +faststart "${loopPath}" -y 2>&1`,
      { stdio: 'pipe' }
    );
    const loopSize = fs.statSync(loopPath).size;
    console.log(`> Boucle 3.5s générée: (${formatBytes(loopSize)})\n`);

    results.push({
      id: v.id,
      label: v.label,
      sharpnessScore: bestScore,
      bestTimestamp: `${bestTime}s`,
      posterFile: `public/assets/video-${v.id}-poster.webp`,
      posterSize: formatBytes(posterSize),
      posterSizeBytes: posterSize,
      previewFile: `public/assets/video-${v.id}-preview.mp4`,
      previewSize: formatBytes(previewSize),
      loopFile: `public/assets/video-${v.id}-loop.mp4`,
      loopSize: formatBytes(loopSize)
    });
  }

  // Sauvegarde du rapport
  fs.writeFileSync('scratch/videos_report.json', JSON.stringify(results, null, 2));

  console.log('=== CLASSEMENT PAR NETTETÉ DES POSTERS ===');
  const sorted = [...results].sort((a, b) => b.sharpnessScore - a.sharpnessScore);
  sorted.forEach((r, idx) => {
    console.log(`${idx + 1}. Vidéo ${r.id} (${r.label}) - Score: ${r.sharpnessScore} (à ${r.bestTimestamp}) | Poster: ${r.posterSize} | Boucle: ${r.loopSize} | Preview: ${r.previewSize}`);
  });
}

main().catch(console.error);
