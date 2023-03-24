import * as path from 'path';
import * as webpack from 'webpack';
import copyPlugin from 'copy-webpack-plugin';

const srcDir = path.join(__dirname, '../src');

const config: webpack.Configuration = {
  mode: 'production',
  entry: {
    background: path.join(srcDir, 'background.ts'),
    content: path.join(srcDir, 'content.ts'),
    popup: path.join(srcDir, 'popup.ts')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true
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
  plugins: [
    new copyPlugin({
      patterns: [
        { from: '.', to: '.', context: 'public' },
        { from: 'src/popup.html', to: 'popup.html' }
        ]
    }),
  ],
};

export default config;
