import { useEffect } from 'react'
import Lenis from 'lenis'
import { registrarLenis } from '../lib/scroll'

// Scroll con inercia en computador (rueda del mouse / trackpad). En celular
// se deja el scroll nativo del sistema, que ya es suave y el usuario lo espera.
export default function ScrollSuave() {
  useEffect(() => {
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducir) return

    const l = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), autoRaf: true })
    registrarLenis(l)
    return () => {
      registrarLenis(null)
      l.destroy()
    }
  }, [])

  return null
}
