// src/data/productos.ts
//
// Los slugs son los mismos del sitio actual: no cambiarlos, hay links vivos
// en la bio de Instagram y TikTok apuntando ahi.
//
// NOTA SOBRE MATERIALES: las composiciones de abajo son las estandar de la
// industria para cada tipo de tela, puestas como provisionales. Reemplazalas
// con lo que digan las etiquetas reales antes de publicar: en Colombia el
// etiquetado de composicion textil es obligatorio y una clienta puede reclamar
// si no coincide.

export type Categoria = 'lenceria' | 'juego'

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
  imagenes: string[]
  colores?: string[]
}

// Las rutas van sin barra inicial y sin extension (Imagen.tsx arma el
// picture con los 3 anchos en webp/jpg). En los componentes:
//   <Imagen base={producto.imagenes[0]} alt={producto.nombre} />

export const productos: Producto[] = [
  {
    slug: 'satin-glow',
    nombre: 'Satín Glow',
    precio: 72000,
    categoria: 'lenceria',
    tipo: 'Set de encaje · 2 piezas',
    sensacion: 'Satín frío al tacto',
    descripcionCorta:
      'Encaje elástico con tira cruzada en la espalda. No marca bajo la ropa.',
    descripcionLarga:
      'La pieza para el día en que no pasa nada especial y aun así quieres saber que la llevas puesta. El encaje cede donde tiene que ceder y sostiene donde importa, sin varillas que se claven. La tira cruzada de la espalda es el detalle que se ve cuando tú decides que se vea.',
    incluye: ['Brasier de encaje', 'Panty a juego'],
    tallas: ['S', 'M', 'L', 'XL'],
    material:
      'Encaje elástico: 90% poliamida, 10% elastano. Detalles y forros en satín.',
    cuidado:
      'Lavar a mano con agua fría y jabón suave. No retorcer, no usar blanqueador ni secadora. Secar a la sombra.',
    imagenes: [
      'img/productos/satin-glow-1',
      'img/productos/satin-glow-2',
      'img/productos/satin-glow-3',
    ],
  },

  {
    slug: 'fuego-nocturno',
    nombre: 'Fuego Nocturno',
    precio: 64000,
    categoria: 'lenceria',
    tipo: 'Set de encaje · 3 colores',
    sensacion: 'Encaje con cuerpo',
    colores: ['Blanco', 'Negro', 'Rojo'],
    descripcionCorta:
      'Set de encaje en blanco, negro o rojo. Tú eliges el tono de la noche.',
    descripcionLarga:
      'El mismo corte en tres versiones, porque no todas las noches piden lo mismo: el blanco para lo que apenas empieza, el negro para lo que ya sabes, el rojo para cuando no hay nada que explicar. Encaje con buen cuerpo, que sostiene sin apretar y no se deforma después de la primera lavada.',
    incluye: ['Brasier de encaje', 'Panty a juego'],
    tallas: ['S', 'M', 'L', 'XL'],
    material: 'Encaje elástico: 90% poliamida, 10% elastano.',
    cuidado:
      'Lavar a mano con agua fría y jabón suave. No usar secadora. Lavar los colores por separado la primera vez.',
    imagenes: [
      'img/productos/fuego-nocturno-1',
      'img/productos/fuego-nocturno-2',
      'img/productos/fuego-nocturno-3',
    ],
  },

  {
    slug: 'luna-traviesa',
    nombre: 'Luna Traviesa',
    precio: 60000,
    categoria: 'lenceria',
    tipo: 'Babydoll + tanga',
    sensacion: 'Ligero, casi aire',
    descripcionCorta:
      'Cae suelto desde el busto y se mueve contigo. Cómodo de verdad.',
    descripcionLarga:
      'Cae desde el busto y no vuelve a tocarte el cuerpo hasta que te mueves. Es la opción para las noches en que no quieres nada apretado y tampoco quieres renunciar a nada. Se pone en dos segundos y se ve como si te hubieras demorado.',
    incluye: ['Babydoll', 'Tanga a juego'],
    tallas: ['Talla única (S a L)'],
    material:
      'Satín: 95% poliéster, 5% elastano. Copas y bordes en encaje de poliamida.',
    cuidado:
      'Lavar a mano con agua fría. No planchar directamente sobre el satín. Secar a la sombra.',
    imagenes: [
      'img/productos/luna-traviesa-1',
      'img/productos/luna-traviesa-2',
      'img/productos/luna-traviesa-3',
    ],
  },

  {
    slug: 'pecado-unico',
    nombre: 'Pecado Único',
    precio: 50000,
    categoria: 'lenceria',
    tipo: 'Kimono + set interior',
    sensacion: 'Peso que abraza',
    descripcionCorta:
      'Kimono corto con cinturón y set en encaje. Funciona solo o encima.',
    descripcionLarga:
      'El kimono tiene el peso justo para sentirse como algo que te pusiste a propósito, no como una bata. Corto, con cinturón que marca la cintura, y un set de encaje debajo. Es la pieza para la que te miras al espejo antes de que la vea alguien más — y esa mirada es la que cuenta.',
    incluye: ['Kimono corto', 'Cinturón', 'Brasier de encaje', 'Panty'],
    tallas: ['S', 'M', 'L'],
    material:
      'Kimono en satín: 95% poliéster, 5% elastano. Set interior en encaje elástico: 90% poliamida, 10% elastano.',
    cuidado:
      'Lavar a mano por separado con agua fría. No retorcer. Planchar el kimono a temperatura baja y por el revés.',
    imagenes: [
      'img/productos/pecado-unico-1',
      'img/productos/pecado-unico-2',
    ],
  },

  {
    slug: 'kimono-malla',
    nombre: 'Kimono Sensual',
    precio: 125000,
    categoria: 'lenceria',
    tipo: 'Kimono de malla · 4 piezas',
    sensacion: 'Transparencia medida',
    descripcionCorta:
      'Kimono, brasier, tanga y ligas. Todo ya combinado, no tienes que armar nada.',
    descripcionLarga:
      'El set completo, pensado como un solo gesto: kimono de malla, brasier, tanga y ligas que ya combinan entre sí. La malla insinúa sin entregarlo todo, que es exactamente el punto. Si vas a comprar una sola pieza en tu vida, que sea la que no te obliga a decidir nada más.',
    incluye: ['Kimono de malla', 'Brasier', 'Tanga', 'Par de ligas'],
    tallas: ['S', 'M', 'L', 'XL'],
    material:
      'Malla elástica: 85% poliamida, 15% elastano. Bandas de las ligas con elastano.',
    cuidado:
      'Lavar a mano con agua fría, preferiblemente dentro de una bolsa de malla. No usar secadora ni planchar la malla.',
    imagenes: [
      'img/productos/kimono-malla-1',
    ],
  },

  {
    slug: 'torre-pasion',
    nombre: 'Torre Pasión',
    precio: 75000,
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
]

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
  transportadora: 'Interrapidísimo',
  bogota: '3 días hábiles',
  nacional: '7 días hábiles',
  costo:
    'El costo depende de tu ciudad y se cotiza al confirmar el pedido. Desde 3 productos, el envío va gratis.',
  contraentrega:
    'Disponible en todas las ciudades. Pagas cuando lo tengas en la mano.',
  discrecion:
    'La caja va sin marca ni descripción del contenido. En la guía de Interrapidísimo solo aparecen la fecha y tu nombre.',
  cambios:
    'Tienes 30 días para cambiar la talla. Escríbenos por WhatsApp y coordinamos.',
}

export const whatsapp = '573054686226'
