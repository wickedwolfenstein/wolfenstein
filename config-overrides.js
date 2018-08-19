const { injectBabelPlugin } = require('react-app-rewired');
module.exports = (config, env) => {
  config.module.rules.push({
    test: require.resolve('zepto'),
    use: 'imports-loader?this=>window',
  });
  injectBabelPlugin('transform-decorators-legacy', config);
  return config;
};
