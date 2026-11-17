import { lenceria } from '../data/productos'
import ProductoCard from './ProductoCard'
import Revelar from './Revelar'
import DeslizaHint from './DeslizaHint'
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

        <DeslizaHint />
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] md:mx-0 md:mt-12 md:grid md:gap-[26px] md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden md:grid-cols-2 lg:grid-cols-3 md:items-stretch">
          {lenceria.map((producto, index) => (
            <Revelar key={producto.slug} delay={(index % 3) * 0.12} className="h-full w-[80%] shrink-0 snap-start md:w-auto">
              <ProductoCard producto={producto} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
