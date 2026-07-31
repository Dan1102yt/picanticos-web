import { envio } from '../data/productos'
import Imagen from '../components/Imagen'
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

      <div className="mt-10 flex flex-col items-start gap-5 rounded-[14px] bg-vino/35 p-6 sm:flex-row sm:items-center">
        <Imagen
          base="img/empaque"
          alt="Empaque neutro de Picanticos"
          className="h-[120px] w-[120px] shrink-0 rounded-lg object-cover"
        />
        <div>
          <h2 className="font-display text-[20px] text-marfil">Así llega tu pedido</h2>
          <p className="mt-2 text-[14px] opacity-75">{envio.discrecion}</p>
        </div>
      </div>
    </PaginaTexto>
  )
}
