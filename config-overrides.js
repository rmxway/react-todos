const { override, addBabelPlugins } = require('customize-cra');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = override(
    isDev ? addBabelPlugins('babel-plugin-styled-components') : null
);
