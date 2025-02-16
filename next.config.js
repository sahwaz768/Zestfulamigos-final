module.exports = {
  reactStrictMode: process.env.NODE_ENV === 'production', // Enable strict mode to highlight potential problems in the app
  experimental: {
    turbo: {
    },
  },
  webpack: (config, { isServer  }) => {
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
      };
      config.optimization.splitChunks = {
        chunks: 'all',
      };
    }
    return config;
  },
  images: {
    domains: ['localhost']
  }
}