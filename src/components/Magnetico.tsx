import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { RESORTE_MAGNETICO, tienePunteroFino } from '../lib/movimiento'

// El botón se deja "atraer" por el cursor unos pixeles. Solo en computador.
export default function Magnetico({
  children,
  fuerza = 0.28,
  className,
}: {
  children: ReactNode
  fuerza?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), RESORTE_MAGNETICO)
  const y = useSpring(useMotionValue(0), RESORTE_MAGNETICO)

  const mover = (e: React.PointerEvent) => {
    if (!tienePunteroFino() || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * fuerza)
    y.set((e.clientY - (r.top + r.height / 2)) * fuerza)
  }
  const soltar = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={mover}
      onPointerLeave={soltar}
      style={{ x, y }}
      className={`inline-block ${className ?? ''}`}
    >
      {children}
    </motion.div>
  )
}
