import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Imagen from './Imagen'
import type { ClaveImagen } from '../data/claves'

// Sección fijada (scrollytelling): mientras la clienta baja, la pantalla se
// queda quieta y cuentan los tres momentos de la compra. Es el argumento de
// venta más fuerte de la tienda: la discreción.
const PASOS = [
  {
    numero: '01',
    titulo: 'Eliges sin que nadie mire.',
    texto: 'Mira, compara y pregúntanos por WhatsApp. Te asesoramos la talla antes de pedir, sin compromiso.',
  },
  {
    numero: '02',
    titulo: 'Llega en caja neutra.',
    texto: 'Sin marca ni descripción del contenido. Lo que hay adentro solo lo sabes tú.',
  },
  {
    numero: '03',
    titulo: 'Pagas cuando lo tienes en la mano.',
    texto: 'Contraentrega en toda Colombia, con envío fijo de $14.900.',
  },
]

const FOTO_1: ClaveImagen = 'img/productos/aurora-rojo'
const FOTO_3: ClaveImagen = 'img/productos/noche-lenta-rosado'

// Rango de scroll de cada paso, con una meseta en la que el paso se lee quieto.
const rango = (i: number) => {
  const tramo = 1 / PASOS.length
  const ini = i * tramo
  const fin = ini + tramo
  return { ini, fin, entra: ini + tramo * 0.22, sale: fin - tramo * 0.22 }
}

function Paso({ progreso, i }: { progreso: MotionValue<number>; i: number }) {
  const { ini, fin, entra, sale } = rango(i)
  const primero = i === 0
  const ultimo = i === PASOS.length - 1
  // Curva por tramos calculada a mano: 0 → entra → meseta → sale → 0.
  const visibilidad = (v: number) => {
    if (v <= ini) return primero ? 1 : 0
    if (v < entra) return primero ? 1 : (v - ini) / (entra - ini)
    if (v <= sale) return 1
    if (v < fin) return ultimo ? 1 : 1 - (v - sale) / (fin - sale)
    return ultimo ? 1 : 0
  }
  const opacidad = useTransform(progreso, visibilidad)
  const y = useTransform(progreso, (v) => {
    if (v < entra && !primero) return (1 - visibilidad(v)) * 50
    if (v > sale && !ultimo) return -(1 - visibilidad(v)) * 50
    return 0
  })
  const paso = PASOS[i]

  return (
    <motion.div style={{ opacity: opacidad, y }} className="absolute inset-x-0 top-0">
      <p className="font-display text-[64px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(227,106,139,0.7)] md:text-[110px]">
        {paso.numero}
      </p>
      <h3 className="mt-3 font-display leading-[1.05]" style={{ fontSize: 'clamp(30px, 4.2vw, 56px)' }}>
        {paso.titulo}
      </h3>
      <p className="mt-4 max-w-sm text-marfil/90">{paso.texto}</p>
    </motion.div>
  )
}

function Capa({
  progreso,
  i,
  children,
}: {
  progreso: MotionValue<number>
  i: number
  children: React.ReactNode
}) {
  const { ini, entra } = rango(i)
  // Cada imagen entra como un telón que sube; la primera ya está puesta.
  const recorte = useTransform(progreso, [ini, entra], i === 0 ? ['0%', '0%'] : ['100%', '0%'])
  const clipPath = useTransform(recorte, (v) => `inset(${v} 0% 0% 0%)`)
  const escala = useTransform(progreso, [ini, Math.min(1, ini + 1 / PASOS.length)], [1.15, 1])
  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
      <motion.div className="h-full w-full" style={{ scale: escala }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

function CajaNeutra({ progreso }: { progreso: MotionValue<number> }) {
  const { ini, sale } = rango(1)
  const trazo = useTransform(progreso, [ini + 0.03, sale], [0, 1])
  const tapa = useTransform(progreso, [ini + 0.1, sale], [-18, 0])
  return (
    <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_40%,#3B0A2A,#0C0609_70%)]">
      <svg viewBox="0 0 200 170" className="w-[62%]" fill="none" stroke="#F3D9C6" strokeWidth="1.4">
        {/* Cuerpo de la caja (isométrica, sin marca) */}
        <motion.path d="M30 70 L100 100 L170 70 L170 130 L100 160 L30 130 Z" style={{ pathLength: trazo }} />
        <motion.path d="M100 100 L100 160" style={{ pathLength: trazo }} />
        {/* Tapa que baja y cierra */}
        <motion.g style={{ y: tapa }}>
          <motion.path d="M30 70 L100 40 L170 70 L100 100 Z" style={{ pathLength: trazo }} />
        </motion.g>
        <motion.path
          d="M66 55 L136 85"
          stroke="#E36A8B"
          strokeDasharray="3 4"
          style={{ pathLength: trazo, opacity: trazo }}
        />
      </svg>
    </div>
  )
}

export default function SeccionRitual() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section ref={ref} aria-label="Cómo funciona tu compra" className="relative h-[300vh]">
      <div className="sticky top-[70px] flex h-[calc(100svh-70px)] items-center overflow-hidden px-5">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-[0.9fr_1fr] md:gap-16">
          <div className="order-2 md:order-1">
            <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.26em] text-rosa">
              <span aria-hidden="true" className="block h-px w-10 bg-rosa" />
              Así de simple
            </p>

            <div className="relative mt-6 h-[270px] md:h-[370px]">
              {PASOS.map((_, i) => (
                <Paso key={i} progreso={scrollYProgress} i={i} />
              ))}
            </div>

            <div className="mt-4 flex gap-2" aria-hidden="true">
              {PASOS.map((_, i) => (
                <Barra key={i} progreso={scrollYProgress} i={i} />
              ))}
            </div>
          </div>

          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-[14px] border border-[rgba(243,217,198,0.18)] md:order-2 md:aspect-[4/5]">
            <Capa progreso={scrollYProgress} i={0}>
              <Imagen base={FOTO_1} alt="Pijama Aurora en satín rojo" className="h-full w-full object-cover" />
            </Capa>
            <Capa progreso={scrollYProgress} i={1}>
              <CajaNeutra progreso={scrollYProgress} />
            </Capa>
            <Capa progreso={scrollYProgress} i={2}>
              <Imagen base={FOTO_3} alt="Pijama Noche Lenta en satín rosado" className="h-full w-full object-cover" />
            </Capa>
          </div>
        </div>
      </div>
    </section>
  )
}

function Barra({ progreso, i }: { progreso: MotionValue<number>; i: number }) {
  const { ini, fin } = rango(i)
  const scaleX = useTransform(progreso, [ini, fin], [0, 1])
  return (
    <span className="relative block h-[2px] w-14 overflow-hidden bg-marfil/15">
      <motion.span className="absolute inset-0 origin-left bg-rosa" style={{ scaleX }} />
    </span>
  )
}
