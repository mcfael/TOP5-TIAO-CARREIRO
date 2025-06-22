import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Definir a porta para 3000
    //proxy: {
      //'/api': 'http://localhost:8000', // Proxy para a API do backend (Laravel, por exemplo)
    //},
  },
})
