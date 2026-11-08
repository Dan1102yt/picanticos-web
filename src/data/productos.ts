// src/data/productos.ts
//
// Los slugs son los mismos del sitio actual: no cambiarlos, hay links vivos
// en la bio de Instagram y TikTok apuntando ahi.
//
// DROPSHIPPING: desde nov-2026 todo el catalogo sale de proveedores en Dropi.
// Las fotos de los productos nuevos vienen del CDN de Dropi; cuando esten
// descargadas en fotos-originales/ y procesadas, reemplazar la URL por la clave.
// Satin Glow, Fuego Nocturno, Luna Traviesa y Pecado Unico salieron del
// catalogo: sus slugs muestran Descontinuado.tsx.
//
// NOTA SOBRE MATERIALES: las composiciones de abajo son las estandar de la
// industria para cada tipo de tela, puestas como provisionales. Reemplazalas
// con lo que digan las etiquetas reales antes de publicar: en Colombia el
// etiquetado de composicion textil es obligatorio y una clienta puede reclamar
// si no coincide.

import type { FotoProducto } from './claves'

export type Categoria = 'pijama' | 'lenceria' | 'juego'

export interface Producto {
  slug: string
  nombre: string
  precio: number
  categoria: Categoria
  tipo: string
  sensacion: string
  descripcionCorta: string
  descripcionLarga: string
  incluye: string[]
  tallas: string[]
  material: string
  cuidado: string
  imagenes: FotoProducto[]
  // Recorte de la foto principal: acerca y centra la parte util de la foto
  // del proveedor (quita marcas de agua o paneles con la referencia).
  encuadre?: { escala: number; origen: string }
  colores?: string[]
}

// Las rutas van sin barra inicial y sin extension (Imagen.tsx arma el
// picture con los 3 anchos en webp/jpg). En los componentes:
//   <Imagen base={producto.imagenes[0]} alt={producto.nombre} />

