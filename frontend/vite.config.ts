import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    host: '0.0.0.0',
    // https: {
    //   cert: await Bun.file('./certs/fullchain.pem').text(),
    //   key: await Bun.file('./certs/server-key.pem').text()
    // },
    // hmr: {
    //   host: '0.0.0.0',
    //   protocol: "wss"
    // }
  },
  // esbuild: {
  //   supported: {
  //     'top-level-await': true
  //   },
  // },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'service-worker': resolve(__dirname, 'src/service-worker.ts')
      },
      output: {
        entryFileNames: chunk => {
          if (chunk.name == 'service-worker') {
            return `[name].js`
          }
          return `assets/[name].[hash].js`
        },
      }
    }
  },
  plugins: [react()],
})
