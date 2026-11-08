import manifiesto from './imagenes.json'

export type ClaveImagen = keyof typeof manifiesto

// Foto de proveedor (Dropi) servida desde su CDN. Se usa mientras la foto no
// pase por el pipeline local (npm run fotos).
export type UrlExterna = `https://${string}`

export type FotoProducto = ClaveImagen | UrlExterna

export const esUrlExterna = (base: FotoProducto): base is UrlExterna =>
  base.startsWith('https://')
