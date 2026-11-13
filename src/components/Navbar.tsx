import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EASE_IN_OUT, EASE_OUT } from '../lib/movimiento'
import { pausarScroll, reanudarScroll } from '../lib/scroll'

const LINKS = [
  { href: '#pijamas', label: 'Pijamas' },
  { href: '#lenceria', label: 'Para ti' },
  { href: '#juegos', label: 'Para los dos' },
  { href: '#tallas', label: 'Tallas' },
  { href: '#nosotros', label: 'Nosotros' },
]

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const botonRef = useRef<HTMLButtonElement>(null)
  const [oculto, setOculto] = useState(false)
  const [conFondo, setConFondo] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progreso = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 })

  // Se esconde al bajar (más espacio para las fotos) y vuelve al subir.
  useMotionValueEvent(scrollY, 'change', (actual) => {
    const anterior = scrollY.getPrevious() ?? 0
    setConFondo(actual > 24)
    if (abierto) return
    if (actual > 160 && actual > anterior + 4) setOculto(true)
    else if (actual < anterior - 4 || actual < 160) setOculto(false)
  })

  useEffect(() => {
    if (!abierto) return

    const scrollPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    pausarScroll()

    const panel = panelRef.current
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : []
    focusables[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setAbierto(false)
        return
      }

      if (e.key !== 'Tab' || focusables.length === 0) return

      const primero = focusables[0]
      const ultimo = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = scrollPrevio
      reanudarScroll()
      botonRef.current?.focus()
    }
  }, [abierto])

  return (
    <>
    <motion.header
      className={`sticky top-0 z-50 h-[70px] border-b transition-[background-color,border-color] duration-500 ${
        conFondo
          ? 'border-[rgba(243,217,198,0.18)] bg-noche/75 backdrop-blur-md'
          : 'border-transparent bg-noche/0'
      }`}
      style={{ viewTransitionName: 'barra-nav' }}
      initial={{ y: -70 }}
      animate={{ y: oculto ? -72 : 0 }}
      transition={{ duration: oculto ? 0.3 : 0.45, ease: oculto ? EASE_IN_OUT : EASE_OUT }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center">
          <img
            src={`${import.meta.env.BASE_URL}img/logo.png`}
            alt="Picanticos"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              to={{ pathname: '/', hash: link.href }}
              className="enlace-linea pb-0.5 text-[13px] uppercase tracking-[0.1em] text-marfil/85 hover:text-piel"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to={{ pathname: '/', hash: '#lenceria' }}
            className="boton-relleno inline-block rounded-full border border-piel px-6 py-2 text-[13px] uppercase tracking-[0.1em] text-piel"
          >
            Comprar
          </Link>
        </div>

        <button
          ref={botonRef}
          type="button"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-[1.5px] w-6 bg-marfil transition-transform ${
              abierto ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span className={`block h-[1.5px] w-6 bg-marfil transition-opacity ${abierto ? 'opacity-0' : ''}`} />
          <span
            className={`block h-[1.5px] w-6 bg-marfil transition-transform ${
              abierto ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-rosa"
        style={{ scaleX: progreso }}
      />
    </motion.header>

      <AnimatePresence>
        {abierto && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-noche/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAbierto(false)}
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              className="fixed right-0 top-0 z-50 h-full w-[78%] max-w-xs bg-vino px-6 py-6 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label="Cerrar menú"
                  onClick={() => setAbierto(false)}
                  className="text-[13px] uppercase tracking-[0.1em] text-marfil"
                >
                  Cerrar
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-5">
                {LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      to={{ pathname: '/', hash: link.href }}
                      onClick={() => setAbierto(false)}
                      className="font-display text-[30px] text-marfil"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  to={{ pathname: '/', hash: '#lenceria' }}
                  onClick={() => setAbierto(false)}
                  className="mt-2 inline-block border border-piel px-5 py-2 text-center text-[13px] uppercase tracking-[0.1em] text-piel"
                >
                  Comprar
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
