import { Link } from 'react-router-dom'
import { redes, whatsapp } from '../data/productos'

const mensaje = encodeURIComponent('Hola Picanticos 💫')
const urlWhatsApp = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${mensaje}`

const TIENDA = [
  { label: 'Lencería', href: '/#lenceria' },
  { label: 'Juegos', href: '/#juegos' },
  { label: 'Tallas', href: '/#tallas' },
]

const AYUDA = [
  { label: 'Envíos', href: '/envios' },
  { label: 'Cambios', href: '/cambios' },
  { label: 'Privacidad', href: '/privacidad' },
]

const REDES = [
  { label: 'Instagram', href: redes.instagram },
  { label: 'TikTok', href: redes.tiktok },
  { label: 'WhatsApp', href: urlWhatsApp },
]

const TITULO_COL = 'text-[11px] uppercase tracking-[0.2em] text-piel'

export default function Footer() {
  return (
    <footer
      className="px-5 py-[60px]"
      style={{ borderTop: '1px solid rgba(243,217,198,.18)' }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="inline-block">
            <img
              src={`${import.meta.env.BASE_URL}img/logo.png`}
              alt="Picanticos"
              className="h-10 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-[26ch] text-[13px] text-marfil/75">
            Lencería y juegos para adultos. Hecho en Colombia desde 2024.
          </p>
        </div>

        <div>
          <p className={TITULO_COL}>Tienda</p>
          <ul className="mt-4 space-y-2.5">
            {TIENDA.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-[13px] text-marfil/80 transition-colors hover:text-piel"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={TITULO_COL}>Ayuda</p>
          <ul className="mt-4 space-y-2.5">
            {AYUDA.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="text-[13px] text-marfil/80 transition-colors hover:text-piel"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={TITULO_COL}>Síguenos</p>
          <ul className="mt-4 space-y-2.5">
            {REDES.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-marfil/80 transition-colors hover:text-piel"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl text-[12px] text-marfil/55">
        © 2026 Picanticos · Bogotá, Colombia
      </p>
    </footer>
  )
}
