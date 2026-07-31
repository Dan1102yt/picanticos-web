import { copyFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages no sabe de rutas de cliente: sin esto, entrar directo a
// /producto/satin-glow o /satin-glow devuelve un 404 crudo del servidor.
// Copiar index.html a 404.html hace que Pages sirva la SPA en cualquier ruta
// y React Router se encargue de resolverla (o redirigir a "/" si no existe).
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      copyFileSync(
        path.resolve(__dirname, 'dist/index.html'),
        path.resolve(__dirname, 'dist/404.html')
      )
    },
  }
}

export default defineConfig({
  base: '/picanticos-web/',
  plugins: [react(), spaFallback()],
})
