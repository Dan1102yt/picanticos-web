import { motion } from 'framer-motion'

// Sello circular que gira despacio: refuerza la promesa principal (discreción)
// sin ocupar espacio de texto.
export default function SelloGiratorio({ className }: { className?: string }) {
  const texto = 'Envío discreto · Pagas al recibir · '
  return (
    <div className={`pointer-events-none select-none ${className ?? ''}`} aria-hidden="true">
      <div className="relative grid h-[118px] w-[118px] place-items-center rounded-full bg-noche/80 backdrop-blur-sm md:h-[136px] md:w-[136px]">
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        >
          <defs>
            <path id="circulo-sello" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-piel" style={{ fontSize: 8, textTransform: 'uppercase' }}>
            <textPath href="#circulo-sello" textLength={236} lengthAdjust="spacing">
              {texto}
            </textPath>
          </text>
        </motion.svg>
        <span className="font-display text-[26px] italic text-rosa">P</span>
      </div>
    </div>
  )
}
