import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
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

  useEffect(() => {
    if (!abierto) return

    const panel = panelRef.current
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : []
    focusables[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setAbierto(false)
        botonRef.current?.focus()
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
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [abierto])

  return (
    <header className="sticky top-0 z-50 h-[70px] border-b border-[rgba(243,217,198,0.18)] bg-noche/70 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center">
          <img
            src={`${import.meta.env.BASE_URL}img/logo.png`}
            alt="Picanticos"
            className="h-10 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] uppercase tracking-[0.1em] text-marfil/85 transition-colors hover:text-piel"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#lenceria"
            className="inline-block border border-piel px-5 py-2 text-[13px] uppercase tracking-[0.1em] text-piel transition-colors hover:bg-piel hover:text-noche"
          >
            Comprar
          </a>
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
              transition={{ type: 'tween', duration: 0.28 }}
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

              <nav className="mt-8 flex flex-col gap-6">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setAbierto(false)}
                    className="text-[15px] uppercase tracking-[0.1em] text-marfil"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#lenceria"
                  onClick={() => setAbierto(false)}
                  className="mt-2 inline-block border border-piel px-5 py-2 text-center text-[13px] uppercase tracking-[0.1em] text-piel"
                >
                  Comprar
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
