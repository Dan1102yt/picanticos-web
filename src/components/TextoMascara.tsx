import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT } from '../lib/movimiento'

// Cada línea sube desde detrás de una máscara invisible, una tras otra.
// Es la entrada editorial del sitio: títulos que "aparecen" en vez de saltar.
interface Linea {
  texto: ReactNode
  className?: string
}

export default function TextoMascara({
  lineas,
  delay = 0,
  escalon = 0.09,
  alVer = false,
  duracion = 1,
}: {
  lineas: Linea[]
  delay?: number
  escalon?: number
  alVer?: boolean
  duracion?: number
}) {
  const activar = alVer
    ? { initial: 'oculto', whileInView: 'visible', viewport: { once: true, margin: '-12% 0px' } }
    : { initial: 'oculto', animate: 'visible' }

  return (
    <motion.span className="block" {...activar}>
      {lineas.map((linea, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={`block will-change-transform ${linea.className ?? ''}`}
            variants={{
              oculto: { y: '110%', rotate: 2.5 },
              visible: {
                y: '0%',
                rotate: 0,
                transition: { duration: duracion, ease: EASE_OUT, delay: delay + i * escalon },
              },
            }}
          >
            {linea.texto}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
