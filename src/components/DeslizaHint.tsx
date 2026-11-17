import { motion } from 'framer-motion'

// Solo en celular: avisa que la fila de productos se desliza de lado.
export default function DeslizaHint() {
  return (
    <p className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-marfil/75 md:hidden" aria-hidden="true">
      Desliza
      <motion.span
        className="inline-block text-rosa"
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], repeat: Infinity, repeatDelay: 0.6 }}
      >
        →
      </motion.span>
    </p>
  )
}
