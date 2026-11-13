import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Imagen from './Imagen'
import TextoMascara from './TextoMascara'
import Revelar from './Revelar'
import { EASE_OUT } from '../lib/movimiento'

const METRICAS = [
  { numero: 'Contraentrega', etiqueta: 'En todo el país' },
  { numero: 'Empaque discreto', etiqueta: 'Sellado, sin marca' },
]

export default function SeccionNosotros() {
  const ref = useRef<HTMLDivElement>(null)
  const reducir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reducir ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section
      id="nosotros"
      className="px-5 py-16 md:py-[110px]"
      style={{
        background: 'linear-gradient(180deg, transparent, rgba(59,10,42,.4), transparent)',
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-[70px] md:grid-cols-2">
        <motion.div
          ref={ref}
          className="relative aspect-[4/5] overflow-hidden rounded-[12px]"
          initial={{ clipPath: 'inset(12% 12% 12% 12% round 12px)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 12px)' }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1.3, ease: EASE_OUT }}
        >
          <motion.div className="absolute inset-[-10%_0]" style={{ y }}>
            <Imagen base="img/nosotros" alt="Picanticos" className="h-full w-full object-cover" />
          </motion.div>
        </motion.div>

        <div>
          <p className="flex items-center gap-3 text-[12px] uppercase tracking-[0.26em] text-rosa">
            <span aria-hidden="true" className="block h-px w-10 bg-rosa" />
            Nosotros
          </p>
          <blockquote
            className="mt-4 font-display italic leading-[1.25]"
            style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}
          >
            <TextoMascara
              alVer
              escalon={0.12}
              lineas={[
                { texto: 'No vendemos para que le' },
                { texto: 'gustes a alguien.' },
                { texto: 'Vendemos para que', className: 'text-rosa' },
                { texto: 'te guste verte.', className: 'text-rosa' },
              ]}
            />
          </blockquote>
          <Revelar delay={0.3}>
            <p className="mt-6 max-w-md text-marfil/90">
              Somos una tienda colombiana pequeña. Elegimos cada pieza con
              proveedores nacionales, la enviamos sellada y discreta y respondemos
              por WhatsApp nosotros mismos — no un bot.
            </p>
          </Revelar>

          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
            {METRICAS.map((metrica, i) => (
              <Revelar key={metrica.etiqueta} delay={0.45 + i * 0.12}>
                <p className="font-display text-[40px] leading-none text-piel md:text-[44px]">
                  {metrica.numero}
                </p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.26em] text-rosa opacity-75">
                  {metrica.etiqueta}
                </p>
              </Revelar>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
