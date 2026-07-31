import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../data/productos'

interface PaginaTextoProps {
  titulo: string
  description: string
  children: ReactNode
}

export default function PaginaTexto({ titulo, description, children }: PaginaTextoProps) {
  const { pathname } = useLocation()

  return (
    <>
      <Helmet>
        <title>{titulo} | Picanticos</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}${pathname}`} />
      </Helmet>

      <section className="px-5 py-16 md:py-[110px]">
        <div className="mx-auto max-w-6xl">
          <h1
            className="font-display leading-[1.05]"
            style={{ fontSize: 'clamp(34px, 4.4vw, 52px)' }}
          >
            {titulo}
          </h1>
          <div
            className="mt-8 space-y-5 text-marfil/80"
            style={{ maxWidth: '68ch', lineHeight: 1.75 }}
          >
            {children}
          </div>
        </div>
      </section>
    </>
  )
}
