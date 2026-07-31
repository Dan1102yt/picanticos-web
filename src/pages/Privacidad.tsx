import PaginaTexto from './PaginaTexto'

export default function Privacidad() {
  return (
    <PaginaTexto
      titulo="Política de privacidad"
      description="Qué datos recoge Picanticos, para qué se usan y cómo pedir que se eliminen."
    >
      <p>
        Para procesar tu pedido recogemos tu nombre, tu número de celular y tu
        dirección de envío. Los usamos únicamente para confirmar el pedido,
        coordinar el envío y responder tus preguntas por WhatsApp.
      </p>
      <p>
        No compartimos tus datos con terceros, más allá de la información que
        la transportadora necesita para entregarte el pedido.
      </p>
      <p>
        En cualquier momento puedes pedirnos que eliminemos tus datos
        escribiéndonos a{' '}
        <a
          href="mailto:davidroa1102@gmail.com"
          className="text-rosa underline underline-offset-2"
        >
          davidroa1102@gmail.com
        </a>
        .
      </p>
      <p>
        Este tratamiento de datos personales se hace conforme a la Ley 1581 de
        2012 de Colombia.
      </p>
    </PaginaTexto>
  )
}
