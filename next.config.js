/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Prevent clickjacking by denying iframe embedding
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Cross-Site Scripting protection filter
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Strict Referrer Policy: only send origin on cross-origin requests
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Enforce HTTPS with HSTS (Strict-Transport-Security)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Restrict sensitive browser APIs / capabilities
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()',
  },
  // Control DNS prefetching
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig = {
  reactStrictMode: true,
  // Remove X-Powered-By header to prevent server reconnaissance/fingerprinting
  poweredByHeader: false,
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    return config;
  },
};

module.exports = nextConfig;
