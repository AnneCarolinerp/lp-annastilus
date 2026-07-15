#!/usr/bin/env node
'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const specsPath = path.join(__dirname, 'image-specs.json');

function coverPosition(focal = { x: 0.5, y: 0.5 }) {
  const x = Math.min(1, Math.max(0, Number(focal.x ?? 0.5)));
  const y = Math.min(1, Math.max(0, Number(focal.y ?? 0.5)));
  return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}

async function processVariant(sourcePath, image, variant, size) {
  const [width, height] = size;
  const outputDir = path.join(root, 'assets', 'images', variant);
  await fs.mkdir(outputDir, { recursive: true });

  const base = sharp(sourcePath).extract(image.crop).resize({
    width,
    height,
    fit: 'cover',
    position: coverPosition(image.focal),
    withoutEnlargement: false
  });

  const webpPath = path.join(outputDir, `${image.id}-${variant}.webp`);
  const avifPath = path.join(outputDir, `${image.id}-${variant}.avif`);

  await Promise.all([
    base.clone().webp({ quality: 82, effort: 6 }).toFile(webpPath),
    base.clone().avif({ quality: 52, effort: 7 }).toFile(avifPath)
  ]);

  return {
    id: image.id,
    variant,
    source: path.relative(root, sourcePath).replaceAll(path.sep, '/'),
    webp: path.relative(root, webpPath).replaceAll(path.sep, '/'),
    avif: path.relative(root, avifPath).replaceAll(path.sep, '/'),
    width,
    height,
    aspectRatio: Number((width / height).toFixed(4)),
    focalPoint: image.focal
  };
}

async function main() {
  const specs = JSON.parse(await fs.readFile(specsPath, 'utf8'));
  const sourcePath = path.join(root, specs.source);
  await fs.access(sourcePath);

  const manifest = [];
  for (const image of specs.images) {
    for (const [variant, size] of Object.entries(image.sizes)) {
      manifest.push(await processVariant(sourcePath, image, variant, size));
      process.stdout.write(`✓ ${image.id} (${variant})\n`);
    }
  }

  const manifestPath = path.join(root, 'assets', 'images', 'image-manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify({
    sourceNotice: 'Os arquivos atuais foram recortados da prancha visual fornecida. Substitua-os por fotografias originais em alta resolução antes da publicação final, quando disponíveis.',
    items: manifest
  }, null, 2));
  process.stdout.write(`\nManifesto atualizado: ${path.relative(root, manifestPath)}\n`);
}

main().catch((error) => {
  console.error('Falha ao processar imagens:', error.message);
  process.exitCode = 1;
});
