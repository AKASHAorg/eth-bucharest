// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('../../libs/webpack.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const webpack = require('webpack');
// remove manifest plugin
baseConfig.plugins.splice(1, 1);
module.exports = Object.assign(baseConfig, {
  context: path.resolve(__dirname),
  entry: {
    main: './src/index.ts',
    'setup.twind': './src/setup.twind.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    crossOriginLoading: 'anonymous',
  },
  plugins: baseConfig.plugins.concat([
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../dist/sw/worker.js'), to:'worker.js' },
        { from: path.resolve(__dirname, '../dist/sdk'), to: 'sdk' },
        { from: path.resolve(__dirname, '../dist/hooks'), to: 'hooks' },
        { from: path.resolve(__dirname, '../dist/apps'), to: 'apps' },
        { from: path.resolve(__dirname, '../../libs/design-system-core/src/static/img'), to: 'images' },
      ],
    }),
    new webpack.DefinePlugin({
      __LOAD_LOCAL_SOURCES__: !!process.env.LOAD_LOCAL_SOURCES,
    }),
  ]),
  externals: baseConfig.externals,
  devServer: {
    server: {
      type: 'https',
    },
    // serve development versions of libs
    // https://github.com/webpack/webpack-dev-server/issues/2540
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
      staticOptions: {
        index: 'index.html',
      },
    },
    hot: true,
    historyApiFallback: {
      index: 'index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
