module.exports = {
  reactStrictMode: false,

  webpack: (config, { isServer  }) => {
    if (!isServer) {
      config.cache = {
        type: 'filesystem', // Enable filesystem caching for faster development builds
      };
      // Speed up builds by excluding large unnecessary dependencies
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