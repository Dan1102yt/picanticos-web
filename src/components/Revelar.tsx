import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT } from '../lib/movimiento'

interface RevelarProps {
  children: ReactNode
  delay?: number
  className?: string
}

// Entrada al hacer scroll: sube 40px y aparece, con ease-out.
// Con "reducir movimiento" MotionConfig deja solo el fundido.
export default function Revelar({ children, delay = 0, className }: RevelarProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}
