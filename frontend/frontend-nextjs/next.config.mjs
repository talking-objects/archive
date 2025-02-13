/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone", // Docker 
    env: {
        EVA_API_URL: process.env.EVA_API_URL,
        PROXY_HOST: process.env.PROXY_HOST,
        PROXY_PORT: process.env.PROXY_PORT,
        PROXY_PROTOCOL: process.env.PROXY_PROTOCOL
    },
    webpack(config) { // SVGR
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
          rule.test?.test?.('.svg'),
        )
    
        config.module.rules.push(
          // Reapply the existing rule, but only for svg imports ending in ?url
          {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/, // *.svg?url
          },
          // Convert all other *.svg imports to React components
          {
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
            use: ['@svgr/webpack'],
          },
        )
    
        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i
    
        return config
      },   
    
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'talkingobjects.0x2620.org',
                port: "",
                pathname: "/*/*"
            }
        ],
        // domains: ["talkingobjects.0x2620.org"],
        formats: ['image/webp'], 
    }
};

export default nextConfig;
