/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     serverActions: true
    // },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'i.scdn.co', // if your website has no www, drop it
            },
            {
                protocol: "https",
                hostname: 'mosaic.scdn.co',
            },
            {
                protocol: "https",
                hostname: 'newjams-images.scdn.co',
            },
        ],
    },
}

module.exports = nextConfig
