/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
    ],
    // optional: disable strict security for dev
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;
