import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Imagen from './Imagen'
import { juegos, lenceria, pijamas } from '../data/productos'
import type { ClaveImagen } from '../data/claves'
import { EASE_OUT } from '../lib/movimiento'

const ACCESOS: { titulo: string; italica: string; ancla: string; foto: ClaveImagen; cantidad: number }[] = [
  { titulo: 'Para', italica: 'dormir', ancla: '#pijamas', foto: 'img/productos/noche-lenta-rojo', cantidad: pijamas.length },
  { titulo: 'Para', italica: 'ti', ancla: '#lenceria', foto: 'img/productos/contorno-azul', cantidad: lenceria.length },
  { titulo: 'Para', italica: 'los dos', ancla: '#juegos', foto: 'img/productos/noche-completa-1', cantidad: juegos.length },
]

// Tres puertas de entrada al catálogo, justo después de la portada.
export default function AccesosCategorias() {
  return (
    <section aria-label="Categorías" className="pt-16 md:px-5 md:pt-24">
      <div className="mx-auto flex max-w-6xl snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-[26px] md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        {ACCESOS.map((a, i) => (
          <motion.div
            key={a.ancla}
            className="w-[64%] shrink-0 snap-start md:w-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.1 }}
          >
            <Link
              to={{ pathname: '/', hash: a.ancla }}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[14px] border border-[rgba(243,217,198,0.18)]"
            >
              <div className="h-full w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]">
                <Imagen base={a.foto} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="font-display text-[30px] leading-none md:text-[40px]">
                  {a.titulo} <span className="italic text-rosa">{a.italica}</span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-piel md:text-[12px]">
                  <span>{a.cantidad} piezas</span>
                  <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                    →
                  </span>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
