/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
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
