import { motion, type Variants } from 'framer-motion'
import Imagen from './Imagen'
import Seda from './Seda'

const contenedor: Variants = {
  oculto: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const item: Variants = {
  oculto: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 md:pt-24">
      <Seda />

      <motion.div
        className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.85fr]"
        variants={contenedor}
        initial="oculto"
        animate="visible"
      >
        <div>
          <motion.p
            variants={item}
            className="text-[11px] uppercase tracking-[0.34em] text-rosa"
          >
            Lencería y juegos · Colombia
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 font-display leading-[1.05]"
            style={{ fontSize: 'clamp(46px, 6.6vw, 92px)' }}
          >
            <span className="block">Vestirte para</span>
            <span className="block">nadie más</span>
            <span className="block italic text-piel">que para ti.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-marfil/80">
            Piezas pensadas para tu cuerpo, no para la mirada de nadie más. Empaque
            discreto, cambios sin preguntas y envíos a todo el país.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#lenceria"
              className="inline-block bg-piel px-7 py-3 text-[13px] uppercase tracking-[0.1em] text-noche transition-opacity hover:opacity-90"
            >
              Ver la colección
            </a>
            <a
              href="#tallas"
              className="inline-block border border-piel px-7 py-3 text-[13px] uppercase tracking-[0.1em] text-piel transition-colors hover:bg-piel hover:text-noche"
            >
              Encontrar mi talla
            </a>
          </motion.div>
        </div>

        <motion.div variants={item}>
          <Imagen
            base="img/hero"
            alt="Modelo luciendo una pieza de lencería Picanticos"
            priority
            className="aspect-[3/4] w-full rounded-[200px_200px_12px_12px] object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
