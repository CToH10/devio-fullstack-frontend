/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    api_base_url: 'http://localhost:3001/',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
