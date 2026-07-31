import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ProductoDetalle from './pages/ProductoDetalle'
import Envios from './pages/Envios'
import Cambios from './pages/Cambios'
import Privacidad from './pages/Privacidad'

// Slugs vivos en la bio de Instagram y TikTok desde el sitio anterior.
const SLUGS_ANTIGUOS = [
  'satin-glow',
  'fuego-nocturno',
  'luna-traviesa',
  'pecado-unico',
  'kimono-malla',
  'torre-pasion',
]

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:slug" element={<ProductoDetalle />} />
        <Route path="/envios" element={<Envios />} />
        <Route path="/cambios" element={<Cambios />} />
        <Route path="/privacidad" element={<Privacidad />} />
        {SLUGS_ANTIGUOS.map((slug) => (
          <Route
            key={slug}
            path={`/${slug}`}
            element={<Navigate to={`/producto/${slug}`} replace />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
