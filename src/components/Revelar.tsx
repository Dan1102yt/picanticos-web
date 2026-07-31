import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface RevelarProps {
  children: ReactNode
  delay?: number
}

export default function Revelar({ children, delay = 0 }: RevelarProps) {
  const reducirMovimiento = useReducedMotion()

  if (reducirMovimiento) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
