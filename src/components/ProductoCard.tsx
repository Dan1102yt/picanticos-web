import { useState } from 'react'
import { Link, useViewTransitionState } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Producto } from '../data/productos'
import { formatearPrecio } from '../data/productos'
import Imagen from './Imagen'
import { RESORTE_TILT, tienePunteroFino } from '../lib/movimiento'

interface ProductoCardProps {
  producto: Producto
}

// Segunda foto para el hover: otro color o la siguiente foto del producto.
function fotoAlterna(producto: Producto) {
  const principal = producto.imagenes[0]
  const deColor = Object.values(producto.fotosPorColor ?? {}).find((f) => f && f !== principal)
  return deColor ?? producto.imagenes.find((f) => f !== principal)
}

export default function ProductoCard({ producto }: ProductoCardProps) {
  const destino = `/producto/${producto.slug}`
  // La foto lleva el nombre de transición solo mientras se navega a SU ficha,
  // para que el navegador sepa qué foto debe "viajar".
  const viajando = useViewTransitionState(destino)
  const alterna = fotoAlterna(producto)
  const [encima, setEncima] = useState(false)

  // Inclinación 3D que sigue al cursor (solo computador), con resorte.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), RESORTE_TILT)
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), RESORTE_TILT)
  const brilloX = useTransform(px, [-0.5, 0.5], ['20%', '80%'])
  const brilloY = useTransform(py, [-0.5, 0.5], ['15%', '85%'])
  const reflejo = useTransform(
    [brilloX, brilloY],
    ([vx, vy]) => `radial-gradient(420px circle at ${vx} ${vy}, rgba(255,240,235,0.55), transparent 60%)`
  )

  const mover = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tienePunteroFino()) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const salir = () => {
    px.set(0)
    py.set(0)
    setEncima(false)
  }

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        onPointerMove={mover}
        onPointerEnter={() => tienePunteroFino() && setEncima(true)}
        onPointerLeave={salir}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        whileTap={{ scale: 0.985 }}
        className="h-full"
      >
        <Link
          to={destino}
          viewTransition
          className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-[rgba(243,217,198,0.18)] bg-white/[0.02] transition-colors duration-500 hover:border-[rgba(227,106,139,0.55)]"
        >
          <div
            className="relative overflow-hidden"
            style={viajando ? { viewTransitionName: 'foto-producto' } : undefined}
          >
            <div className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
              <Imagen
                base={producto.imagenes[0]}
                alt={`${producto.nombre}, ${producto.tipo.toLowerCase()}`}
                className="aspect-[3/4] w-full object-cover"
                encuadre={producto.encuadre}
              />
            </div>

            {alterna && (
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: encima ? 1 : 0, scale: encima ? 1 : 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                <Imagen base={alterna} alt="" className="h-full w-full object-cover" />
              </motion.div>
            )}

            {/* Reflejo que sigue al cursor, como luz sobre satín */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: reflejo }}
            />

            <span className="absolute left-3.5 top-3.5 rounded-full border border-[rgba(243,217,198,0.18)] bg-noche/70 px-3.5 py-1.5 text-[12px] text-piel backdrop-blur-sm">
              {producto.sensacion}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-[22px]">
            <p className="text-[12px] uppercase tracking-[0.18em] opacity-75">{producto.tipo}</p>
            <h3 className="mt-1 font-display text-[26px] leading-tight">
              <span className="enlace-linea">{producto.nombre}</span>
            </h3>
            <p className="mt-2 min-h-[48px] text-[15px] opacity-90">{producto.descripcionCorta}</p>

            <div className="mt-auto border-t border-[rgba(243,217,198,0.18)] pt-4">
              <div className="flex items-center justify-between">
                <span className="font-display text-[22px] text-piel">
                  {formatearPrecio(producto.precio)}
                </span>
                <span className="text-[12px] opacity-75">
                  {producto.tallas.length > 0 ? producto.tallas.join(' · ') : producto.sensacion}
                </span>
              </div>

              <span className="boton-relleno mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-piel py-3 text-[12px] uppercase tracking-[0.2em] text-piel">
                Lo quiero
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}
