import { SITE_URL, envio, formatearPrecio, whatsapp, type Producto } from '../data/productos'

interface PedidoWhatsApp {
  producto: Producto
  talla?: string
  color?: string
}

export function useWhatsApp({ producto, talla, color }: PedidoWhatsApp) {
  const lineas = ['Hola Picanticos 💫 Quiero pedir:', '', `*${producto.nombre}*`]

  if (color) {
    lineas.push(`Color: ${color}`)
  }

  if (producto.tallas.length > 0) {
    lineas.push(`Talla: ${talla || 'por confirmar'}`)
  }

  lineas.push(`Precio: ${formatearPrecio(producto.precio)}`)
  lineas.push(`Envío: ${formatearPrecio(envio.valor)}`)
  lineas.push(`Total: ${formatearPrecio(producto.precio + envio.valor)}`)
  lineas.push('Pago: al recibir (o por Nequi / Llave)')
  lineas.push('')
  lineas.push('Mis datos para el envío:')
  lineas.push('Nombre:')
  lineas.push('Ciudad:')
  lineas.push('Dirección:')
  lineas.push('')
  lineas.push(`${SITE_URL}/producto/${producto.slug}`)

  const mensaje = lineas.join('\n')

  return `https://api.whatsapp.com/send?phone=${whatsapp}&text=${encodeURIComponent(mensaje)}`
}
