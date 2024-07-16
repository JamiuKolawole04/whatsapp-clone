/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "localhost"],
  },
};

module.exports = nextConfig;
