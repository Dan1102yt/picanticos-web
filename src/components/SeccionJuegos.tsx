import { juegos, whatsapp } from '../data/productos'
import ProductoCard from './ProductoCard'
import Revelar from './Revelar'
import TituloSeccion from './TituloSeccion'

const MENSAJE_COMBO = encodeURIComponent(
  'Hola, quiero armar el combo "Arma tu noche" (un juego + una pieza).'
)
const LINK_COMBO = `https://wa.me/${whatsapp}?text=${MENSAJE_COMBO}`

export default function SeccionJuegos() {
  return (
    <section id="juegos" className="px-5 py-16 md:py-[110px]">
      <div className="mx-auto max-w-6xl">
        <TituloSeccion
          eyebrow="Juegos"
          titulo={<>Para <span className="italic text-rosa">los dos</span></>}
        >
          Cuando la conversación ya no alcanza. Retos, risas y una excusa para
          apagar el celular.
        </TituloSeccion>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-[26px] md:grid-cols-2 lg:grid-cols-4">
          {juegos.map((juego, index) => (
            <Revelar key={juego.slug} delay={(index % 4) * 0.1} className="h-full">
              <ProductoCard producto={juego} />
            </Revelar>
          ))}

          <Revelar delay={(juegos.length % 4) * 0.1} className="h-full">
            <div
              className="flex h-full flex-col items-center justify-center rounded-[14px] border border-[rgba(243,217,198,0.18)] px-8 py-10 text-center"
              style={{
                background:
                  'linear-gradient(160deg, rgba(142,30,79,0.25), transparent)',
              }}
            >
              <p className="text-[12px] uppercase tracking-[0.26em] text-rosa">
                Regalo
              </p>
              <h3 className="mt-4 font-display text-[30px]">Arma tu noche</h3>
              <p className="mt-4 max-w-xs text-[15px] text-marfil/90">
                Un juego + una pieza de lencería o pijama, en un solo pedido y
                en un solo empaque discreto.
              </p>
              <a
                href={LINK_COMBO}
                target="_blank"
                rel="noopener noreferrer"
                className="boton-brillo mt-8 inline-block rounded-full bg-piel px-7 py-3 text-[12px] uppercase tracking-[0.2em] text-noche"
              >
                Armar combo
              </a>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
