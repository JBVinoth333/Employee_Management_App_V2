import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_APP_BASE_PATH || '/EmployeeManagement'
  return {
    plugins: [react()],
    base,
    server: {
      watch: {
        usePolling: true
      }
    },
    build: {
      outDir: 'dist'
    }
  }
})
