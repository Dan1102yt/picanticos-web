import { lazy, Suspense } from 'react'
import { Navigate, Outlet, type RouteObject } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollSuave from './components/ScrollSuave'
import Grano from './components/Grano'
// Home y ficha van en el paquete principal: la transición entre las dos
// (la foto que viaja de la tarjeta a la ficha) no puede esperar a cargar.
import Home from './pages/Home'
import ProductoDetalle from './pages/ProductoDetalle'
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

// Layout común (barra, pie, scroll suave). Las páginas entran por <Outlet />.
function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollSuave />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<CargandoRuta />}>
        <Outlet />
      </Suspense>
      <Footer />
      <Grano />
    </MotionConfig>
  )
}

// Las rutas viven en el router de datos (no en <Routes> anidado) para que
// los enlaces con viewTransition animen el cambio de página.
export const rutas: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/producto/:slug', element: <ProductoDetalle /> },
      { path: '/envios', element: <Envios /> },
      { path: '/cambios', element: <Cambios /> },
      { path: '/privacidad', element: <Privacidad /> },
      ...SLUGS_DESCONTINUADOS.flatMap((slug) => [
        { path: `/${slug}`, element: <Descontinuado /> },
        { path: `/producto/${slug}`, element: <Descontinuado /> },
      ]),
      ...SLUGS_ANTIGUOS.map((slug) => ({
        path: `/${slug}`,
        element: <Navigate to={`/producto/${slug}`} replace />,
      })),
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]
