import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { RESORTE_SUAVE, tienePunteroFino } from '../lib/movimiento'

// Un halo rosado que sigue al cursor con retraso de resorte, dentro de la
// sección que lo contiene. Solo en computador.
export default function LuzCursor({ tamano = 520 }: { tamano?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(-9999), RESORTE_SUAVE)
  const y = useSpring(useMotionValue(-9999), RESORTE_SUAVE)
  const fondo = useMotionTemplate`radial-gradient(${tamano}px circle at ${x}px ${y}px, rgba(227,106,139,0.16), transparent 70%)`

  useEffect(() => {
    const capa = ref.current
    const seccion = capa?.parentElement
    if (!capa || !seccion || !tienePunteroFino()) return
    const mover = (e: PointerEvent) => {
      const r = seccion.getBoundingClientRect()
      x.set(e.clientX - r.left)
      y.set(e.clientY - r.top)
    }
    seccion.addEventListener('pointermove', mover)
    return () => seccion.removeEventListener('pointermove', mover)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-[5]"
      style={{ background: fondo }}
    />
  )
}
