const path = require('path');

module.exports = {
  entry: './src/factory.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: './frontend-cacher.js',
    path: path.resolve(__dirname),
  },
  devServer: {
    contentBase: './dist'
  },
  watch: true
};