const path = require('path');

module.exports = {
  entry: './src/cacher.ts',
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
    filename: 'index.js',
    path: path.resolve(__dirname),
  },
  devServer: {
    contentBase: './dist'
  },
  watch: true
};