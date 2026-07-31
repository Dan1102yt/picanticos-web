// Script de un solo uso (corre en cada build): genera public/sitemap.xml y
// public/robots.txt a partir de src/data/productos.ts, para que no queden
// desactualizados cuando se agregue o quite un producto.
//
// Usa el servidor de Vite en modo middleware solo para transformar
// productos.ts (TypeScript) a un módulo evaluable, sin depender de que el
// Node que corre esto sepa leer TypeScript de forma nativa.
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const RUTAS_FIJAS = ['/', '/envios', '/cambios', '/privacidad'];

async function main() {
  const server = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  });

  let productos, SITE_URL;
  try {
    const mod = await server.ssrLoadModule('/src/data/productos.ts');
    productos = mod.productos;
    SITE_URL = mod.SITE_URL;
  } finally {
    await server.close();
  }

  const rutasProductos = productos.map((p) => `/producto/${p.slug}`);
  const rutas = [...RUTAS_FIJAS, ...rutasProductos];

  const urls = rutas
    .map((ruta) => {
      const loc = `${SITE_URL}${ruta}`;
      const prioridad = ruta === '/' ? '1.0' : '0.7';
      return `  <url>\n    <loc>${loc}</loc>\n    <priority>${prioridad}</priority>\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
  console.log(`Escrito public/sitemap.xml con ${rutas.length} rutas.`);

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
  console.log('Escrito public/robots.txt.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
