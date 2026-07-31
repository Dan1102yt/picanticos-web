const ITEMS = [
  {
    titulo: 'Empaque neutro',
    descripcion: 'Caja sin marca ni descripción del contenido.',
  },
  {
    titulo: 'Remitente discreto',
    descripcion: 'En la guía solo aparecen la fecha y tu nombre.',
  },
  {
    titulo: 'Cambio de talla gratis',
    descripcion: '30 días, sin preguntas incómodas.',
  },
  {
    titulo: 'Envíos a todo el país',
    descripcion: 'Contraentrega disponible en todas las ciudades.',
  },
]

export default function BandaDiscrecion() {
  return (
    <section className="border-y border-[rgba(243,217,198,0.18)] bg-vino/35">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-10 md:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.titulo}>
            <p className="text-[11px] uppercase tracking-[0.1em] text-piel">{item.titulo}</p>
            <p className="mt-2 text-[13px] text-marfil/75">{item.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
