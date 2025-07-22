import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ghPages from 'vite-plugin-gh-pages'

// Reemplaza esto con el nombre de tu repositorio (el del frontend)
const repoName = 'nccuentas-frontend'

export default defineConfig({
  plugins: [react(), ghPages()],
  base: `/${repoName}/`, // esto es clave para que funcione bien en GitHub Pages
})
