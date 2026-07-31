// Script de un solo uso: genera favicon.ico, apple-touch-icon.png,
// icon-192.png e icon-512.png a partir de public/img/logo.png, compuestos
// sobre el fondo #0C0609 (el logo tiene fondo transparente y el sitio es
// oscuro, así que sin esto los iconos se ven mal en pantallas claras).
import { existsSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOGO_PATH = path.join(ROOT, 'public', 'img', 'logo.png');
const PUBLIC_DIR = path.join(ROOT, 'public');

const FONDO = '#0C0609';

function isInstalled(dep) {
  return existsSync(path.join(ROOT, 'node_modules', dep));
}

function ensureDeps() {
  const missing = ['png-to-ico'].filter((d) => !isInstalled(d));
  if (missing.length) {
    console.log(`Instalando dependencias (devDependencies): ${missing.join(', ')}...`);
    execSync(`npm install -D ${missing.join(' ')}`, { cwd: ROOT, stdio: 'inherit' });
  }
}

// Compone el logo centrado, con margen, sobre un cuadrado de fondo sólido.
async function componer(sharp, size) {
  const logoSize = Math.round(size * 0.72);
  const logo = await sharp(LOGO_PATH)
    .resize({ width: logoSize, height: logoSize, fit: 'inside' })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: FONDO,
    },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toBuffer();
}

async function main() {
  if (!existsSync(LOGO_PATH)) {
    console.error(`No existe "${path.relative(ROOT, LOGO_PATH)}". Genera o coloca el logo antes de correr este script.`);
    process.exit(1);
  }

  ensureDeps();

  const { default: sharp } = await import('sharp');
  const { default: pngToIco } = await import('png-to-ico');

  // png-to-ico espera un PNG cuadrado de 256px: a partir de ahí genera él
  // mismo las variantes de 48/32/16 dentro del .ico con mejor calidad que si
  // le diéramos ya un 32x32 (evita reescalar dos veces).
  const png256 = await componer(sharp, 256);
  const icoBuffer = await pngToIco(png256);
  writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
  console.log('Escrito public/favicon.ico (16/32/48/256).');

  const png180 = await componer(sharp, 180);
  writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), png180);
  console.log('Escrito public/apple-touch-icon.png (180x180).');

  const png192 = await componer(sharp, 192);
  writeFileSync(path.join(PUBLIC_DIR, 'icon-192.png'), png192);
  console.log('Escrito public/icon-192.png (192x192).');

  const png512 = await componer(sharp, 512);
  writeFileSync(path.join(PUBLIC_DIR, 'icon-512.png'), png512);
  console.log('Escrito public/icon-512.png (512x512).');

  const manifest = {
    name: 'Picanticos',
    short_name: 'Picanticos',
    theme_color: FONDO,
    background_color: FONDO,
    display: 'standalone',
    icons: [
      { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
  writeFileSync(
    path.join(PUBLIC_DIR, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2) + '\n'
  );
  console.log('Escrito public/site.webmanifest.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
