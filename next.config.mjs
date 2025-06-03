/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  webpack: (config, { isServer, dev }) => {
    // Only add MiniCssExtractPlugin in production builds
    if (!isServer && !dev) {
      const MiniCssExtractPlugin = require('mini-css-extract-plugin');
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[contenthash].css',
          chunkFilename: 'static/css/[contenthash].css',
        })
      );
    }
    return config;
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     domains: ['images.unsplash.com'],
//     unoptimized: true,
//   },
//   webpack: async (config, { isServer, dev }) => {
//     if (!isServer && !dev) {
//       const { default: MiniCssExtractPlugin } = await import('mini-css-extract-plugin');
//       config.plugins.push(
//         new MiniCssExtractPlugin({
//           filename: 'static/css/[contenthash].css',
//           chunkFilename: 'static/css/[contenthash].css',
//         })
//       );
//     }
//     return config;
//   },
// };

// export default nextConfig;

