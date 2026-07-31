import { useEffect, useState } from 'react'

export default function Seda() {
  const [animar, setAnimar] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setAnimar(!mq.matches)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className={`absolute -left-1/4 -top-1/4 h-[60vw] w-[60vw] rounded-full bg-granate opacity-55 blur-[80px] ${
          animar ? 'animate-respira' : ''
        }`}
      />
      <div
        className={`absolute -right-1/4 top-1/3 h-[55vw] w-[55vw] rounded-full bg-vino opacity-55 blur-[80px] ${
          animar ? 'animate-respira' : ''
        }`}
        style={animar ? { animationDelay: '-6s' } : undefined}
      />
      <div
        className={`absolute -bottom-1/4 left-1/4 h-[50vw] w-[50vw] rounded-full bg-[#B33A6A] opacity-55 blur-[80px] ${
          animar ? 'animate-respira' : ''
        }`}
        style={animar ? { animationDelay: '-11s' } : undefined}
      />
    </div>
  )
}
