import { pijamas } from '../data/productos'
import ProductoCard from './ProductoCard'
import Revelar from './Revelar'
import TituloSeccion from './TituloSeccion'

export default function SeccionPijamas() {
  return (
    <section id="pijamas" className="px-5 py-16 md:py-[110px]">
      <div className="mx-auto max-w-6xl">
        <TituloSeccion
          eyebrow="Pijamas"
          titulo={<>Para <span className="italic text-rosa">dormir</span> bonito</>}
        >
          Satín liviano para las noches tranquilas y las mañanas lentas. Talla
          única o por talla, en varios colores.
        </TituloSeccion>

        <div className="mt-12 grid grid-cols-1 gap-[26px] md:grid-cols-2 lg:grid-cols-3">
          {pijamas.map((producto, index) => (
            <Revelar key={producto.slug} delay={(index % 3) * 0.12} className="h-full">
              <ProductoCard producto={producto} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
