import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de ruta sube al inicio. Si la URL trae una sección (#pijamas,
// #lenceria...), baja hasta ella. Home se carga en diferido, así que espera
// hasta 3 s a que la sección exista. location.key cambia en cada clic, así
// que volver a tocar el mismo enlace también funciona.
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    let intentos = 0
    let timer: number | undefined

    const buscar = () => {
      const seccion = document.getElementById(id)
      if (seccion) {
        seccion.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (intentos++ < 30) timer = window.setTimeout(buscar, 100)
    }

    buscar()
    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}
