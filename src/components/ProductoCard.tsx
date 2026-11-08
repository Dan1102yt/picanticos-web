import { Link } from 'react-router-dom'
import type { Producto } from '../data/productos'
import { formatearPrecio } from '../data/productos'
import Imagen from './Imagen'

interface ProductoCardProps {
  producto: Producto
}

export default function ProductoCard({ producto }: ProductoCardProps) {
  return (
    <Link
      to={`/producto/${producto.slug}`}
      className="group block overflow-hidden rounded-[14px] border border-[rgba(243,217,198,0.18)] bg-white/[0.02] transition-all duration-[400ms] hover:-translate-y-1.5 hover:border-[rgba(227,106,139,0.5)]"
    >
      <div className="relative overflow-hidden">
        <Imagen
          base={producto.imagenes[0]}
          alt={`${producto.nombre}, ${producto.tipo.toLowerCase()}`}
          className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          encuadre={producto.encuadre}
        />
        <span className="absolute left-3.5 top-3.5 rounded-full border border-[rgba(243,217,198,0.18)] bg-noche/70 px-3.5 py-1.5 text-[12px] text-piel backdrop-blur-sm">
          {producto.sensacion}
        </span>
      </div>

      <div className="p-[22px]">
        <p className="text-[12px] uppercase tracking-[0.18em] opacity-75">
          {producto.tipo}
        </p>
        <h3 className="mt-1 font-display text-[26px] leading-tight">
          {producto.nombre}
        </h3>
        <p className="mt-2 min-h-[48px] text-[15px] opacity-90">
          {producto.descripcionCorta}
        </p>

        <div className="mt-4 border-t border-[rgba(243,217,198,0.18)] pt-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-[22px] text-piel">
              {formatearPrecio(producto.precio)}
            </span>
            <span className="text-[12px] opacity-75">
              {producto.tallas.length > 0
                ? producto.tallas.join(' · ')
                : producto.sensacion}
            </span>
          </div>

          <span className="mt-4 block w-full rounded-full border border-piel py-3 text-center text-[12px] uppercase tracking-[0.2em] text-piel transition-colors group-hover:bg-piel group-hover:text-noche">
            Lo quiero
          </span>
        </div>
      </div>
    </Link>
  )
}
