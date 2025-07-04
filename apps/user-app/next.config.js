/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui"],
    images: {
      domains: ["avatars.githubusercontent.com"],
    },
    // Netlify deployment configuration
    trailingSlash: false,
  }

  export default nextConfig
  
