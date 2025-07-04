/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],

  images: {
    // This allows both external and internal images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  trailingSlash: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