export const productos: Producto[] = [
  {
    slug: 'noche-lenta',
    nombre: 'Noche Lenta',
    precio: 69900,
    categoria: 'pijama',
    tipo: 'Pijama de satín · short',
    sensacion: 'Satín fresco',
    colores: ['Rojo', 'Rosado', 'Blanco', 'Negro', 'Vinotinto'],
    descripcionCorta:
      'Top de tiras y short en satín con borde de encaje. Para dormir bien y verte mejor.',
    descripcionLarga:
      'La pijama para las noches en que quieres algo que se sienta especial sin pensarlo mucho. Satín liviano que no da calor, top de tiras y un short cómodo con borde de encaje.',
    incluye: ['Top de tiras', 'Short'],
    tallas: ['Talla única'],
    material: 'Satín (composición exacta por confirmar con la etiqueta del proveedor).',
    cuidado: 'Lavar a mano con agua fría y jabón suave. No retorcer ni usar secadora. Planchar a temperatura baja y por el revés.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/2104579/1773197370WhatsApp%20Image%202026-02-02%20at%209.15.30%20AM.jpg',
    ],
  },

  {
    slug: 'aurora',
    nombre: 'Aurora',
    precio: 69900,
    categoria: 'pijama',
    tipo: 'Camisón de satín',
    sensacion: 'Cae suave',
    colores: ['Rojo', 'Blanco', 'Negro', 'Rosado'],
    descripcionCorta:
      'Camisón corto de satín con borde de encaje. Se pone en un segundo y se ve como si te hubieras demorado.',
    descripcionLarga:
      'Un camisón corto de satín para la noche en que no quieres nada apretado. Tiras finas, borde de encaje en el escote y un satín que cae sin pegarse.',
    incluye: ['Camisón de satín'],
    tallas: ['Talla única'],
    material: 'Satín (composición exacta por confirmar con la etiqueta del proveedor).',
    cuidado: 'Lavar a mano con agua fría y jabón suave. No retorcer ni usar secadora. Planchar a temperatura baja y por el revés.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/2104586/1773197929WhatsApp%20Image%202026-02-02%20at%209.14.01%20AM%20(2).jpg',
    ],
  },

  {
    slug: 'brisa',
    nombre: 'Brisa',
    precio: 59900,
    categoria: 'pijama',
    tipo: 'Top de encaje + short de satín',
    sensacion: 'Liviana',
    colores: ['Negra', 'Fucsia', 'Verde', 'Azul'],
    descripcionCorta:
      'Top de encaje y short de satín, en cuatro colores. Tu favorita de todos los días.',
    descripcionLarga:
      'La pijama que terminas usando todas las noches: top de encaje y short de satín liviano. Cuatro colores para elegir el tuyo o regalar el de alguien más.',
    incluye: ['Top de encaje', 'Short de satín'],
    tallas: ['Única', 'M', 'L'],
    material: 'Satín y encaje (composición exacta por confirmar con la etiqueta del proveedor).',
    cuidado: 'Lavar a mano con agua fría y jabón suave. No retorcer ni usar secadora. Planchar a temperatura baja y por el revés.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/2320828/img_6ae3a91385a6a1.59078768_0.jpg',
    ],
  },

  {
    slug: 'medianoche',
    nombre: 'Medianoche',
    precio: 89900,
    categoria: 'lenceria',
    tipo: 'Babydoll + panty',
    sensacion: 'Ligero, casi aire',
    descripcionCorta:
      'Babydoll abierto con lazo al frente y panty de encaje a juego.',
    descripcionLarga:
      'Una pieza para usar cuando tú decides que la noche es especial. Escríbenos por WhatsApp si quieres más fotos o ayuda con la talla antes de pedir.',
    incluye: ['Babydoll', 'Panty de encaje'],
    tallas: [],
    material: 'Encaje (composición exacta por confirmar con la etiqueta del proveedor).',
    cuidado: 'Lavar a mano con agua fría y jabón suave. No retorcer, no usar blanqueador ni secadora. Secar a la sombra.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/1318801/1728316312LC015.png',
    ],
    // La foto trae el logo del proveedor arriba a la izquierda y un panel
    // con la referencia LC015 a la derecha: este recorte los deja por fuera.
    encuadre: { escala: 1.63, origen: '26% 13%' },
  },

  {
    slug: 'liguero-vela',
    nombre: 'Vela',
    precio: 79900,
    categoria: 'lenceria',
    tipo: 'Set con liguero y varilla',
    sensacion: 'Realce con varilla',
    colores: ['Negro', 'Rojo', 'Blanco', 'Azul', 'Bordó'],
    descripcionCorta:
      'Brasier con varilla, panty y liguero. El set completo.',
    descripcionLarga:
      'El set para cuando quieres todo el ritual: brasier con varilla que realza, panty y liguero a juego. Cinco colores para elegir el tono de la noche.',
    incluye: ['Brasier con varilla', 'Panty', 'Liguero'],
    tallas: ['SM', 'LXL'],
    material: 'Encaje (composición exacta por confirmar con la etiqueta del proveedor).',
    cuidado: 'Lavar a mano con agua fría y jabón suave. No retorcer, no usar blanqueador ni secadora. Secar a la sombra.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/1038537/1722628587l-xl%20(2).jpg',
    ],
  },

  {
    slug: 'contorno',
    nombre: 'Contorno',
    precio: 69900,
    categoria: 'lenceria',
    tipo: 'Set de encaje con varilla',
    sensacion: 'Encaje con cuerpo',
    colores: ['Negro', 'Rojo', 'Blanco', 'Azul', 'Turquí', 'Bordó'],
    descripcionCorta:
      'Brasier de encaje con varilla y panty a juego, en seis colores.',
    descripcionLarga:
      'Encaje que sostiene donde importa gracias a la varilla, con panty a juego. Seis colores para que no tengas que elegir solo uno.',
    incluye: ['Brasier de encaje con varilla', 'Panty a juego'],
    tallas: ['SM', 'LXL'],
    material: 'Encaje (composición exacta por confirmar con la etiqueta del proveedor).',
    cuidado: 'Lavar a mano con agua fría y jabón suave. No retorcer, no usar blanqueador ni secadora. Secar a la sombra.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/814883/1714421674sm-l%20xl.jpg',
    ],
  },

  {
    slug: 'velo-blanco',
    nombre: 'Velo Blanco',
    precio: 129900,
    categoria: 'lenceria',
    tipo: 'Conjunto blanco · novias',
    sensacion: 'Para un día único',
    colores: ['Blanco'],
    descripcionCorta:
      'Conjunto de lencería blanco para la noche de bodas o una fecha que merece algo especial.',
    descripcionLarga:
      'Pensado para la noche de bodas, la luna de miel o el aniversario. Blanco de principio a fin, para una fecha que solo pasa una vez.',
    incluye: ['Conjunto de lencería blanco'],
    tallas: ['S', 'M', 'L', 'XL'],
    material: 'Encaje (composición exacta por confirmar con la etiqueta del proveedor).',
    cuidado: 'Lavar a mano con agua fría y jabón suave. No retorcer, no usar blanqueador ni secadora. Secar a la sombra.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/1673176/173963342513.jpg',
    ],
  },

  {
    slug: 'segunda-piel',
    nombre: 'Segunda Piel',
    precio: 54900,
    categoria: 'lenceria',
    tipo: 'Body',
    sensacion: 'Se ajusta al cuerpo',
    descripcionCorta:
      'Body de una pieza que se ajusta al cuerpo. Solo o debajo de una chaqueta.',
    descripcionLarga:
      'Una sola pieza que se ajusta y no necesita nada más. Escríbenos por WhatsApp con tu medida y te decimos si es para ti.',
    incluye: ['Body'],
    tallas: [],
    material: 'Tela elástica (composición exacta por confirmar con la etiqueta del proveedor).',
    cuidado: 'Lavar a mano con agua fría y jabón suave. No retorcer, no usar blanqueador ni secadora. Secar a la sombra.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/2012790/1064cdd8-e780-454e-9689-3e8e5e065016.jpg',
    ],
  },

  {
    slug: 'torre-pasion',
    nombre: 'Torre Pasión',
    precio: 79900,
    categoria: 'juego',
    tipo: 'Juego de mesa · torre de 54 bloques',
    sensacion: '2 jugadores · 45 min',
    descripcionCorta:
      '54 bloques con retos que suben de intensidad. Ustedes deciden hasta dónde.',
    descripcionLarga:
      'Cada bloque que sacas trae un reto, y los retos suben de intensidad a medida que la torre se vuelve inestable. Lo bueno no es el final: es la media hora de risa nerviosa antes de que se caiga. Ustedes deciden hasta qué nivel llegar y cuándo parar.',
    incluye: ['54 bloques numerados', 'Instrucciones', 'Caja de almacenamiento'],
    tallas: [],
    material: 'Madera natural con impresión al calor.',
    cuidado: 'Mantener en lugar seco. Limpiar con paño seco.',
    imagenes: [
      'img/productos/torre-pasion-1',
      'img/productos/torre-pasion-2',
    ],
  },

  {
    slug: 'noche-completa',
    nombre: 'Noche Completa',
    precio: 99900,
    categoria: 'juego',
    tipo: 'Combo · torre de 54 bloques + cartas UNOX',
    sensacion: '2 juegos · 2 jugadores',
    descripcionCorta:
      'La torre de retos y las cartas UNOX en un solo pedido. Dos noches resueltas.',
    descripcionLarga:
      'Para empezar con risas y terminar donde ustedes decidan: la torre de 54 bloques con retos y las cartas UNOX para parejas, juntas en un solo envío.',
    incluye: ['Torre de 54 bloques', 'Cartas UNOX para parejas'],
    tallas: [],
    material: 'Bloques de madera y cartas impresas.',
    cuidado: 'Mantener en lugar seco. Limpiar con paño seco.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/2153606/1779117611Dise%C3%B1o%20sin%20t%C3%ADtulo7.png',
    ],
  },

  {
    slug: 'parques-de-dos',
    nombre: 'Parqués de Dos',
    precio: 49900,
    categoria: 'juego',
    tipo: 'Juego de mesa · parqués para parejas',
    sensacion: 'El clásico, con retos',
    descripcionCorta:
      'El parqués de siempre, con casillas de retos para dos.',
    descripcionLarga:
      'Las reglas que ya conocen, con casillas que cambian el juego. Ideal para una noche en casa sin plan.',
    incluye: ['Juego de parqués para parejas'],
    tallas: [],
    material: 'Tablero impreso.',
    cuidado: 'Mantener en lugar seco.',
    imagenes: [
      'https://d39ru7awumhhs2.cloudfront.net/colombia/products/1948361/1759443056Juegos%20eroticos%20(13).png',
    ],
  },
]

