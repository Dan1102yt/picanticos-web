# CLAUDE.md

## Qué es Picanticos
Tienda colombiana de lencería y juegos de mesa para adultos. Rediseño con
dirección editorial premium llamada "Ritual". La compradora objetivo es mujer,
25 a 40 años, en Colombia. La emoción que buscamos es que se sienta poderosa y
dueña de la decisión, no observada. El argumento de venta más importante es la
discreción del envío.

## Stack
React 19 + Vite + TypeScript + Tailwind + Motion (framer-motion) + Lenis + React Router
(router de datos: las rutas viven en App.tsx -> rutas, no en <Routes>).
Deploy en GitHub Pages con dominio propio picanticosshop.com (base '/').
Cierre de venta por WhatsApp con mensaje precargado. No hay carrito ni pasarela.
El empaque es una bolsa sellada sin marca: nunca escribir "caja".

## Design tokens
Están en tailwind.config.js y no se cambian sobre la marcha:
noche #0C0609, vino #3B0A2A, granate #8E1E4F, rosa #E36A8B, piel #F3D9C6,
marfil #F7F1EC. Display: Bodoni Moda. Cuerpo: Jost.
Eyebrows: 12px, tracking .26em, uppercase, color rosa. Cuerpo en Jost 400
(no 300) y textos secundarios con opacidad mínima de 75%, por legibilidad.

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
- [x] 6 · Dominio propio picanticosshop.com (Hostinger, 3 años): base '/',
      public/CNAME, SITE_URL, sitemap y robots. picanticos.shop se dejo vencer.
- [x] 7 · Kimono Sensual (kimono-malla) descontinuado: fuera de productos.ts,
      /kimono-malla y /producto/kimono-malla ahora muestran
      src/pages/Descontinuado.tsx
- [x] 8 · Dropshipping con Dropi: catálogo nuevo (3 pijamas, 5 lencería,
      3 juegos), sección Pijamas, fotos desde el CDN de Dropi (Imagen acepta
      URL https), 4 prendas viejas a Descontinuado, promesas corregidas
      (sin "+1.000 pedidos", sin cambio gratis 30 días, sin "empacamos en casa")
- [x] 9 · Fotos por color en fotos-originales/ (<slug>-<color>.jpg), procesadas;
      la ficha cambia de foto al elegir color (fotosPorColor en productos.ts).
      Medianoche y Velo Blanco siguen con foto del CDN de Dropi.
- [x] 10 · Movimiento premium: curvas en src/lib/movimiento.ts (ease-out para
      entradas, ease-in-out para movimientos, resortes para cursor), Lenis
      (scroll suave en computador), View Transitions (la foto viaja de la
      tarjeta a la ficha), títulos por máscara, marquesina, sección fijada
      "Así de simple" (SeccionRitual), tarjetas con inclinación 3D y segunda
      foto al pasar el mouse, barra fija de compra en la ficha, grano.
      Todo respeta "reducir movimiento". BandaDiscrecion ya no se usa.
      img/empaque NO se usa: la caja tiene logo y la promesa es caja neutra.
- [x] 11 · Empaque real: bolsa sellada sin marca (no caja). Pagos: contraentrega,
      Nequi o Llave (datos solo por WhatsApp, nunca en la web). Envío gratis
      con 3 prendas (envio.gratisDesde). Barra de anuncio, WhatsApp flotante
      (oculto en la ficha), accesos por categoría. Ficha nueva: galería con
      deslizar/zoom, muestras de color reales, guía de tallas en panel, total
      desglosado, fila de confianza, preguntas frecuentes, carrusel.

## Reglas de movimiento
- Solo animar transform, opacity y clip-path.
- Entradas con EASE_OUT; lo que se mueve en pantalla con EASE_IN_OUT.
- UI (botones, chips) 150-300 ms; entradas editoriales hasta ~1 s.
- Hover/tilt/imán solo con puntero fino (tienePunteroFino()).
- Nada de urgencia falsa: sin contadores, sin "quedan 2", sin "X personas viendo".

Actualiza esta lista al final de cada sesión.
