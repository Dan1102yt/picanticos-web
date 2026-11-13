import { lenceria } from '../data/productos'
import ProductoCard from './ProductoCard'
import Revelar from './Revelar'
import TituloSeccion from './TituloSeccion'

export default function SeccionLenceria() {
  return (
    <section id="lenceria" className="px-5 py-16 md:py-[110px]">
      <div className="mx-auto max-w-6xl">
        <TituloSeccion
          eyebrow="Colección"
          titulo={<>Para <span className="italic text-rosa">ti</span></>}
        >
          Cada pieza dice cómo se siente antes de decir cuánto cuesta. Elige
          por la sensación.
        </TituloSeccion>

        <div className="mt-12 grid grid-cols-1 gap-[26px] md:grid-cols-2 lg:grid-cols-3">
          {lenceria.map((producto, index) => (
            <Revelar key={producto.slug} delay={(index % 3) * 0.12} className="h-full">
              <ProductoCard producto={producto} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
