import type { Transition } from 'framer-motion'

// Curvas del sitio (reglas de movimiento):
// - ease-out para todo lo que ENTRA: arranca rápido y frena suave, se siente
//   inmediato. Nunca ease-in para entradas.
// - ease-in-out para lo que ya está en pantalla y se MUEVE de un punto a otro.
// - Resortes para lo que sigue al dedo o al cursor (interrupciones naturales).
// - Solo se animan transform, opacity y clip-path.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export const DURACION = {
  ui: 0.2,
  medio: 0.45,
  editorial: 0.9,
} as const

export const entrada = (delay = 0, duracion: number = DURACION.editorial): Transition => ({
  duration: duracion,
  ease: EASE_OUT,
  delay,
})

export const RESORTE_SUAVE = { stiffness: 170, damping: 26, mass: 0.6 }
export const RESORTE_MAGNETICO = { stiffness: 240, damping: 18, mass: 0.35 }
export const RESORTE_TILT = { stiffness: 260, damping: 24, mass: 0.5 }

// Puntero fino = mouse/trackpad. En celular no hay hover: ni tilt ni imán.
export const tienePunteroFino = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
