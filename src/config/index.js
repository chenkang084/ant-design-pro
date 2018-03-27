const env = process.env.NODE_ENV;
let config; // eslint-disable-line

if (env === 'development') {
  config = require('./config.local.js').default;
} else {
  config = require('./config.prod.js').default;
}

export default config;
