import manifiesto from '../data/imagenes.json'

export type ClaveImagen = keyof typeof manifiesto

interface ImagenProps {
  base: ClaveImagen
  alt: string
  priority?: boolean
  className?: string
}

const SIZES = '(min-width: 1024px) 50vw, 100vw'

export default function Imagen({ base, alt, priority = false, className }: ImagenProps) {
  const entrada = manifiesto[base]

  if (!entrada) {
    if (import.meta.env.DEV) {
      throw new Error(
        `Imagen: "${base}" no existe en src/data/imagenes.json. ¿Falta correr "npm run fotos"?`
      )
    }
    return null
  }

  const { BASE_URL } = import.meta.env
  const ruta = `${BASE_URL}${base}`
  const { widths, w, h } = entrada
  const anchoMayor = widths[widths.length - 1]

  const webpSrcSet = widths.map((ancho) => `${ruta}-${ancho}.webp ${ancho}w`).join(', ')
  const jpgSrcSet = widths.map((ancho) => `${ruta}-${ancho}.jpg ${ancho}w`).join(', ')

  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet} sizes={SIZES} />
      <img
        src={`${ruta}-${anchoMayor}.jpg`}
        srcSet={jpgSrcSet}
        sizes={SIZES}
        alt={alt}
        width={w}
        height={h}
        className={className}
        {...(priority
          ? { fetchPriority: 'high' as const }
          : { loading: 'lazy' as const, decoding: 'async' as const })}
      />
    </picture>
  )
}
