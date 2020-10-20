const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack(config, options) {
    config.target = 'electron-renderer';

    config.modules.cssLoaderOptions = {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    };
    return config;
  },
});

exports.exportPathMap = () => ({
  '/start': { page: '/start' },
});
