

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  trailingSlash: false,
  
};

export default nextConfig;
