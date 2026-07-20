/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages — no Node server, so no API routes,
  // no next/image optimization, no ISR.
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
