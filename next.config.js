// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

module.exports = nextConfig;