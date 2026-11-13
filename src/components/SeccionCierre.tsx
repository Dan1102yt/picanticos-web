import { motion } from 'framer-motion'
import { whatsapp } from '../data/productos'
import Seda from './Seda'
import LuzCursor from './LuzCursor'
import Magnetico from './Magnetico'
import TextoMascara from './TextoMascara'
import Revelar from './Revelar'

const mensaje = encodeURIComponent('Hola Picanticos 💫 Quiero que me ayuden a elegir.')
const urlWhatsApp = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${mensaje}`

export default function SeccionCierre() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-[130px] text-center md:py-[170px]">
      <Seda />
      <LuzCursor tamano={640} />

      <div className="mx-auto max-w-3xl">
        <h2 className="font-display leading-[1.02]" style={{ fontSize: 'clamp(44px, 7vw, 96px)' }}>
          <TextoMascara
            alVer
            escalon={0.12}
            duracion={1.1}
            lineas={[{ texto: 'La noche' }, { texto: 'ya empezó.', className: 'italic text-rosa' }]}
          />
        </h2>

        <Revelar delay={0.3}>
          <p className="mx-auto mt-6 max-w-md text-marfil/90">
            Escríbenos y te ayudamos a elegir. Respondemos personas, no bots,
            entre 8 a. m. y 10 p. m.
          </p>
        </Revelar>

        <Revelar delay={0.45}>
          <Magnetico className="mt-9" fuerza={0.35}>
            <motion.a
              href={urlWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="boton-brillo inline-block rounded-full bg-piel px-10 py-5 text-[13px] uppercase tracking-[0.2em] text-noche"
            >
              Escribir por WhatsApp
            </motion.a>
          </Magnetico>
        </Revelar>
      </div>
    </section>
  )
}
