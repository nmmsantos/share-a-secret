module.exports = {
  lintOnSave: false,
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        devtool: 'none',
      };
    }
    return {};
  },
};
