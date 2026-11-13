// Cinta infinita con las promesas de la tienda. Se pausa al pasar el mouse
// y se queda quieta si el usuario pidió movimiento reducido.
const FRASES = [
  'Empaque discreto y sellado',
  'Pagas al recibir',
  'Envío gratis llevando 3 prendas',
  'Nequi o Llave',
  'Envío fijo de $14.900 a todo Colombia',
  'Asesoría de talla por WhatsApp',
]

function Tira({ oculta = false }: { oculta?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={oculta || undefined}>
      {FRASES.map((frase) => (
        <span key={frase} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-[22px] italic text-piel md:px-10 md:text-[30px]">
            {frase}
          </span>
          <span className="text-[14px] text-rosa" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

export default function Marquesina() {
  return (
    <section
      aria-label="Por qué comprar en Picanticos"
      className="marquesina group relative overflow-hidden border-y border-[rgba(243,217,198,0.18)] bg-vino/35 py-5 md:py-7"
    >
      <div className="marquesina-pista flex w-max">
        <Tira />
        <Tira oculta />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-noche to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-noche to-transparent md:w-32" />
    </section>
  )
}
