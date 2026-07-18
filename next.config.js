/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    return config;
  },
};

module.exports = nextConfig;
