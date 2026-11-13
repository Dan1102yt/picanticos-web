import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import TextoMascara from './TextoMascara'
import { EASE_OUT } from '../lib/movimiento'

// Encabezado de sección: la línea del eyebrow se dibuja, el título sube por
// máscara y el texto de apoyo entra después. Todo una sola vez al verlo.
export default function TituloSeccion({
  eyebrow,
  titulo,
  children,
  centrado = false,
}: {
  eyebrow: string
  titulo: ReactNode
  children?: ReactNode
  centrado?: boolean
}) {
  return (
    <div className={centrado ? 'text-center' : undefined}>
      <motion.p
        className={`flex items-center gap-3 text-[12px] uppercase tracking-[0.26em] text-rosa ${
          centrado ? 'justify-center' : ''
        }`}
        initial="oculto"
        whileInView="visible"
        viewport={{ once: true, margin: '-12% 0px' }}
      >
        <motion.span
          aria-hidden="true"
          className="block h-px w-10 origin-left bg-rosa"
          variants={{
            oculto: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT } },
          }}
        />
        <motion.span
          variants={{
            oculto: { opacity: 0, x: -8 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.15 } },
          }}
        >
          {eyebrow}
        </motion.span>
      </motion.p>

      <h2
        className="mt-4 font-display leading-[1.05]"
        style={{ fontSize: 'clamp(36px, 5vw, 66px)' }}
      >
        <TextoMascara alVer delay={0.1} lineas={[{ texto: titulo }]} />
      </h2>

      {children && (
        <motion.div
          className={`mt-5 max-w-md text-marfil/90 ${centrado ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}
