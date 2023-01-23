/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
  },
  i18n: {
    locales: ["en-US", "cs-CZ"],
    defaultLocale: "en-US",
  },
};

module.exports = nextConfig;
