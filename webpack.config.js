const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: './frontend/web/app.js',
    output: {
      path: path.join(__dirname, 'frontend', 'web', 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules:[{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: [ /node_modules/ ]
      }, {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    },
    stats: {
      warnings: false
    },
    plugins: [
      new LiveReloadPlugin()
    ],
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'frontend', 'web', 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
