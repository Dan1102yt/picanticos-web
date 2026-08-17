// Script de un solo uso: procesa las fotos originales del catálogo Picanticosshop.
// Lee de fotos-originales/ (solo lectura) y escribe los derivados en public/img.
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PKG_PATH = path.join(ROOT, 'package.json');
const SOURCE_DIR = path.join(ROOT, 'fotos-originales');
const PRODUCTOS_DIR = path.join(ROOT, 'public', 'img', 'productos');
const IMG_DIR = path.join(ROOT, 'public', 'img');
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'imagenes.json');

const EXCLUDE_DIRS = new Set(['node_modules', 'public', 'scripts', '.git', '.claude']);
const EXCLUDE_FILES = new Set(['package.json', 'package-lock.json', '.gitignore']);
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.heic', '.heif']);

const PRODUCT_KEYS = [
  'satin-glow',
  'luna-traviesa',
  'pecado-unico',
  'torre-pasion',
  'fuego-nocturno',
];
const SITE_KEYS = ['hero', 'nosotros', 'empaque'];
const TARGET_WIDTHS = [480, 768, 1440];

// Nombres que nunca deben procesarse aunque coincidan con un patrón conocido.
// "logo" ya está resuelto a mano en public/img/logo.png (alta resolución,
// fondo transparente) y se usa directo con <img>, sin generar derivados.
const EXCLUDED_KEYS = ['logo'];

// --- 1. package.json + devDependencies ---------------------------------

function ensurePackageJson() {
  if (!existsSync(PKG_PATH)) {
    const pkg = {
      name: 'picanticosshop',
      version: '1.0.0',
      private: true,
      type: 'module',
      scripts: { fotos: 'node scripts/procesar-fotos.mjs' },
    };
    writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n');
    console.log('package.json creado.');
    return;
  }
  const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf8'));
  pkg.scripts ??= {};
  if (pkg.scripts.fotos !== 'node scripts/procesar-fotos.mjs') {
    pkg.scripts.fotos = 'node scripts/procesar-fotos.mjs';
    writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n');
    console.log('Script "fotos" agregado a package.json.');
  }
}

function isInstalled(dep) {
  return existsSync(path.join(ROOT, 'node_modules', dep));
}

function ensureDeps() {
  const missing = ['sharp', 'heic-convert'].filter((d) => !isInstalled(d));
  if (missing.length) {
    console.log(`Instalando dependencias (devDependencies): ${missing.join(', ')}...`);
    execSync(`npm install -D ${missing.join(' ')}`, { cwd: ROOT, stdio: 'inherit' });
  } else {
    console.log('sharp y heic-convert ya están instalados.');
  }
}

// --- helpers de nombres --------------------------------------------------

function normalizeName(raw) {
  let s = raw.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  s = s.toLowerCase();
  s = s.replace(/[\s_]+/g, '-');
  s = s.replace(/[^a-z0-9-]+/g, '');
  s = s.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  return s;
}

function applyRenames(name) {
  return name.replace(/^kimono-sensual/, 'kimono-malla');
}

function classify(base) {
  for (const key of PRODUCT_KEYS) {
    if (base === key || base.startsWith(key + '-')) return { category: 'product', key };
  }
  for (const key of SITE_KEYS) {
    if (base === key || base.startsWith(key + '-')) return { category: 'site', key };
  }
  return null;
}

