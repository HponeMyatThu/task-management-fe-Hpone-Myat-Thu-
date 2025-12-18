/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    NEXT_BE_URL: process.env.NEXT_BE_URL,
  },
};

export default nextConfig;
