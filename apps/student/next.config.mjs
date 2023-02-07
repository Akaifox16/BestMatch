!process.env.SKIP_ENV_VALIDATION && (await import('@acme/env'))

/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

export default nextConfig
