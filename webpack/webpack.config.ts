import * as path from 'path';
import * as webpack from 'webpack';
import copyPlugin from 'copy-webpack-plugin';

const config: webpack.Configuration = {
    mode: 'production',
    entry: {},
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true
    },
    plugins: [
        new copyPlugin({
            patterns: [{ from: '.', to: '.', context: 'public' }]
        }),
    ],
};

export default config;
