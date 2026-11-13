import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { whatsapp } from '../data/productos'
import { EASE_OUT } from '../lib/movimiento'

const mensaje = encodeURIComponent('Hola Picanticos 💫 Quiero asesoría para elegir.')
const url = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${mensaje}`

// Botón de asesoría siempre a mano. Aparece después de la portada y no se
// muestra en la ficha de producto (ahí ya está la barra fija de compra).
export default function WhatsAppFlotante() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 420))

  const mostrar = visible && !pathname.startsWith('/producto/')

  return (
    <AnimatePresence>
      {mostrar && (
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Asesoría por WhatsApp"
          className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-piel pl-4 pr-4 text-noche shadow-[0_10px_40px_-8px_rgba(227,106,139,0.6)]"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          whileTap={{ scale: 0.94 }}
        >
          <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" fill="currentColor" aria-hidden="true">
            <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3Zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.7-5.7C5.1 10 10 5.2 16 5.2s10.9 4.8 10.9 10.7S22 26.4 16 26.4Zm6-8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.9 8.9 0 0 1-4.4-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5.1 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.7-.4Z" />
          </svg>
          <span className="max-w-0 whitespace-nowrap text-[12px] uppercase tracking-[0.14em] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:ml-2 group-hover:max-w-[140px] group-hover:opacity-100">
            Asesoría
          </span>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-rosa"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.35, opacity: 0 }}
            transition={{ duration: 2, ease: EASE_OUT, repeat: Infinity, repeatDelay: 2.5 }}
          />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
