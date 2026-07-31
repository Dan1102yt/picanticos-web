import { envio, whatsapp } from '../data/productos'
import PaginaTexto from './PaginaTexto'

const mensaje = encodeURIComponent('Hola Picanticos 💫 Quiero cambiar la talla de mi pedido.')
const urlWhatsApp = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${mensaje}`

export default function Cambios() {
  return (
    <PaginaTexto
      titulo="Cambios y devoluciones"
      description="Tienes 30 días para cambiar la talla de tu pedido de Picanticos. Así se pide."
    >
      <p>{envio.cambios}</p>
      <p>
        Escríbenos por{' '}
        <a
          href={urlWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rosa underline underline-offset-2"
        >
          WhatsApp
        </a>{' '}
        con tu nombre y la talla que necesitas, y coordinamos el cambio contigo.
      </p>
      <p>
        La pieza debe estar sin uso, con la etiqueta puesta y en su empaque
        original.
      </p>
    </PaginaTexto>
  )
}
