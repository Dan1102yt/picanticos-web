import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const ProductoDetalle = lazy(() => import('./pages/ProductoDetalle'))
const Envios = lazy(() => import('./pages/Envios'))
const Cambios = lazy(() => import('./pages/Cambios'))
const Privacidad = lazy(() => import('./pages/Privacidad'))
const Descontinuado = lazy(() => import('./pages/Descontinuado'))

// Slugs vivos en la bio de Instagram y TikTok desde el sitio anterior.
const SLUGS_ANTIGUOS = ['torre-pasion']

// Piezas que salieron del catalogo al pasar a dropshipping (nov-2026).
const SLUGS_DESCONTINUADOS = [
  'kimono-malla',
  'satin-glow',
  'fuego-nocturno',
  'luna-traviesa',
  'pecado-unico',
]

function CargandoRuta() {
  return <div className="min-h-screen" aria-hidden="true" />
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<CargandoRuta />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:slug" element={<ProductoDetalle />} />
          <Route path="/envios" element={<Envios />} />
          <Route path="/cambios" element={<Cambios />} />
          <Route path="/privacidad" element={<Privacidad />} />
          {SLUGS_DESCONTINUADOS.flatMap((slug) => [
            <Route key={slug} path={`/${slug}`} element={<Descontinuado />} />,
            <Route
              key={`producto-${slug}`}
              path={`/producto/${slug}`}
              element={<Descontinuado />}
            />,
          ])}
          {SLUGS_ANTIGUOS.map((slug) => (
            <Route
              key={slug}
              path={`/${slug}`}
              element={<Navigate to={`/producto/${slug}`} replace />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
