const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  assetsDir: 'static',
  chainWebpack: config => {
    config.plugins.delete('pwa');
  }
};