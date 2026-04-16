import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This is necessary to map the system instruction's requirement for process.env.API_KEY
      // to the Vite environment variable loading mechanism.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})