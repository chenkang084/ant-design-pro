const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: false,
  publicPath: '/',
  hash: true,
  proxy: {
    '/api/identity': {
      target: 'http://10.4.185.108:9001/',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
};
