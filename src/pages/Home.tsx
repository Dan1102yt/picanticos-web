import { Helmet } from 'react-helmet-async'
import { SITE_URL, redes } from '../data/productos'
import Hero from '../components/Hero'
import BandaDiscrecion from '../components/BandaDiscrecion'
import SeccionLenceria from '../components/SeccionLenceria'
import SeccionJuegos from '../components/SeccionJuegos'
import SeccionNosotros from '../components/SeccionNosotros'
import SeccionTallas from '../components/SeccionTallas'
import SeccionCierre from '../components/SeccionCierre'

const TITULO = 'Picanticos · Lencería y juegos para adultos en Colombia'
const DESCRIPCION =
  'Lencería y juegos de mesa para adultos con envío discreto a toda Colombia. Empaque sin marca y cambio de talla gratis en 30 días.'
const OG_IMAGE = `${SITE_URL}/img/hero-768.jpg`

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Picanticos',
  url: SITE_URL,
  areaServed: 'CO',
  sameAs: [redes.instagram, redes.tiktok],
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{TITULO}</title>
        <meta name="description" content={DESCRIPCION} />
        <meta property="og:title" content={TITULO} />
        <meta property="og:description" content={DESCRIPCION} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMAGE} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Hero />
      <BandaDiscrecion />
      <SeccionLenceria />
      <SeccionJuegos />
      {/* TODO: faltan testimonios reales de clientas */}
      <SeccionNosotros />
      <SeccionTallas />
      <SeccionCierre />
    </>
  )
}
