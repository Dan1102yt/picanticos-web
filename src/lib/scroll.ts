import type Lenis from 'lenis'

// Instancia única de Lenis (scroll suave). Queda en null si el usuario pidió
// movimiento reducido o en celular táctil, y ahí se usa el scroll nativo.
let instancia: Lenis | null = null

export const registrarLenis = (l: Lenis | null) => {
  instancia = l
}

export const lenis = () => instancia

export function irA(destino: HTMLElement | number, opciones: { inmediato?: boolean } = {}) {
  const l = instancia
  if (l) {
    l.scrollTo(destino, { offset: typeof destino === 'number' ? 0 : -90, immediate: opciones.inmediato, force: true })
    return
  }
  if (typeof destino === 'number') {
    window.scrollTo({ top: destino, behavior: opciones.inmediato ? 'auto' : 'smooth' })
  } else {
    destino.scrollIntoView({ behavior: opciones.inmediato ? 'auto' : 'smooth', block: 'start' })
  }
}

export const pausarScroll = () => instancia?.stop()
export const reanudarScroll = () => instancia?.start()
