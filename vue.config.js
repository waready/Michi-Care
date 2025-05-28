const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/Michi-Care/',

  pwa: {
    name: 'MichiCute',
    short_name: 'Michi',
    themeColor: '#ffffff',
    backgroundColor: '#f8f9fa',
    display: 'standalone',
    orientation: 'portrait',
    start_url: '.',
    manifestOptions: {
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: './img/icons/maskable_icon.png',
          sizes: '196x196',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
})
