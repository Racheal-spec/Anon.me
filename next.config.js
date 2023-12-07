/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverComponentsExternalPackages: ["bcrypt"],
  // },
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'res.cloudinary.com',
      pathname: '**'
    }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
