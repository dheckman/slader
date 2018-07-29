import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { WDS_PORT, isProd } from './src/shared/config'

export default {
  entry: [
    './src/containers/TextbookContainer.jsx',
  ],
  mode: isProd ? 'production' : 'development',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Slader',
    }),
  ],
}
