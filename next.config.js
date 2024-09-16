/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  pageExtensions: ['tsx'],
  reactStrictMode: false,
  distDir: 'public', // Specify the output directory
  webpack: (config, { buildId, dev, isServer }) => {
    // This allows the app to refer to files through our symlink
    if (!isServer) {
        config.resolve.fallback.fs = false;
    }
    config.resolve.symlinks = false
    return config
},images: {
        domains: ['ipfs.io','nftea.infura-ipfs.io','github.com','bafybeihplhfmazxtn7kenp7pcf6rxjligjlhpmiynealcy5k4ilkzrjaji.ipfs.nftstorage.link']
    }
}

module.exports = nextConfig
