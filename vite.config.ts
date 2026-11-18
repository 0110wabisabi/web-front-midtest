import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  base: '/taskhub/',
  plugins: [
    vue(),
    tailwindcss(), // 激活 Tailwind v4 引擎
    viteCompression({
      threshold: 10240, // 超过 10kb 的文件才压缩
      algorithm: 'gzip',
      ext: '.gz'
    })

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vue-vendor',
              test: /node_modules[\\/](vue|vue-router|pinia)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
