import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Imagen from './Imagen'
import Seda from './Seda'
import LuzCursor from './LuzCursor'
import Magnetico from './Magnetico'
import SelloGiratorio from './SelloGiratorio'
import TextoMascara from './TextoMascara'
import { EASE_OUT, entrada } from '../lib/movimiento'

const ARCO = '200px 200px 12px 12px'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reducir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax: la foto baja más lento que el texto, y el texto se desvanece.
  const fotoY = useTransform(scrollYProgress, [0, 1], ['0%', reducir ? '0%' : '14%'])
  const fotoEscala = useTransform(scrollYProgress, [0, 1], [1, reducir ? 1 : 1.08])
  const textoY = useTransform(scrollYProgress, [0, 1], ['0%', reducir ? '0%' : '-18%'])
  const textoOpacidad = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} className="relative isolate overflow-hidden px-5 pb-20 pt-14 md:min-h-[calc(100svh-104px)] md:pt-20">
      <Seda />
      <LuzCursor />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.85fr]">
        <motion.div style={{ y: textoY, opacity: textoOpacidad }}>
          <motion.p
            className="flex items-center gap-3 text-[12px] uppercase tracking-[0.26em] text-rosa"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={entrada(0.1, 0.8)}
          >
            <motion.span
              aria-hidden="true"
              className="block h-px w-10 origin-left bg-rosa"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={entrada(0.1, 1)}
            />
            Pijamas, lencería y juegos · Colombia
          </motion.p>

          <h1 className="mt-5 font-display leading-[1.02]" style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}>
            <TextoMascara
              delay={0.2}
              escalon={0.11}
              duracion={1.1}
              lineas={[
                { texto: 'Vestirte para' },
                { texto: 'nadie más' },
                { texto: 'que para ti.', className: 'italic text-piel' },
              ]}
            />
          </h1>

          <motion.p
            className="mt-6 max-w-md text-marfil/90"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={entrada(0.75)}
          >
            Piezas pensadas para tu cuerpo, no para la mirada de nadie más. Empaque
            discreto, pago contraentrega y envíos a todo el país.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={entrada(0.9)}
          >
            <Magnetico>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  to={{ pathname: '/', hash: '#pijamas' }}
                  className="boton-brillo inline-block rounded-full bg-piel px-8 py-3.5 text-[13px] uppercase tracking-[0.14em] text-noche"
                >
                  Ver la colección
                </Link>
              </motion.div>
            </Magnetico>
            <Magnetico>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  to={{ pathname: '/', hash: '#tallas' }}
                  className="boton-relleno inline-block rounded-full border border-piel px-8 py-3.5 text-[13px] uppercase tracking-[0.14em] text-piel"
                >
                  Encontrar mi talla
                </Link>
              </motion.div>
            </Magnetico>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* La foto se "abre" desde abajo como un telón, y respira al entrar */}
          <motion.div
            className="relative overflow-hidden"
            style={{ borderRadius: ARCO }}
            initial={{ clipPath: `inset(100% 0% 0% 0% round ${ARCO})` }}
            animate={{ clipPath: `inset(0% 0% 0% 0% round ${ARCO})` }}
            transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.25 }}
          >
            <motion.div style={{ y: fotoY, scale: fotoEscala }}>
              <motion.div
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: EASE_OUT, delay: 0.25 }}
              >
                <Imagen
                  base="img/hero"
                  alt="Modelo luciendo una pieza de lencería Picanticos"
                  priority
                  className="aspect-[3/4] w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -bottom-6 left-3 md:-left-12"
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 1.2 }}
          >
            <SelloGiratorio />
          </motion.div>
        </div>
      </div>

    </section>
  )
}
