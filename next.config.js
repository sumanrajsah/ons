/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental :{
serverActions:true,
  },
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
      ) => {
        // Important: return the modified config
        return config
      },
    reactStrictMode: true,
    env: {
        PROJECT_ID: "197d6cc2a7a2f1af71cb513ee3120946",
        LINK:"https://sepolia.rpc.thirdweb.com",
        INFURAID:"948ae3bd52224f599dd7436ba137ad2c"
    },
    images: {
        domains: ['ipfs.io'], // Add any other domains you might use for images
      },

}

module.exports = nextConfig
