import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  clean: true,
  dts: true,
  target: 'esnext',
  entry: ['index.ts', 'transformer.ts'],
  format: ['cjs'],
  minify: isProduction,
  sourcemap: true,
});
