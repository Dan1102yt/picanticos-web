const ITEMS = [
  {
    titulo: 'Empaque discreto',
    descripcion: 'Bolsa sellada, sin marca ni nada que diga qué hay adentro.',
  },
  {
    titulo: 'Pagas al recibir',
    descripcion: 'Contraentrega: pagas cuando lo tengas en la mano.',
  },
  {
    titulo: 'Asesoría de talla',
    descripcion: 'Por WhatsApp, antes de pedir y sin compromiso.',
  },
  {
    titulo: 'Envíos a todo el país',
    descripcion: 'Envío fijo de $14.900 a todo Colombia.',
  },
]

export default function BandaDiscrecion() {
  return (
    <section className="border-y border-[rgba(243,217,198,0.18)] bg-vino/35">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-10 md:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.titulo}>
            <p className="text-[12px] uppercase tracking-[0.1em] text-piel">{item.titulo}</p>
            <p className="mt-2 text-[13px] text-marfil/90">{item.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
