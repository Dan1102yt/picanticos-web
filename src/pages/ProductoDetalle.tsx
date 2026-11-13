import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import {
  SITE_URL,
  envio,
  formatearPrecio,
  porSlug,
  productos,
  relacionados,
  whatsapp,
  type Producto,
} from '../data/productos'
import Imagen from '../components/Imagen'
import { esUrlExterna, type FotoProducto } from '../data/claves'
import ProductoCard from '../components/ProductoCard'
import TextoMascara from '../components/TextoMascara'
import { TABLA_TALLAS } from '../components/SeccionTallas'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { EASE_IN_OUT, EASE_OUT, tienePunteroFino } from '../lib/movimiento'
import { irA, pausarScroll, reanudarScroll } from '../lib/scroll'

// Cada bloque de la ficha entra en cascada: sube 16px y aparece.
const ITEM = {
  oculto: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

// Color real de cada opción para pintar la muestra (círculo).
const TONOS: Record<string, string> = {
  Rojo: '#B3122E',
  Rosado: '#F2A7B8',
  Blanco: '#F7F3EE',
  Negro: '#141012',
  Negra: '#141012',
  Vinotinto: '#5A0F24',
  Bordó: '#6D0F2A',
  Fucsia: '#D6247A',
  Verde: '#2F6B4F',
  Azul: '#2C4A9A',
  Turquí: '#1BB0BE',
}

export default function ProductoDetalle() {
  const { slug } = useParams<{ slug: string }>()
  const producto = slug ? porSlug(slug) : undefined

  if (!producto) {
    return <Navigate to="/" replace />
  }

  return <FichaProducto key={producto.slug} producto={producto} />
}

const CATEGORIA_LABEL: Record<Producto['categoria'], string> = {
  pijama: 'Pijamas',
  lenceria: 'Lencería',
  juego: 'Juegos',
}
const CATEGORIA_ANCLA: Record<Producto['categoria'], string> = {
  pijama: 'pijamas',
  lenceria: 'lenceria',
  juego: 'juegos',
}

type SeccionId = 'material' | 'envio' | 'pago' | 'discrecion' | 'cambios'

function FichaProducto({ producto }: { producto: Producto }) {
  const reducirMovimiento = useReducedMotion()
  const [indiceActivo, setIndiceActivo] = useState(0)
  const [direccion, setDireccion] = useState(1)
  const [colorSeleccionado, setColorSeleccionado] = useState(producto.colores?.[0])
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | undefined>(undefined)
  const [seccionAbierta, setSeccionAbierta] = useState<SeccionId | null>(null)
  const [guiaAbierta, setGuiaAbierta] = useState(false)
  const cerrarGuia = useCallback(() => setGuiaAbierta(false), [])
  const galeriaRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const [ctaFuera, setCtaFuera] = useState(false)

  // Cuando el botón principal sale de pantalla, aparece la barra fija de abajo.
  useEffect(() => {
    const cta = ctaRef.current
    if (!cta) return
    const obs = new IntersectionObserver(([e]) => {
      setCtaFuera(!e.isIntersecting && e.boundingClientRect.top < window.innerHeight)
    })
    obs.observe(cta)
    return () => obs.disconnect()
  }, [])

  const urlWhatsApp = useWhatsApp({
    producto,
    talla: tallaSeleccionada,
    color: colorSeleccionado,
  })

  const fotoDelColor = colorSeleccionado
    ? producto.fotosPorColor?.[colorSeleccionado]
    : undefined
  const imagenes =
    fotoDelColor && !producto.imagenes.includes(fotoDelColor)
      ? [fotoDelColor, ...producto.imagenes]
      : producto.imagenes
  const usaEncuadre = imagenes[indiceActivo] === producto.imagenes[0]

  const irAFoto = (indice: number) => {
    const total = imagenes.length
    const destino = (indice + total) % total
    setDireccion(destino > indiceActivo || (indiceActivo === total - 1 && destino === 0) ? 1 : -1)
    setIndiceActivo(destino)
  }

  // Elegir un color muestra su foto; tocar la miniatura de un color lo
  // selecciona, para que foto y color nunca queden desincronizados.
  const elegirColor = (color: string) => {
    setColorSeleccionado(color)
    const foto = producto.fotosPorColor?.[color]
    if (!foto) return
    const indice = imagenes.indexOf(foto)
    irAFoto(indice >= 0 ? indice : 0)
    // En celular la foto queda arriba, fuera de vista: subir hasta ella.
    const galeria = galeriaRef.current
    if (galeria && galeria.getBoundingClientRect().bottom < 80) {
      irA(galeria, { inmediato: !!reducirMovimiento })
    }
  }

  const elegirFoto = (indice: number) => {
    irAFoto(indice)
    const color = Object.entries(producto.fotosPorColor ?? {}).find(
      ([, foto]) => foto === imagenes[indice]
    )?.[0]
    if (color) setColorSeleccionado(color)
  }

  const necesitaTalla = producto.tallas.length > 1
  const faltaTalla = necesitaTalla && !tallaSeleccionada
  const esPrenda = producto.categoria !== 'juego'

  // Primero los de su misma categoría, luego el resto, para llenar el carrusel.
  const mismos = relacionados(producto.slug, 6)
  const sugeridos = [
    ...mismos,
    ...productos.filter((p) => p.slug !== producto.slug && !mismos.includes(p)),
  ].slice(0, 6)

  const titulo = `${producto.nombre} · ${producto.tipo} | Picanticos`
  const ogImage = esUrlExterna(producto.imagenes[0])
    ? producto.imagenes[0]
    : `${SITE_URL}/${producto.imagenes[0]}-768.jpg`
  const canonical = `${SITE_URL}/producto/${producto.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: producto.nombre,
    description: producto.descripcionCorta,
    image: ogImage,
    sku: producto.slug,
    brand: { '@type': 'Brand', name: 'Picanticos' },
    offers: {
      '@type': 'Offer',
      url: canonical,
      price: producto.precio,
      priceCurrency: 'COP',
      availability: 'https://schema.org/InStock',
    },
  }

  const toggleSeccion = (id: SeccionId) =>
    setSeccionAbierta((actual) => (actual === id ? null : id))

  const altFoto = `${producto.nombre}, ${producto.tipo.toLowerCase()}${
    fotoDelColor ? `, color ${colorSeleccionado?.toLowerCase()}` : ''
  }`

  return (
    <>
      <Helmet>
        <title>{titulo}</title>
        <meta name="description" content={producto.descripcionCorta} />
        <meta property="og:title" content={titulo} />
        <meta property="og:description" content={producto.descripcionCorta} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={ogImage} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="px-5 pb-16 pt-8 md:pb-[110px] md:pt-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[56%_44%] md:gap-[56px]">
          <div ref={galeriaRef} className="scroll-mt-[90px]">
            <Galeria
              imagenes={imagenes}
              indice={indiceActivo}
              direccion={direccion}
              onIr={irAFoto}
              onElegir={elegirFoto}
              alt={altFoto}
              nombre={producto.nombre}
              encuadre={usaEncuadre ? producto.encuadre : undefined}
            />
          </div>

          {/* Información */}
          <motion.div
            className="md:sticky md:top-24 md:self-start"
            initial="oculto"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
          >
            <motion.nav variants={ITEM} aria-label="breadcrumb" className="text-[12px] opacity-75">
              <Link to="/" className="enlace-linea hover:text-piel">
                Inicio
              </Link>
              {' / '}
              <Link to={`/#${CATEGORIA_ANCLA[producto.categoria]}`} className="enlace-linea hover:text-piel">
                {CATEGORIA_LABEL[producto.categoria]}
              </Link>
              {' / '}
              <span>{producto.nombre}</span>
            </motion.nav>

            <motion.p variants={ITEM} className="mt-5 text-[12px] uppercase tracking-[0.18em] opacity-75">
              {producto.tipo}
            </motion.p>
            <h1 className="mt-1 font-display leading-[1.02]" style={{ fontSize: 'clamp(40px, 4.6vw, 58px)' }}>
              <TextoMascara delay={0.15} duracion={1} lineas={[{ texto: producto.nombre }]} />
            </h1>

            <motion.div variants={ITEM} className="mt-4 flex flex-wrap items-center gap-3">
              <p className="font-display text-[32px] leading-none text-piel">
                {formatearPrecio(producto.precio)}
              </p>
              <span className="rounded-full border border-[rgba(243,217,198,0.18)] bg-noche/70 px-3.5 py-1.5 text-[12px] text-piel">
                {producto.sensacion}
              </span>
            </motion.div>

            <motion.p variants={ITEM} className="mt-6 text-[17px] opacity-90">
              {producto.descripcionLarga}
            </motion.p>

            <motion.div variants={ITEM} className="mt-7">
              <h2 className="text-[12px] uppercase tracking-[0.18em] opacity-75">Qué incluye</h2>
              <ul className="mt-3 flex list-none flex-wrap gap-2">
                {producto.incluye.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[rgba(243,217,198,0.18)] px-3.5 py-1.5 text-[13px] opacity-90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={ITEM}>
              {producto.colores && (
                <div className="mt-7">
                  <h2 className="text-[12px] uppercase tracking-[0.18em] opacity-75">
                    Color: <span className="text-piel opacity-100">{colorSeleccionado}</span>
                  </h2>
                  <Muestras
                    colores={producto.colores}
                    seleccionado={colorSeleccionado}
                    onElegir={elegirColor}
                  />
                </div>
              )}

              {producto.tallas.length > 1 ? (
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[12px] uppercase tracking-[0.18em] opacity-75">Talla</h2>
                    <button
                      type="button"
                      onClick={() => setGuiaAbierta(true)}
                      className="enlace-linea text-[12px] text-rosa"
                    >
                      Guía de tallas
                    </button>
                  </div>
                  <Opciones
                    grupo="talla"
                    opciones={producto.tallas}
                    seleccionada={tallaSeleccionada}
                    onElegir={setTallaSeleccionada}
                  />
                </div>
              ) : producto.tallas.length === 1 ? (
                <p className="mt-7 text-[13px] opacity-75">
                  <span className="uppercase tracking-[0.1em]">Talla: </span>
                  {producto.tallas[0]}
                </p>
              ) : null}
            </motion.div>

            {/* Total claro antes de pedir */}
            <motion.div
              variants={ITEM}
              className="mt-7 rounded-[14px] border border-[rgba(243,217,198,0.18)] bg-white/[0.02] p-5 text-[14px]"
            >
              <div className="flex justify-between opacity-90">
                <span>{producto.nombre}</span>
                <span>{formatearPrecio(producto.precio)}</span>
              </div>
              <div className="mt-1.5 flex justify-between opacity-90">
                <span>Envío fijo</span>
                <span>{formatearPrecio(envio.valor)}</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-[rgba(243,217,198,0.18)] pt-3">
                <span className="uppercase tracking-[0.12em] text-[12px]">Total</span>
                <span className="font-display text-[24px] text-piel">
                  {formatearPrecio(producto.precio + envio.valor)}
                </span>
              </div>
              {esPrenda && (
                <p className="mt-3 text-[13px] text-rosa">
                  Llevando {envio.gratisDesde} prendas el envío es gratis.
                </p>
              )}
            </motion.div>

            <motion.div variants={ITEM}>
              <motion.a
                ref={ctaRef}
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="boton-brillo mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-piel py-4 text-center text-[13px] uppercase tracking-[0.2em] text-noche"
              >
                Lo quiero
                <span aria-hidden="true">→</span>
              </motion.a>
              <AnimatePresence initial={false}>
                {faltaTalla && (
                  <motion.p
                    className="mt-3 text-[12px] text-rosa"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    Selecciona tu talla para que sepamos qué enviarte
                  </motion.p>
                )}
              </AnimatePresence>

              <FilaConfianza />
            </motion.div>

            <motion.div variants={ITEM} className="mt-10">
              <h2 className="mb-1 text-[12px] uppercase tracking-[0.26em] text-rosa">Preguntas frecuentes</h2>
              <SeccionAcordeon
                titulo="Material y cuidado"
                abierto={seccionAbierta === 'material'}
                onToggle={() => toggleSeccion('material')}
              >
                <p>{producto.material}</p>
                <p className="mt-2">{producto.cuidado}</p>
              </SeccionAcordeon>
              <SeccionAcordeon
                titulo="¿Cuánto tarda y cuánto cuesta el envío?"
                abierto={seccionAbierta === 'envio'}
                onToggle={() => toggleSeccion('envio')}
              >
                <p>Transportadora: {envio.transportadora}</p>
                <p className="mt-2">Bogotá: {envio.bogota}</p>
                <p className="mt-2">Nacional: {envio.nacional}</p>
                <p className="mt-2">{envio.costo}</p>
              </SeccionAcordeon>
              <SeccionAcordeon
                titulo="¿Cómo pago?"
                abierto={seccionAbierta === 'pago'}
                onToggle={() => toggleSeccion('pago')}
              >
                <p>{envio.pago}</p>
                <p className="mt-2">{envio.contraentrega}</p>
              </SeccionAcordeon>
              <SeccionAcordeon
                titulo="¿Llega discreto?"
                abierto={seccionAbierta === 'discrecion'}
                onToggle={() => toggleSeccion('discrecion')}
              >
                <p>{envio.discrecion}</p>
              </SeccionAcordeon>
              <SeccionAcordeon
                titulo="Cambios y devoluciones"
                abierto={seccionAbierta === 'cambios'}
                onToggle={() => toggleSeccion('cambios')}
              >
                <p>{envio.cambios}</p>
              </SeccionAcordeon>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {sugeridos.length > 0 && <Carrusel productos={sugeridos} />}

      <PanelTallas abierto={guiaAbierta} onCerrar={cerrarGuia} />

      {/* Barra fija: el botón de compra siempre a un toque */}
      <AnimatePresence>
        {ctaFuera && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(243,217,198,0.18)] bg-noche/85 px-5 py-3 backdrop-blur-md"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            exit={{ y: '110%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate font-display text-[19px] leading-tight">{producto.nombre}</p>
                <p className="text-[13px] text-piel">
                  {formatearPrecio(producto.precio)}
                  {tallaSeleccionada ? ` · Talla ${tallaSeleccionada}` : ''}
                  {colorSeleccionado ? ` · ${colorSeleccionado}` : ''}
                </p>
              </div>
              <motion.a
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="boton-brillo shrink-0 rounded-full bg-piel px-6 py-3 text-[12px] uppercase tracking-[0.18em] text-noche"
              >
                Lo quiero
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Galería ────────────────────────────────────────────────────────────────
// Computador: miniaturas verticales + zoom que sigue el cursor.
// Celular: se desliza con el dedo, con puntos que marcan la foto actual.
function Galeria({
  imagenes,
  indice,
  direccion,
  onIr,
  onElegir,
  alt,
  nombre,
  encuadre,
}: {
  imagenes: FotoProducto[]
  indice: number
  direccion: number
  onIr: (i: number) => void
  onElegir: (i: number) => void
  alt: string
  nombre: string
  encuadre?: { escala: number; origen: string }
}) {
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)
  const varias = imagenes.length > 1

  const moverZoom = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tienePunteroFino()) return
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  const soltar = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -400) onIr(indice + 1)
    else if (info.offset.x > 50 || info.velocity.x > 400) onIr(indice - 1)
  }

  return (
    <div className={varias ? 'md:grid md:grid-cols-[76px_1fr] md:gap-3' : undefined}>
      {varias && (
        <div className="hidden flex-col gap-3 md:flex">
          {imagenes.map((img, i) => (
            <motion.button
              key={img}
              type="button"
              aria-label={`Ver foto ${i + 1} de ${nombre}`}
              onClick={() => onElegir(i)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: i === indice ? 1 : 0.55, x: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 + i * 0.06 }}
              className={`aspect-[3/4] w-full overflow-hidden rounded-md border-2 transition-colors duration-300 ${
                i === indice ? 'border-rosa' : 'border-transparent'
              }`}
            >
              <Imagen base={img} alt="" className="h-full w-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}

      <div>
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-[14px] bg-white/[0.02]"
          style={{ viewTransitionName: 'foto-producto' }}
          onPointerMove={moverZoom}
          onPointerLeave={() => setZoom(null)}
        >
          <AnimatePresence initial={false} custom={direccion}>
            <motion.div
              key={imagenes[indice]}
              custom={direccion}
              variants={{
                entra: (d: number) => ({ opacity: 0, x: `${d * 8}%`, scale: 1.04 }),
                centro: { opacity: 1, x: '0%', scale: 1 },
                sale: (d: number) => ({ opacity: 0, x: `${d * -8}%` }),
              }}
              initial="entra"
              animate="centro"
              exit="sale"
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="absolute inset-0 touch-pan-y"
              drag={varias ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={soltar}
            >
              <div
                className="h-full w-full transition-transform duration-300 ease-out"
                style={
                  zoom
                    ? { transform: 'scale(1.9)', transformOrigin: `${zoom.x}% ${zoom.y}%`, cursor: 'zoom-in' }
                    : undefined
                }
              >
                <Imagen base={imagenes[indice]} alt={alt} className="pointer-events-none h-full w-full object-cover" encuadre={encuadre} />
              </div>
            </motion.div>
          </AnimatePresence>

          {varias && (
            <>
              <span className="absolute right-3 top-3 rounded-full bg-noche/70 px-3 py-1 text-[12px] text-piel backdrop-blur-sm">
                {indice + 1} / {imagenes.length}
              </span>
              <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 md:hidden">
                {imagenes.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    aria-label={`Ver foto ${i + 1}`}
                    onClick={() => onElegir(i)}
                    className="p-1"
                  >
                    <motion.span
                      className="block h-1.5 rounded-full bg-marfil"
                      animate={{ width: i === indice ? 18 : 6, opacity: i === indice ? 1 : 0.5 }}
                      transition={{ duration: 0.3, ease: EASE_IN_OUT }}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Muestras de color ──────────────────────────────────────────────────────
function Muestras({
  colores,
  seleccionado,
  onElegir,
}: {
  colores: string[]
  seleccionado: string | undefined
  onElegir: (c: string) => void
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {colores.map((color) => {
        const activo = seleccionado === color
        return (
          <motion.button
            key={color}
            type="button"
            aria-label={color}
            aria-pressed={activo}
            title={color}
            onClick={() => onElegir(color)}
            whileTap={{ scale: 0.9 }}
            className="relative grid h-10 w-10 place-items-center rounded-full"
          >
            {activo && (
              <motion.span
                layoutId="anillo-color"
                className="absolute inset-0 rounded-full border-2 border-piel"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span
              className="block h-7 w-7 rounded-full border border-[rgba(243,217,198,0.35)]"
              style={{ background: TONOS[color] ?? 'linear-gradient(135deg,#E36A8B,#3B0A2A)' }}
            />
          </motion.button>
        )
      })}
    </div>
  )
}

// ─── Opciones de talla: píldora que se desliza con resorte ──────────────────
function Opciones({
  grupo,
  opciones,
  seleccionada,
  onElegir,
}: {
  grupo: string
  opciones: string[]
  seleccionada: string | undefined
  onElegir: (opcion: string) => void
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {opciones.map((opcion) => {
        const activa = seleccionada === opcion
        return (
          <motion.button
            key={opcion}
            type="button"
            aria-pressed={activa}
            onClick={() => onElegir(opcion)}
            whileTap={{ scale: 0.95 }}
            className={`relative min-w-[52px] rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.1em] transition-colors duration-300 ${
              activa
                ? 'border-piel text-noche'
                : 'border-[rgba(243,217,198,0.18)] text-marfil/90 hover:border-piel'
            }`}
          >
            {activa && (
              <motion.span
                layoutId={`pildora-${grupo}`}
                className="absolute inset-0 rounded-full bg-piel"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{opcion}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

// ─── Fila de confianza bajo el botón ────────────────────────────────────────
const CONFIANZA = [
  { titulo: 'Pagas al recibir', detalle: 'o por Nequi / Llave', icono: 'M4 7h16v10H4zM4 11h16M8 15h3' },
  { titulo: 'Envío $14.900', detalle: 'gratis con 3 prendas', icono: 'M3 7h11v9H3zM14 10h4l3 3v3h-7M7 18.5a1.5 1.5 0 1 0 0-.01M17 18.5a1.5 1.5 0 1 0 0-.01' },
  { titulo: 'Empaque discreto', detalle: 'sellado, sin marca', icono: 'M6 8h12l1 12H5zM9 8a3 3 0 0 1 6 0' },
  { titulo: 'Asesoría', detalle: 'por WhatsApp', icono: 'M5 5h14v10H9l-4 4z' },
]

function FilaConfianza() {
  return (
    <ul className="mt-5 grid list-none grid-cols-2 gap-3">
      {CONFIANZA.map((c) => (
        <li key={c.titulo} className="flex items-start gap-2.5">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-rosa" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={c.icono} />
          </svg>
          <span className="text-[13px] leading-snug">
            <span className="block text-marfil">{c.titulo}</span>
            <span className="block text-marfil/75">{c.detalle}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

// ─── Panel de guía de tallas ────────────────────────────────────────────────
const MENSAJE_TALLA = encodeURIComponent(
  'Hola Picanticos 💫 Tengo dudas con mi talla. Mi busto mide ___ cm y mi cintura ___ cm, ¿cuál me recomiendan?'
)

function PanelTallas({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const cerrarRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!abierto) return
    pausarScroll()
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cerrarRef.current?.focus()
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && onCerrar()
    document.addEventListener('keydown', tecla)
    return () => {
      document.removeEventListener('keydown', tecla)
      document.body.style.overflow = previo
      reanudarScroll()
    }
  }, [abierto, onCerrar])

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            className="fixed inset-0 z-[55] bg-noche/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onCerrar}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Guía de tallas"
            className="fixed inset-x-0 bottom-0 z-[56] max-h-[85svh] overflow-y-auto rounded-t-[20px] bg-vino px-6 pb-8 pt-6 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[480px] md:rounded-none md:px-9 md:pt-9"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-[30px]">
                Tu talla, <span className="italic text-rosa">sin adivinar</span>
              </p>
              <button
                ref={cerrarRef}
                type="button"
                onClick={onCerrar}
                className="text-[12px] uppercase tracking-[0.14em] text-marfil"
              >
                Cerrar
              </button>
            </div>
            <p className="mt-3 text-[14px] text-marfil/90">
              Mídete con una cinta sobre la piel, sin apretar. Si quedas entre dos tallas, pide la mayor.
            </p>
            <table className="mt-6 w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.18em] text-rosa">
                  <th className="pb-3 pr-3 font-normal">Talla</th>
                  <th className="pb-3 pr-3 font-normal">Busto</th>
                  <th className="pb-3 pr-3 font-normal">Cintura</th>
                  <th className="pb-3 font-normal">Cadera</th>
                </tr>
              </thead>
              <tbody>
                {TABLA_TALLAS.map((f, i) => (
                  <motion.tr
                    key={f.talla}
                    className="border-t border-[rgba(243,217,198,0.18)]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 + i * 0.05 }}
                  >
                    <td className="py-3 pr-3 font-display text-[18px] text-piel">{f.talla}</td>
                    <td className="py-3 pr-3 text-marfil/90">{f.busto}</td>
                    <td className="py-3 pr-3 text-marfil/90">{f.cintura}</td>
                    <td className="py-3 text-marfil/90">{f.cadera}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            <a
              href={`https://api.whatsapp.com/send?phone=${whatsapp}&text=${MENSAJE_TALLA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="boton-relleno mt-7 block rounded-full border border-piel py-3 text-center text-[12px] uppercase tracking-[0.18em] text-piel"
            >
              Te ayudamos por WhatsApp
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Carrusel de sugeridos ──────────────────────────────────────────────────
function Carrusel({ productos: lista }: { productos: Producto[] }) {
  const pista = useRef<HTMLDivElement>(null)
  const mover = (d: number) => {
    const el = pista.current
    if (!el) return
    el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="pb-16 md:pb-[110px]">
      <div className="mx-auto flex max-w-6xl items-end justify-between px-5">
        <h2 className="font-display leading-none" style={{ fontSize: 'clamp(30px, 3.6vw, 44px)' }}>
          <TextoMascara alVer lineas={[{ texto: <>También te puede <span className="italic text-rosa">gustar</span></> }]} />
        </h2>
        <div className="hidden gap-2 md:flex">
          {[-1, 1].map((d) => (
            <motion.button
              key={d}
              type="button"
              aria-label={d < 0 ? 'Anteriores' : 'Siguientes'}
              onClick={() => mover(d)}
              whileTap={{ scale: 0.92 }}
              className="boton-relleno grid h-11 w-11 place-items-center rounded-full border border-piel text-piel"
            >
              {d < 0 ? '←' : '→'}
            </motion.button>
          ))}
        </div>
      </div>
      <div
        ref={pista}
        className="mt-8 flex snap-x snap-mandatory scroll-pl-5 gap-[18px] overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] md:gap-[26px] md:px-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] [&::-webkit-scrollbar]:hidden"
      >
        {lista.map((p, i) => (
          <motion.div
            key={p.slug}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((72rem-52px)/3)]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: Math.min(i, 3) * 0.08 }}
          >
            <ProductoCard producto={p} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Acordeón ───────────────────────────────────────────────────────────────
interface SeccionAcordeonProps {
  titulo: string
  abierto: boolean
  onToggle: () => void
  children: ReactNode
}

function SeccionAcordeon({ titulo, abierto, onToggle, children }: SeccionAcordeonProps) {
  return (
    <div className="border-b border-[rgba(243,217,198,0.18)]">
      <button
        type="button"
        aria-expanded={abierto}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-[14px]"
      >
        {titulo}
        <span
          className={`text-[18px] text-rosa transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            abierto ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-[14px] opacity-90">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
