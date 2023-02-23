import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  clean: true,
  platform: 'node',
  dts: true,
  target: 'esnext',
  entry: ['index.ts', 'transformer.ts'],
  format: ['cjs'],
  minify: isProduction,
  external: ['node_modules/', '@acme/database', 'prisma'],
});
