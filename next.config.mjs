/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'image.thum.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            // Replace 'your-portfolio-domain.com' with your actual portfolio URL
            // Also include 'localhost:3000' for local testing
            value: "frame-ancestors 'self' https://arnob.life https://www.grayvally.tech/ https://grayvally.tech/ http://localhost:3000;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

