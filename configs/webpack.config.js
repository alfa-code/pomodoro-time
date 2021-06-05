const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const developmentConfig = require('./webpack.config.dev');
const productionConfig = require('./webpack.config.prod');

module.exports = () => {
  switch(process.env.NODE_ENV) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
}
