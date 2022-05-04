import { defineConfig } from "vite"

export default defineConfig({
  define: {
    process: {
      env: {}
    }
  },
  resolve: {
    alias: {
      fs: 'browserify-fs',
      path: 'path-browserify',
      os: 'os-browserify',
    },
  },
})