/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    domains: [],
    remotePatterns: [],
    minimumCacheTTL: 86400,
    unoptimized: false,
  },
  devIndicators: {
    buildActivity: false,
  },
}

export default nextConfig;