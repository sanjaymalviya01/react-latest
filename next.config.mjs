/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns:[
            {
                protocol: "https", // or http
                hostname: "dummyjson.com", // if your website has no www, drop it
              },
              {
                  protocol: "https", // or http
                  hostname: "cdn.dummyjson.com", // if your website has no www, drop it
                },
        ]
        // ['dummyjson.com','cdn.dummyjson.com']
        // domains:['dummyjson.com','cdn.dummyjson.com']
    }
};

export default nextConfig;
