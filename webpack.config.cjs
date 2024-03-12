const path = require('path');
const dependencies = require('./package.json').dependencies;


module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all', // 可以是 `async`（仅分割异步加载模块），`initial`（仅分割初始加载模块），`all`（两者都分割）
    },
  },
  devServer: {
    static: './',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          'ts-loader'
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.esm.js',
    // filename: 'bundle.js',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  externals: Object.keys(dependencies).reduce((ext, dep) => {
    ext[dep] = dep; // 将依赖标记为外部库
    return ext;
  }, {}),
};


