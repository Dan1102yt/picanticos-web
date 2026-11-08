import { pijamas } from '../data/productos'
import ProductoCard from './ProductoCard'
import Revelar from './Revelar'

export default function SeccionPijamas() {
  return (
    <section id="pijamas" className="px-5 py-16 md:py-[110px]">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] uppercase tracking-[0.34em] text-rosa">
          Pijamas
        </p>
        <h2
          className="mt-4 font-display leading-[1.05]"
          style={{ fontSize: 'clamp(34px, 4.4vw, 58px)' }}
        >
          Para <span className="italic text-rosa">dormir</span> bonito
        </h2>
        <p className="mt-5 max-w-md text-marfil/80">
          Satín liviano para las noches tranquilas y las mañanas lentas. Talla
          única o por talla, en varios colores.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-[26px] md:grid-cols-2 lg:grid-cols-3">
          {pijamas.map((producto, index) => (
            <Revelar key={producto.slug} delay={index * 0.08}>
              <ProductoCard producto={producto} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
