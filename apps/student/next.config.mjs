!process.env.SKIP_ENV_VALIDATION && (await import('@acme/env'))
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // experimental: {
  //   appDir: false
  // }
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  compiler: {
    removeConsole: {
      exclude: ['error']
    }
  },
  transpilePackages: [
    '@acme/server',
    '@acme/auth',
    '@acme/env',
  ],
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../')
  }
}

export default nextConfig
