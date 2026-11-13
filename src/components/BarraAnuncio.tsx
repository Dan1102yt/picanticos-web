import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT } from '../lib/movimiento'

// Barra fina sobre el menú: rota las tres promesas que más convencen.
const MENSAJES = [
  'Pagas al recibir en todo Colombia',
  'Envío gratis llevando 3 prendas',
  'Paga contraentrega, por Nequi o Llave',
]

export default function BarraAnuncio() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % MENSAJES.length), 3800)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="relative h-[34px] overflow-hidden bg-granate text-center" role="status" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.p
          key={i}
          className="absolute inset-0 flex items-center justify-center px-4 text-[11px] uppercase tracking-[0.2em] text-marfil md:text-[12px]"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {MENSAJES[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
