const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack(config, options) {
    config.target = 'electron-renderer';
    // console.log('config.module.rules', config.module.rules);
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: ['style-loader', 'css-loader'],
    // });
    return config;
  },
});

exports.exportPathMap = () => ({
  '/start': { page: '/start' },
});
