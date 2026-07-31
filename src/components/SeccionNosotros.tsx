import Imagen from './Imagen'

const METRICAS = [
  { numero: '+1.000', etiqueta: 'Pedidos enviados' },
  { numero: '30 días', etiqueta: 'Para cambiar la talla' },
]

export default function SeccionNosotros() {
  return (
    <section
      id="nosotros"
      className="px-5 py-16 md:py-[110px]"
      style={{
        background:
          'linear-gradient(180deg, transparent, rgba(59,10,42,.4), transparent)',
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-[70px] md:grid-cols-2">
        <Imagen
          base="img/nosotros"
          alt="El equipo de Picanticos empacando un pedido"
          className="aspect-[4/5] w-full rounded-[12px] object-cover"
        />

        <div>
          <p className="text-[11px] uppercase tracking-[0.34em] text-rosa">
            Nosotros
          </p>
          <blockquote
            className="mt-4 font-display italic leading-[1.25]"
            style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}
          >
            No vendemos para que le gustes a alguien.
            <br />
            <span className="text-rosa">Vendemos para que te guste verte.</span>
          </blockquote>
          <p className="mt-6 max-w-md text-marfil/80">
            Somos una tienda colombiana pequeña. Elegimos las telas a mano,
            empacamos cada pedido en casa y respondemos por WhatsApp nosotros
            mismos — no un bot. Si algo no te queda, lo cambiamos y ya.
          </p>

          <div className="mt-10 flex gap-12">
            {METRICAS.map((metrica) => (
              <div key={metrica.etiqueta}>
                <p className="font-display text-[44px] leading-none text-piel">
                  {metrica.numero}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.34em] text-rosa opacity-55">
                  {metrica.etiqueta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
