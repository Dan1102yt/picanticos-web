import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { irA } from '../lib/scroll'

// Al cambiar de ruta sube al inicio (antes de pintar, para que la transición
// de página arranque ya arriba). Si la URL trae una sección (#pijamas...),
// baja hasta ella con el scroll suave. location.key cambia en cada clic, así
// que volver a tocar el mismo enlace también funciona.
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation()

  useLayoutEffect(() => {
    if (!hash) irA(0, { inmediato: true })
  }, [pathname, hash, key])

  useEffect(() => {
    if (!hash) return

    const id = decodeURIComponent(hash.slice(1))
    let intentos = 0
    let timer: number | undefined

    const buscar = () => {
      const seccion = document.getElementById(id)
      if (seccion) {
        irA(seccion)
        return
      }
      if (intentos++ < 30) timer = window.setTimeout(buscar, 100)
    }

    buscar()
    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}
