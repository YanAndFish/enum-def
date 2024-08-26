import { defineConfig } from 'tsup'

export default defineConfig({
  dts: true,
  entry: ['src/index.ts'],
  clean: true,
  format: ['esm', 'cjs'],
})
