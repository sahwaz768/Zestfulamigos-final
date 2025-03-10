module.exports = {
  reactStrictMode: process.env.NODE_ENV === 'production', // Enable strict mode to highlight potential problems in the app
  webpack: (config, { isServer }) => {
    config.cache = {
      type: 'filesystem',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };
    config.optimization.splitChunks = {
      chunks: 'all'
    };
    return config;
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons/*']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '5000',
      },
    ],
  }
};
