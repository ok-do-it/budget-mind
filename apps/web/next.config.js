/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@budget-mind/ui",
    "@budget-mind/shared",
    "@budget-mind/db",
  ],
}

export default nextConfig
