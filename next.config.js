/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverComponentsExternalPackages: ["bcrypt"],
  // },
  images: {
    remotePatterns: [{
      protocol: ['http', 'https'],
      hostname: ['res.cloudinary.com','penbuddies.vercel.app'],
      pathname: '**'
    }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
