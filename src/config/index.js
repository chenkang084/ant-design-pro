let config;

const env = process.env.NODE_ENV;

if (env === 'development') {
  config = require('./config.local.js').default;
} else {
  config = require('./config.prod.js').default;
}

export default config;
