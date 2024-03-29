import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  clean: true,
  dts: true,
  ignoreWatch: '.env',
  entry: ['index.mts'],
  format: ['cjs', 'esm'],
  minify: isProduction,
});
