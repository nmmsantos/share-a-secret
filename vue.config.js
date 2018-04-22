/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  lintOnSave: false,
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        devtool: 'none',
        plugins: [
          new CompressionPlugin({
            test: /\.(js|css)$/
          })
        ]
      };
    }
    return {};
  }
};