export const pijamas = productos.filter((p) => p.categoria === 'pijama')
export const lenceria = productos.filter((p) => p.categoria === 'lenceria')
export const juegos = productos.filter((p) => p.categoria === 'juego')

export const porSlug = (slug: string) => productos.find((p) => p.slug === slug)

export const relacionados = (slug: string, limite = 3) => {
  const actual = porSlug(slug)
  if (!actual) return []
  return productos
    .filter((p) => p.slug !== slug && p.categoria === actual.categoria)
    .slice(0, limite)
}

export const formatearPrecio = (valor: number) =>
  `$${valor.toLocaleString('es-CO')}`

// Datos de envio: se usan en el acordeon de cada ficha y en la pagina /envios
export const envio = {
  transportadora:
    'Interrapidísimo, Servientrega, Coordinadora o Envía, según tu ciudad',
  bogota: '3 días hábiles',
  nacional: '7 días hábiles',
  costo:
    'El costo depende de tu ciudad y te lo confirmamos por WhatsApp antes de despachar.',
  contraentrega:
    'Disponible en todas las ciudades. Pagas cuando lo tengas en la mano.',
  discrecion:
    'La caja va sin marca ni descripción del contenido.',
  cambios:
    'Si la talla no te queda, escríbenos por WhatsApp en los 5 días siguientes a recibir tu pedido y coordinamos el cambio. El envío de ida y vuelta del cambio corre por tu cuenta.',
}

export const whatsapp = '573054686226'

// picanticos.shop esta vencido (nov-2026): mientras se renueva, todos los
// enlaces (WhatsApp, canonical, sitemap) apuntan a GitHub Pages.
export const SITE_URL = 'https://dan1102yt.github.io/picanticos-web'

export const redes = {
  instagram: 'https://www.instagram.com/picanticosshop/',
  tiktok: 'https://www.tiktok.com/@picanticosshop',
}
