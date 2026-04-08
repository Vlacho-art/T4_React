import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    includeAssets: [
      'favicon.svg',
      'react.svg',
      'vite.svg',
      'icons.svg',
      'hero.png',
      'gastos.png',
      'pwa-192x192.png',
      'icono.png',
      'robots.txt'
    ],
    workbox: {
      navigateFallback: '/index.html',
      globPatterns:['**/*.{js,jsx,css,html,png,svg}']
      },
      manifest: {
        name: "control de Spendora",
        short_name: "Spendora",
        description: "Spendora es una app que te ayuda a controlar tus gastos diarios de forma simple y rápida.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#00000000",

        screenshots: [
          {
            src: '/img/gastos.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/img/gastos.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'wide'  // wide es para el nav
          }
        ],
        icons: [
          {
            src: '/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/icono.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
  })],
})
