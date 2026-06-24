/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Exclude the raw .wpress extraction from the build trace
  outputFileTracingExcludes: {
    '*': ['./extracted/**'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
