!process.env.SKIP_ENV_VALIDATION && (await import('@bm/env'))

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	transpilePackages: ['@bm/server'],
}

export default nextConfig
