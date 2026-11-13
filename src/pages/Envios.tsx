import { envio } from '../data/productos'
import PaginaTexto from './PaginaTexto'

export default function Envios() {
  return (
    <PaginaTexto
      titulo="Envíos y tiempos"
      description="Cómo y cuándo llega tu pedido de Picanticos: transportadora, tiempos, costo y contraentrega."
    >
      <p>Transportadora: {envio.transportadora}.</p>
      <p>Bogotá: {envio.bogota}.</p>
      <p>Resto del país: {envio.nacional}.</p>
      <p>{envio.costo}</p>
      <p>{envio.contraentrega}</p>
      <p>{envio.discrecion}</p>
      <p>{envio.pago}</p>
    </PaginaTexto>
  )
}
