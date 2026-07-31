import { whatsapp } from '../data/productos'
import Seda from './Seda'

const mensaje = encodeURIComponent('Hola Picanticos 💫 Quiero que me ayuden a elegir.')
const urlWhatsApp = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${mensaje}`

export default function SeccionCierre() {
  return (
    <section className="relative overflow-hidden px-5 py-[130px] text-center">
      <Seda />

      <div className="mx-auto max-w-2xl">
        <h2
          className="font-display leading-[1.05]"
          style={{ fontSize: 'clamp(38px, 5.6vw, 74px)' }}
        >
          La noche <span className="italic text-rosa">ya empezó.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-md text-marfil/80">
          Escríbenos y te ayudamos a elegir. Respondemos personas, no bots,
          entre 8 a. m. y 10 p. m.
        </p>

        <a
          href={urlWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-piel px-8 py-4 text-[13px] uppercase tracking-[0.2em] text-noche transition-opacity hover:opacity-90"
        >
          Escribir por WhatsApp
        </a>
      </div>
    </section>
  )
}
