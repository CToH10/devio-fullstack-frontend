/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    api_base_url: process.env.api_base_url,
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
