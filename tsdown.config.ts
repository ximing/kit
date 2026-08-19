import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.test.ts'],
  format: ['esm', 'cjs'],
  unbundle: true,
  dts: true,
  sourcemap: true,
  exports: true,
  outDir: 'dist',
});
