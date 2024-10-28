/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone", // Docker 
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'talkingobjects.0x2620.org',
                port: "",
                pathname: "/*/*"
            }
        ]
    }
};

export default nextConfig;
