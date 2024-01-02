//import react from "@vitejs/plugin-react"
import million from 'million/compiler'
import path from "path"
import tailwind from 'tailwindcss'
import { defineConfig } from "vite"

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind()]
    }
  },
  plugins: [
    //react()
    million().vite({ auto: true })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
