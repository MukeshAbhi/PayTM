/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui"],
    images: {
      domains: ["avatars.githubusercontent.com"],
    },
  }
  
  export default nextConfig
  
