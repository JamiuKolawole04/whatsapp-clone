/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 964972891,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "dc49a6707497db0cde12d93c2f97fa0d",
  },
  images: {
    domains: ["res.cloudinary.com", "localhost"],
  },
};

module.exports = nextConfig;
