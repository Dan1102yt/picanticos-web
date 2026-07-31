import { whatsapp } from '../data/productos'

const FILAS = [
  { talla: 'S', busto: '80–86 cm', cintura: '60–66 cm', cadera: '86–92 cm', equivale: 'Blusa 6' },
  { talla: 'M', busto: '87–93 cm', cintura: '67–73 cm', cadera: '93–99 cm', equivale: 'Blusa 8–10' },
  { talla: 'L', busto: '94–100 cm', cintura: '74–80 cm', cadera: '100–106 cm', equivale: 'Blusa 12' },
  { talla: 'XL', busto: '101–107 cm', cintura: '81–88 cm', cadera: '107–114 cm', equivale: 'Blusa 14' },
]

const mensaje = encodeURIComponent(
  'Hola Picanticos 💫 Tengo dudas con mi talla. Mi busto mide ___ cm y mi cintura ___ cm, ¿cuál me recomiendan?'
)
const urlWhatsApp = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${mensaje}`

export default function SeccionTallas() {
  return (
    <section id="tallas" className="px-5 py-16 md:py-[110px]">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] uppercase tracking-[0.34em] text-rosa">
          Antes de comprar
        </p>
        <h2
          className="mt-4 font-display leading-[1.05]"
          style={{ fontSize: 'clamp(34px, 4.4vw, 58px)' }}
        >
          Tu talla, <span className="italic text-rosa">sin adivinar</span>
        </h2>
        <p className="mt-5 max-w-md text-marfil/80">
          Mídete con una cinta sobre la piel, sin apretar. Si quedas entre dos
          tallas, pide la mayor.
        </p>

        <div
          className="mt-12 rounded-[16px] bg-white/[0.02] p-9"
          style={{ border: '1px solid rgba(243,217,198,.18)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr>
                  {['Talla', 'Busto', 'Cintura', 'Cadera', 'Equivale a'].map((col) => (
                    <th
                      key={col}
                      className="pb-4 text-[11px] font-normal uppercase tracking-[0.18em] text-rosa"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FILAS.map((fila) => (
                  <tr
                    key={fila.talla}
                    className="border-t border-[rgba(243,217,198,0.18)]"
                  >
                    <td className="py-4 pr-4 font-display text-[19px] text-piel">
                      {fila.talla}
                    </td>
                    <td className="py-4 pr-4 text-[14px] text-marfil/80">{fila.busto}</td>
                    <td className="py-4 pr-4 text-[14px] text-marfil/80">{fila.cintura}</td>
                    <td className="py-4 pr-4 text-[14px] text-marfil/80">{fila.cadera}</td>
                    <td className="py-4 text-[14px] text-marfil/80">{fila.equivale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 max-w-md text-[14px] text-marfil/75">
          ¿Dudas con tu medida?{' '}
          <a
            href={urlWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rosa underline underline-offset-2"
          >
            Escríbenos por WhatsApp
          </a>{' '}
          con busto y cintura y te decimos cuál pedir. Sin compromiso.
        </p>
      </div>
    </section>
  )
}
