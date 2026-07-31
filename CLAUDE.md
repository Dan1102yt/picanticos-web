# CLAUDE.md

## Qué es Picanticos
Tienda colombiana de lencería y juegos de mesa para adultos. Rediseño con
dirección editorial premium llamada "Ritual". La compradora objetivo es mujer,
25 a 40 años, en Colombia. La emoción que buscamos es que se sienta poderosa y
dueña de la decisión, no observada. El argumento de venta más importante es la
discreción del envío.

## Stack
React 18 + Vite + TypeScript + Tailwind + Framer Motion + React Router.
Deploy en GitHub Pages con base '/picanticos-web/'.
Cierre de venta por WhatsApp con mensaje precargado. No hay carrito ni pasarela.

## Design tokens
Están en tailwind.config.js y no se cambian sobre la marcha:
noche #0C0609, vino #3B0A2A, granate #8E1E4F, rosa #E36A8B, piel #F3D9C6,
marfil #F7F1EC. Display: Bodoni Moda. Cuerpo: Jost.
Eyebrows: 11px, tracking .34em, uppercase, color rosa.

## Sistema de imágenes
scripts/procesar-fotos.mjs lee de ./fotos-originales/, genera variantes de
480/768/1440 en WebP y JPG en public/img/, y escribe src/data/imagenes.json
con los anchos que realmente existen para cada imagen.
El componente Imagen lee ese manifiesto: nunca se hardcodean anchos ni se usa
onError como fallback. El tipo ClaveImagen vive en src/data/claves.ts.
El logo está excluido del pipeline: se usa directo desde public/img/logo.png.

## Reglas del proyecto
- No hacer commits ni ninguna operación de git. Eso lo hace Oscar desde
  PowerShell.
- No inventar testimonios, nombres de clientas, cifras de ventas ni reseñas.
- No cambiar los slugs de producto: hay links vivos en Instagram y TikTok.
- No cambiar precios ni textos de productos sin que se pidan explícitamente.
- Las composiciones de tela en productos.ts son provisionales y están marcadas.

## Cómo trabajar en este proyecto
- No leer archivos completos si no se van a modificar. Usar búsquedas dirigidas.
- No mostrar el código escrito en la respuesta. Solo el archivo tocado y una
  línea de qué hace.
- Sin preámbulos, sin disculpas, sin explicar las decisiones tomadas.
- Ante cualquier ambigüedad, preguntar en una línea. No adivinar ni construir
  dos versiones alternativas.
- Cerrar cada sesión con: lista de archivos creados o modificados, resultado de
  tsc y build, y problemas encontrados. Nada más.

## Sesiones
- [x] 1 · Setup, tokens, Imagen, Seda, Navbar, Hero, BandaDiscrecion
- [x] 2 · ProductoCard, SeccionLenceria, SeccionJuegos, Revelar
- [x] 3 · Manifiesto de imágenes, ProductoDetalle, useWhatsApp, router
- [x] 4 · Fallback 404, tallas, nosotros, cierre, footer, páginas legales
- [x] 5 · Favicon, SEO, accesibilidad, performance, workflow de deploy
- [ ] 6 · Dominio picanticos.shop

Actualiza esta lista al final de cada sesión.
