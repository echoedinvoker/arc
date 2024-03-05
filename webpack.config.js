const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all', // 可以是 `async`（仅分割异步加载模块），`initial`（仅分割初始加载模块），`all`（两者都分割）
  //   },
  // },
  devServer: {
    static: './',
    hot: true
  },
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    // filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};


