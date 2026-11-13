import { useEffect, useState, type ReactNode, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  SITE_URL,
  envio,
  formatearPrecio,
  porSlug,
  relacionados,
  type Producto,
} from '../data/productos'
import Imagen from '../components/Imagen'
import { esUrlExterna } from '../data/claves'
import ProductoCard from '../components/ProductoCard'
import Revelar from '../components/Revelar'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { EASE_OUT } from '../lib/movimiento'
import { irA } from '../lib/scroll'

// Cada bloque de la ficha entra en cascada: sube 16px y aparece.
const ITEM = {
  oculto: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
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

type SeccionId = 'material' | 'envio' | 'cambios'

function FichaProducto({ producto }: { producto: Producto }) {
  const reducirMovimiento = useReducedMotion()
  const [indiceActivo, setIndiceActivo] = useState(0)
  const [colorSeleccionado, setColorSeleccionado] = useState(producto.colores?.[0])
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | undefined>(undefined)
  const [seccionAbierta, setSeccionAbierta] = useState<SeccionId | null>(null)
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

  // Elegir un color muestra su foto; tocar la miniatura de un color lo
  // selecciona, para que foto y color nunca queden desincronizados.
  const elegirColor = (color: string) => {
    setColorSeleccionado(color)
    const foto = producto.fotosPorColor?.[color]
    if (!foto) return
    const indice = imagenes.indexOf(foto)
    setIndiceActivo(indice >= 0 ? indice : 0)
    // En celular la foto queda arriba, fuera de vista: subir hasta ella.
    const galeria = galeriaRef.current
    if (galeria && galeria.getBoundingClientRect().bottom < 80) {
      irA(galeria, { inmediato: !!reducirMovimiento })
    }
  }

  const elegirFoto = (indice: number) => {
    setIndiceActivo(indice)
    const color = Object.entries(producto.fotosPorColor ?? {}).find(
      ([, foto]) => foto === imagenes[indice]
    )?.[0]
    if (color) setColorSeleccionado(color)
  }

  const necesitaTalla = producto.tallas.length > 1
  const faltaTalla = necesitaTalla && !tallaSeleccionada
  const sugeridos = relacionados(producto.slug)

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

      <section className="px-5 py-16 md:py-[110px]">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[55%_45%] md:gap-[56px]">
          {/* Galería */}
          <div>
            <div
              ref={galeriaRef}
              className="relative aspect-[3/4] scroll-mt-[90px] overflow-hidden rounded-[14px]"
              style={{ viewTransitionName: 'foto-producto' }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={imagenes[indiceActivo]}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                  className="absolute inset-0"
                >
                  <Imagen
                    base={imagenes[indiceActivo]}
                    alt={`${producto.nombre}, ${producto.tipo.toLowerCase()}${
                      fotoDelColor ? `, color ${colorSeleccionado?.toLowerCase()}` : ''
                    }`}
                    className="h-full w-full object-cover"
                    encuadre={usaEncuadre ? producto.encuadre : undefined}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {imagenes.length > 1 && (
              <div className="mt-[10px] flex gap-[10px]">
                {imagenes.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    aria-label={`Ver foto ${i + 1} de ${producto.nombre}`}
                    onClick={() => elegirFoto(i)}
                    className={`aspect-square w-20 overflow-hidden rounded-md border-2 transition-[opacity,border-color,transform] duration-300 active:scale-95 ${
                      i === indiceActivo
                        ? 'border-rosa'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Imagen
                      base={img}
                      alt={`Miniatura ${i + 1} de ${producto.nombre}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información */}
          <motion.div
            className="md:sticky md:top-24 md:self-start"
            initial="oculto"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
          >
            <motion.nav variants={ITEM} aria-label="breadcrumb" className="text-[12px] opacity-75">
              <Link to="/" className="hover:text-piel">
                Inicio
              </Link>
              {' / '}
              <Link
                to={`/#${CATEGORIA_ANCLA[producto.categoria]}`}
                className="hover:text-piel"
              >
                {CATEGORIA_LABEL[producto.categoria]}
              </Link>
              {' / '}
              <span>{producto.nombre}</span>
            </motion.nav>

            <motion.div variants={ITEM}>
            <p className="mt-5 text-[12px] uppercase tracking-[0.18em] opacity-75">
              {producto.tipo}
            </p>
            <h1 className="mt-1 font-display text-[42px] leading-none">
              {producto.nombre}
            </h1>
            <p className="mt-4 font-display text-[30px] text-piel">
              {formatearPrecio(producto.precio)}
            </p>
            <p className="mt-1 text-[14px] opacity-90">
              + envío fijo {formatearPrecio(envio.valor)} · pagas al recibir
            </p>

            <span className="mt-4 inline-block rounded-full border border-[rgba(243,217,198,0.18)] bg-noche/70 px-3.5 py-1.5 text-[12px] text-piel backdrop-blur-sm">
              {producto.sensacion}
            </span>
            </motion.div>

            <motion.p variants={ITEM} className="mt-6 text-[17px] opacity-90">{producto.descripcionLarga}</motion.p>

            <motion.div variants={ITEM} className="mt-8">
              <h2 className="text-[12px] uppercase tracking-[0.18em] opacity-75">
                Qué incluye
              </h2>
              <ul className="mt-3 list-none space-y-1.5">
                {producto.incluye.map((item) => (
                  <li key={item} className="text-[15px] opacity-90">
                    <span className="mr-2 text-rosa">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={ITEM}>
            {producto.colores && (
              <div className="mt-8">
                <h2 className="text-[12px] uppercase tracking-[0.18em] opacity-75">
                  Color
                </h2>
                <Opciones
                  grupo="color"
                  opciones={producto.colores}
                  seleccionada={colorSeleccionado}
                  onElegir={elegirColor}
                />
              </div>
            )}

            {producto.tallas.length > 1 ? (
              <div className="mt-8">
                <h2 className="text-[12px] uppercase tracking-[0.18em] opacity-75">
                  Talla
                </h2>
                <Opciones
                  grupo="talla"
                  opciones={producto.tallas}
                  seleccionada={tallaSeleccionada}
                  onElegir={setTallaSeleccionada}
                />
                <Link
                  to="/#tallas"
                  className="mt-3 inline-block text-[12px] text-rosa underline underline-offset-2"
                >
                  ¿Cuál es mi talla?
                </Link>
              </div>
            ) : producto.tallas.length === 1 ? (
              <p className="mt-8 text-[13px] opacity-70">
                <span className="uppercase tracking-[0.1em] opacity-75">Talla: </span>
                {producto.tallas[0]}
              </p>
            ) : null}
            </motion.div>

            <motion.div variants={ITEM}>
            <motion.a
              ref={ctaRef}
              href={urlWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="boton-brillo mt-8 block w-full rounded-full bg-piel py-4 text-center text-[13px] uppercase tracking-[0.2em] text-noche"
            >
              Lo quiero
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
            </motion.div>

            <motion.div variants={ITEM} className="mt-10">
              <SeccionAcordeon
                titulo="Material y cuidado"
                abierto={seccionAbierta === 'material'}
                onToggle={() => toggleSeccion('material')}
              >
                <p>{producto.material}</p>
                <p className="mt-2">{producto.cuidado}</p>
              </SeccionAcordeon>
              <SeccionAcordeon
                titulo="Envío y tiempos"
                abierto={seccionAbierta === 'envio'}
                onToggle={() => toggleSeccion('envio')}
              >
                <p>Transportadora: {envio.transportadora}</p>
                <p className="mt-2">Bogotá: {envio.bogota}</p>
                <p className="mt-2">Nacional: {envio.nacional}</p>
                <p className="mt-2">{envio.costo}</p>
                <p className="mt-2">{envio.contraentrega}</p>
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

      {sugeridos.length > 0 && (
        <section className="px-5 pb-16 md:pb-[110px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-[28px]">También te puede gustar</h2>
            <div className="mt-8 grid grid-cols-1 gap-[26px] md:grid-cols-3">
              {sugeridos.map((p, i) => (
                <Revelar key={p.slug} delay={i * 0.1} className="h-full">
                  <ProductoCard producto={p} />
                </Revelar>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

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
        className="flex w-full items-center justify-between py-4 text-left text-[13px] uppercase tracking-[0.1em]"
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

// Grupo de opciones (color o talla): una píldora clara se desliza hasta la
// opción elegida con un resorte, en vez de "saltar" de un botón a otro.
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
            className={`relative rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.1em] transition-colors duration-300 ${
              activa
                ? 'border-piel text-noche'
                : 'border-[rgba(243,217,198,0.18)] text-marfil/90 hover:border-piel'
            }`}
          >
            {activa && (
              <motion.span
                layoutId={`pildora-${grupo}`}
                className="absolute inset-0 -z-0 rounded-full bg-piel"
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
