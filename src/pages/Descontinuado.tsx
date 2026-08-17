import { Link } from 'react-router-dom'
import PaginaTexto from './PaginaTexto'

export default function Descontinuado() {
  return (
    <PaginaTexto
      titulo="Esta pieza ya no está disponible"
      description="Esta pieza salió del catálogo de Picanticos y ya no tiene proveedor."
    >
      <p>
        Dejamos de traerla porque ya no contamos con proveedor para esta
        pieza. El resto de la colección sigue disponible.
      </p>
      <Link
        to="/#lenceria"
        className="mt-3 inline-block text-[13px] uppercase tracking-[0.2em] text-rosa underline underline-offset-2"
      >
        Ver la colección
      </Link>
    </PaginaTexto>
  )
}