// --- main ------------------------------------------------------------------

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(
      `No existe la carpeta "${path.relative(ROOT, SOURCE_DIR)}". Crea "fotos-originales/" en la raíz del proyecto y pon ahí las fotos antes de correr este script.`
    );
    process.exit(1);
  }

  ensurePackageJson();
  ensureDeps();

  const { default: sharp } = await import('sharp');
  const { default: heicConvert } = await import('heic-convert');

  mkdirSync(PRODUCTOS_DIR, { recursive: true });
  mkdirSync(IMG_DIR, { recursive: true });

  // 2. Reportar extensiones encontradas antes de procesar nada.
  const entries = readdirSync(SOURCE_DIR, { withFileTypes: true }).filter(
    (e) => e.isFile() && !EXCLUDE_FILES.has(e.name)
  );

  const extCounts = new Map();
  for (const e of entries) {
    const ext = path.extname(e.name).toLowerCase() || '(sin extensión)';
    extCounts.set(ext, (extCounts.get(ext) || 0) + 1);
  }
  console.log('\nExtensiones encontradas en la carpeta origen:');
  for (const [ext, count] of extCounts) {
    console.log(`  ${ext}: ${count}`);
  }
  console.log('');

  const imageFiles = entries.filter((e) => IMAGE_EXTS.has(path.extname(e.name).toLowerCase()));
  const skippedExt = entries.filter((e) => !IMAGE_EXTS.has(path.extname(e.name).toLowerCase()));
  for (const e of skippedExt) {
    console.log(`Ignorado (extensión no soportada): ${e.name}`);
  }

  const usedBases = new Map(); // base final -> archivo origen
  const productsFound = new Set();
  const unclassified = [];
  const noOutputFiles = [];
  const rows = [];
  const manifiesto = {};

  for (const entry of imageFiles) {
    const file = entry.name;
    const fullPath = path.join(SOURCE_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const originalBuffer = readFileSync(fullPath);

    // 3. Convertir HEIC/HEIF a JPG antes de seguir.
    let workingBuffer = originalBuffer;
    if (ext === '.heic' || ext === '.heif') {
      console.log(`Convirtiendo HEIC/HEIF a JPG: ${file}`);
      const converted = await heicConvert({ buffer: originalBuffer, format: 'JPEG', quality: 1 });
      workingBuffer = Buffer.from(converted);
    }

    // 4. Normalizar nombre.
    const rawBase = path.basename(file, ext);
    let normalized = normalizeName(rawBase);
    normalized = applyRenames(normalized);

    if (!normalized) {
      console.log(`Ignorado (nombre vacío tras normalizar): ${file}`);
      continue;
    }

    if (EXCLUDED_KEYS.some((key) => normalized === key || normalized.startsWith(key + '-'))) {
      console.log(`Ignorado (en lista de exclusión): ${file}`);
      continue;
    }

    // 5. Clasificar.
    const classification = classify(normalized);
    if (!classification) {
      unclassified.push(file);
      console.log(`Ignorado (no coincide con ningún producto/sección conocida): ${file}`);
      continue;
    }

    // Evitar colisiones de nombre final entre distintos archivos origen
    // (p. ej. logo.avif y logo.jpg normalizan ambos a "logo").
    let finalBase = normalized;
    if (usedBases.has(finalBase)) {
      let n = 2;
      while (usedBases.has(`${normalized}-${n}`)) n++;
      finalBase = `${normalized}-${n}`;
      console.log(
        `Nombre duplicado "${normalized}" (origen: ${usedBases.get(normalized)} y ${file}). Usando "${finalBase}" para este último.`
      );
    }
    usedBases.set(finalBase, file);

    if (classification.category === 'product') {
      productsFound.add(classification.key);
    }

    const outDir = classification.category === 'product' ? PRODUCTOS_DIR : IMG_DIR;

    // 6. Generar 3 anchos en WebP y JPG, sin agrandar el original.
    const meta = await sharp(workingBuffer).metadata();
    const originalWidth = meta.width ?? 0;
    const originalHeight = meta.height ?? 0;
    let generatedForThisFile = 0;
    const anchosGenerados = [];

    for (const width of TARGET_WIDTHS) {
      if (width > originalWidth) {
        console.log(
          `Salto ${finalBase}-${width}: el original (${originalWidth}px) es más chico que ${width}px.`
        );
        continue;
      }

      const webpPath = path.join(outDir, `${finalBase}-${width}.webp`);
      const webpInfo = await sharp(workingBuffer)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(webpPath);
      rows.push({
        'Archivo original': file,
        'Nombre final': path.basename(webpPath),
        Dimensiones: `${webpInfo.width}x${webpInfo.height}`,
        'Peso (KB)': (webpInfo.size / 1024).toFixed(1),
      });

      const jpgPath = path.join(outDir, `${finalBase}-${width}.jpg`);
      const jpgInfo = await sharp(workingBuffer)
        .resize({ width, withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(jpgPath);
      rows.push({
        'Archivo original': file,
        'Nombre final': path.basename(jpgPath),
        Dimensiones: `${jpgInfo.width}x${jpgInfo.height}`,
        'Peso (KB)': (jpgInfo.size / 1024).toFixed(1),
      });

      generatedForThisFile += 1;
      anchosGenerados.push(width);
    }

    if (generatedForThisFile === 0) {
      noOutputFiles.push({ file, originalWidth });
    } else {
      const relBase =
        classification.category === 'product'
          ? `img/productos/${finalBase}`
          : `img/${finalBase}`;
      manifiesto[relBase] = {
        widths: anchosGenerados,
        w: originalWidth,
        h: originalHeight,
      };
    }
  }

  // 7.5 Escribir el manifiesto de imágenes, con claves ordenadas alfabéticamente.
  mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  const manifiestoOrdenado = Object.fromEntries(
    Object.keys(manifiesto)
      .sort()
      .map((key) => [key, manifiesto[key]])
  );
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifiestoOrdenado, null, 2) + '\n');
  console.log(`\nManifiesto de imágenes escrito en ${path.relative(ROOT, MANIFEST_PATH)}.`);

  // 7. Tabla final + aviso de productos sin fotos.
  console.log('\nResultado del procesamiento:');
  console.table(rows);

  const missingProducts = PRODUCT_KEYS.filter((key) => !productsFound.has(key));
  if (missingProducts.length) {
    console.log(`\n⚠ Productos sin fotos: ${missingProducts.join(', ')}`);
  } else {
    console.log('\nTodos los productos tienen al menos una foto.');
  }

  if (unclassified.length) {
    console.log(`\nArchivos no clasificados (revisar manualmente): ${unclassified.join(', ')}`);
  }

  if (noOutputFiles.length) {
    console.log(
      `\n⚠ Archivos sin ningún derivado generado (el original es más chico que el ancho mínimo de ${TARGET_WIDTHS[0]}px, se necesita un original de mayor resolución):`
    );
    for (const { file, originalWidth } of noOutputFiles) {
      console.log(`  - ${file} (${originalWidth}px de ancho)`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
