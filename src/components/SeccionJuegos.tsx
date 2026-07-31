import { juegos, whatsapp } from '../data/productos'
import ProductoCard from './ProductoCard'
import Revelar from './Revelar'

const MENSAJE_COMBO = encodeURIComponent(
  'Hola, quiero armar el combo "Arma tu noche" (un juego + una pieza).'
)
const LINK_COMBO = `https://wa.me/${whatsapp}?text=${MENSAJE_COMBO}`

export default function SeccionJuegos() {
  const [juego] = juegos

  return (
    <section id="juegos" className="px-5 py-16 md:py-[110px]">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] uppercase tracking-[0.34em] text-rosa">
          Juegos
        </p>
        <h2
          className="mt-4 font-display leading-[1.05]"
          style={{ fontSize: 'clamp(34px, 4.4vw, 58px)' }}
        >
          Para <span className="italic text-rosa">los dos</span>
        </h2>
        <p className="mt-5 max-w-md text-marfil/80">
          Cuando la conversación ya no alcanza. Retos, risas y una excusa para
          apagar el celular.
        </p>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-[26px] md:grid-cols-2">
          <Revelar>
            <ProductoCard producto={juego} />
          </Revelar>

          <Revelar delay={0.08}>
            <div
              className="flex h-full flex-col items-center justify-center rounded-[14px] border border-[rgba(243,217,198,0.18)] px-8 py-10 text-center"
              style={{
                background:
                  'linear-gradient(160deg, rgba(142,30,79,0.25), transparent)',
              }}
            >
              <p className="text-[11px] uppercase tracking-[0.34em] text-rosa">
                Regalo
              </p>
              <h3 className="mt-4 font-display text-[30px]">Arma tu noche</h3>
              <p className="mt-4 max-w-xs text-[15px] text-marfil/80">
                Un juego + una pieza, con tarjeta escrita a mano y envío en
                caja neutra.
              </p>
              <a
                href={LINK_COMBO}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-piel px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-noche transition-opacity hover:opacity-90"
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
