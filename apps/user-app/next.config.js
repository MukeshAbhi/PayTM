/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  trailingSlash: false,
  webpack: async (config, { isServer }) => {
    if (isServer) {
      const { PrismaPlugin } = await import('@prisma/nextjs-monorepo-workaround-plugin');
      config.plugins.push(new PrismaPlugin());
    }
    return config;
  },
};

export default nextConfig;
