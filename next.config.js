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
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
      {
        protocol: 'https',
        hostname: 'zestfulimages.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/userphotos/**',
        search: '',
      }
    ],
  }
};
