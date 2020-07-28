const path = require('path');

module.exports = {
  entry: './src/index.ts',
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
    filename: 'frontend-cacher.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist'
  },
  watch: true
};